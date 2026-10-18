import nodemailer from "nodemailer";
import dns from "dns";

export interface SubscriberNotificationPayload {
  email: string;
  source?: string;
  subscribedAt?: Date | string;
  ipAddress?: string;
}

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  details?: string;
  submittedAt?: Date | string;
}

export interface CareerNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  pitch?: string;
  submittedAt?: Date | string;
}

export interface SendResult {
  success: boolean;
  provider?: "brevo-api" | "smtp" | "fallback-log";
  messageId?: string;
  error?: string;
}

const DESTINATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "vyomaisolutions@gmail.com";

const SENDER_EMAIL =
  process.env.BREVO_SENDER_EMAIL ||
  process.env.SMTP_USER ||
  "vyomaisolutions@gmail.com";

const SENDER_NAME =
  process.env.BREVO_SENDER_NAME || "VyomAI Solutions";

function getBrevoApiKey(): string | undefined {
  const direct = process.env.BREVO_API_KEY?.trim();
  if (direct) return direct;
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (smtpPass && smtpPass.startsWith("xkeysib-")) {
    return smtpPass;
  }
  return undefined;
}

function formatIstDate(date?: Date | string): string {
  try {
    const d = date ? new Date(date) : new Date();
    return (
      d.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " IST"
    );
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Dispatches an email using Brevo's Transactional Email REST API (POST /v3/smtp/email).
 * Highly reliable: runs on HTTPS (port 443), bypassing blocked SMTP ports and DNS timeouts.
 */
async function sendViaBrevoApi(options: {
  to: string;
  subject: string;
  htmlContent: string;
}): Promise<SendResult> {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    return { success: false, error: "Brevo API key not found." };
  }

  const payload = {
    sender: {
      name: SENDER_NAME,
      email: SENDER_EMAIL,
    },
    to: [
      {
        email: options.to,
        name: "VyomAI Administration",
      },
    ],
    subject: options.subject,
    htmlContent: options.htmlContent,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      console.log(
        `[Brevo API] Email dispatched successfully to ${options.to}. MessageId: ${data?.messageId}`
      );
      return {
        success: true,
        provider: "brevo-api",
        messageId: data?.messageId,
      };
    }

    // Diagnostic error translation for Brevo status codes
    let errorDetail = data?.message || `HTTP ${res.status} ${res.statusText}`;

    if (res.status === 401 && errorDetail.includes("unrecognised IP")) {
      errorDetail =
        "Brevo Security: Your IP is not yet authorized in Brevo. Authorize this IP at https://app.brevo.com/security/authorised_ips or approve the confirmation email sent by Brevo.";
    } else if (res.status === 403 && errorDetail.includes("transactional.email")) {
      errorDetail =
        "Brevo Permissions: The API Key lacks 'Transactional Emails' permission. In Brevo -> Settings -> API Keys, create a key with Transactional Email permissions, or activate your Transactional account.";
    } else if (res.status === 400 && errorDetail.includes("sender")) {
      errorDetail = `Brevo Sender: The sender email (${SENDER_EMAIL}) is not verified in Brevo. Please verify it under Senders & IP in your Brevo dashboard.`;
    }

    console.warn(`[Brevo API Error ${res.status}]:`, errorDetail);
    return {
      success: false,
      provider: "brevo-api",
      error: errorDetail,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const msg = (err as Error).name === "AbortError"
      ? "Brevo API request timed out after 12s."
      : String((err as Error).message || err);
    console.warn("[Brevo API Fetch Exception]:", msg);
    return { success: false, provider: "brevo-api", error: msg };
  }
}

/**
 * Resolves IPv4 address for host to avoid Windows IPv6 timeout with nodemailer
 */
async function resolveIpv4(host: string): Promise<string> {
  return new Promise((resolve) => {
    dns.resolve4(host, (err, addresses) => {
      if (!err && addresses && addresses.length > 0) {
        resolve(addresses[0]);
      } else {
        resolve(host);
      }
    });
  });
}

/**
 * Dispatches an email using standard SMTP (Nodemailer).
 */
async function sendViaSmtp(options: {
  to: string;
  subject: string;
  htmlContent: string;
}): Promise<SendResult> {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass =
    process.env.SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS;
  const rawHost =
    process.env.SMTP_HOST ||
    (smtpUser?.includes("gmail") ? "smtp.gmail.com" : undefined);
  const smtpPort = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT)
    : 587;

  if (!smtpUser || !smtpPass || !rawHost) {
    return {
      success: false,
      error: "SMTP credentials (SMTP_USER, SMTP_PASS, SMTP_HOST) not fully configured.",
    };
  }

  try {
    const isBrevoSmtp = rawHost.includes("brevo.com");
    // Resolve IPv4 directly if host is brevo to avoid Windows IPv6 resolution hang
    const targetHost = isBrevoSmtp ? await resolveIpv4(rawHost) : rawHost;

    const transporter = nodemailer.createTransport({
      host: targetHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: isBrevoSmtp
        ? { servername: "smtp-relay.brevo.com", rejectUnauthorized: false }
        : undefined,
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${smtpUser}>`,
      to: options.to,
      subject: options.subject,
      html: options.htmlContent,
    });

    console.log(
      `[Mailer SMTP] Email delivered to ${options.to}. MessageId: ${info.messageId}`
    );
    return {
      success: true,
      provider: "smtp",
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    console.warn(`[Mailer SMTP Error]:`, err);
    return {
      success: false,
      provider: "smtp",
      error: String((err as Error).message || err),
    };
  }
}

/**
 * Universal dispatcher: Tries Brevo REST API first (if key exists),
 * then falls back to SMTP, and finally falls back to admin log.
 */
async function dispatchEmail(options: {
  to: string;
  subject: string;
  htmlContent: string;
}): Promise<SendResult> {
  const brevoKey = getBrevoApiKey();

  // 1. Try Brevo REST API first (fastest, most resilient)
  if (brevoKey) {
    const brevoResult = await sendViaBrevoApi(options);
    if (brevoResult.success) {
      return brevoResult;
    }
    console.warn(
      `[Mailer] Brevo API attempt failed: ${brevoResult.error}. Attempting SMTP fallback...`
    );
  }

  // 2. Try SMTP fallback if configured
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const smtpResult = await sendViaSmtp(options);
    if (smtpResult.success) {
      return smtpResult;
    }
    console.warn(
      `[Mailer] SMTP fallback failed: ${smtpResult.error}. Notification logged to DB.`
    );
    return smtpResult;
  }

  // 3. Fallback: log to console
  console.log(
    `[Mailer Fallback Log] Email to ${options.to} | Subject: "${options.subject}". Credentials not active.`
  );
  return {
    success: true,
    provider: "fallback-log",
    error: "Notification logged to database. Configure Brevo API Key to enable automated delivery.",
  };
}

// ==================== TEMPLATE BUILDERS ====================

function buildEmailContainer(title: string, badge: string, bodyContent: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #050b14; color: #f8fafc; border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);">
      <!-- Header with Gradient & Brand Badge -->
      <div style="background: linear-gradient(135deg, #0284c7 0%, #00f0ff 100%); padding: 26px 24px; text-align: center;">
        <h1 style="margin: 0; color: #050b14; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">VyomAI Solutions</h1>
        <div style="display: inline-block; background: #050b14; color: #00f0ff; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 8px;">
          ${badge}
        </div>
      </div>

      <!-- Main Body -->
      <div style="padding: 32px 26px;">
        <h2 style="margin: 0 0 20px 0; font-size: 19px; color: #f8fafc; font-weight: 700;">${title}</h2>
        ${bodyContent}

        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(148, 163, 184, 0.15);">
          <a href="https://vyomai.com/admin" style="display: inline-block; background: #00f0ff; color: #050b14; font-weight: 800; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-size: 14px; letter-spacing: 0.3px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);">
            Open VyomAI Admin Panel
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #08101e; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(148, 163, 184, 0.1);">
        Automated alert generated by <strong style="color: #94a3b8;">VyomAI Core Architecture</strong>. Destination: <span style="color: #00f0ff;">${DESTINATION_EMAIL}</span>
      </div>
    </div>
  `;
}

// ==================== PUBLIC NOTIFICATION HANDLERS ====================

/**
 * Sends a notification email when a user subscribes to the newsletter.
 */
export async function sendSubscriberNotification(
  payload: SubscriberNotificationPayload
): Promise<SendResult> {
  const email = payload.email.trim();
  const dateStr = formatIstDate(payload.subscribedAt);
  const rawSource = (payload.source || "").trim();
  const sourceLabel =
    !rawSource || rawSource.toLowerCase().includes("footer")
      ? "Subscribe"
      : rawSource;

  const htmlContent = buildEmailContainer(
    "New Newsletter Subscriber",
    "Subscriber Alert",
    `
      <div style="background: #0d1726; border-left: 4px solid #00f0ff; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subscriber Email</p>
        <p style="margin: 6px 0 0 0; color: #00f0ff; font-size: 19px; font-weight: 700; word-break: break-all;">${email}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Timestamp (IST)</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${dateStr}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Source</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${sourceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8;">Destination Portal</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right;">VyomAI Admin Dashboard</td>
        </tr>
      </table>
    `
  );

  return dispatchEmail({
    to: DESTINATION_EMAIL,
    subject: `[VyomAI Alert] New Newsletter Subscriber: ${email}`,
    htmlContent,
  });
}

/**
 * Sends a notification email when a client submits the Contact / Consultation form.
 */
export async function sendContactNotification(
  payload: ContactNotificationPayload
): Promise<SendResult> {
  const dateStr = formatIstDate(payload.submittedAt);

  const htmlContent = buildEmailContainer(
    "New Technical Consultation Inquiry",
    "Contact Inquiry",
    `
      <div style="background: #0d1726; border-left: 4px solid #00f0ff; padding: 18px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Inquirer Name</p>
        <p style="margin: 4px 0 12px 0; color: #00f0ff; font-size: 20px; font-weight: 700;">${payload.name}</p>
        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email & Phone</p>
        <p style="margin: 4px 0 0 0; color: #f8fafc; font-size: 15px; font-weight: 600;">
          <a href="mailto:${payload.email}" style="color: #00f0ff; text-decoration: none;">${payload.email}</a>
          ${payload.phone ? ` • <a href="tel:${payload.phone}" style="color: #38bdf8; text-decoration: none;">+91 ${payload.phone}</a>` : ""}
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Target Service</td>
          <td style="padding: 10px 0; color: #00f0ff; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${payload.service || "General Technical Consultation"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Company / Organization</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${payload.company || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Timestamp (IST)</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${dateStr}</td>
        </tr>
      </table>

      <div style="background: #08101e; border: 1px solid #1e293b; padding: 16px; border-radius: 8px;">
        <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Scope & Requirements</p>
        <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${payload.details || "No additional notes provided."}</p>
      </div>
    `
  );

  return dispatchEmail({
    to: DESTINATION_EMAIL,
    subject: `[VyomAI Inquiry] ${payload.name} — ${payload.service || "Consultation"}`,
    htmlContent,
  });
}

/**
 * Sends a notification email when a candidate applies for an open position.
 */
export async function sendCareerNotification(
  payload: CareerNotificationPayload
): Promise<SendResult> {
  const dateStr = formatIstDate(payload.submittedAt);

  const htmlContent = buildEmailContainer(
    "New Job Application Submitted",
    "Careers Portal",
    `
      <div style="background: #0d1726; border-left: 4px solid #00f0ff; padding: 18px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Applicant Name</p>
        <p style="margin: 4px 0 10px 0; color: #00f0ff; font-size: 20px; font-weight: 700;">${payload.name}</p>
        <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Target Role</p>
        <p style="margin: 4px 0 0 0; color: #f8fafc; font-size: 16px; font-weight: 700;">${payload.role}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Candidate Email</td>
          <td style="padding: 10px 0; color: #00f0ff; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">
            <a href="mailto:${payload.email}" style="color: #00f0ff; text-decoration: none;">${payload.email}</a>
          </td>
        </tr>
        ${payload.phone ? `
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Candidate Phone</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">+91 ${payload.phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Experience</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${payload.experienceYears || "Not specified"}</td>
        </tr>
        ${payload.portfolioUrl ? `
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Portfolio / GitHub</td>
          <td style="padding: 10px 0; color: #38bdf8; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">
            <a href="${payload.portfolioUrl}" target="_blank" style="color: #38bdf8; text-decoration: underline;">View Portfolio</a>
          </td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Timestamp (IST)</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${dateStr}</td>
        </tr>
      </table>

      ${payload.pitch ? `
      <div style="background: #08101e; border: 1px solid #1e293b; padding: 16px; border-radius: 8px;">
        <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Candidate Pitch</p>
        <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${payload.pitch}</p>
      </div>` : ""}
    `
  );

  return dispatchEmail({
    to: DESTINATION_EMAIL,
    subject: `[VyomAI Careers] New Application: ${payload.name} — ${payload.role}`,
    htmlContent,
  });
}

/**
 * Diagnostic tool: Checks Brevo API connection and tests authentication.
 */
export async function testBrevoConnection(customKey?: string): Promise<{
  connected: boolean;
  statusCode?: number;
  message: string;
  ipBlocked?: boolean;
  permissionMissing?: boolean;
}> {
  const apiKey = customKey || getBrevoApiKey();
  if (!apiKey) {
    return {
      connected: false,
      message: "No Brevo API Key found in environment (BREVO_API_KEY or SMTP_PASS).",
    };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: DESTINATION_EMAIL }],
        subject: "Ping Test",
        htmlContent: "<p>Ping</p>",
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return {
        connected: true,
        statusCode: res.status,
        message: "Brevo API is fully active and authorized to send transactional emails!",
      };
    }

    const rawMsg = data?.message || `HTTP ${res.status}`;
    const ipBlocked = res.status === 401 && rawMsg.includes("unrecognised IP");
    const permissionMissing =
      res.status === 403 && rawMsg.includes("transactional.email");

    return {
      connected: false,
      statusCode: res.status,
      message: rawMsg,
      ipBlocked,
      permissionMissing,
    };
  } catch (err: unknown) {
    return {
      connected: false,
      message: String((err as Error).message || err),
    };
  }
}

/**
 * Diagnostic tool: Sends a live test email to verify end-to-end setup.
 */
export async function testEmailSend(targetEmail?: string): Promise<SendResult> {
  const recipient = targetEmail || DESTINATION_EMAIL;
  const dateStr = formatIstDate();

  const htmlContent = buildEmailContainer(
    "Brevo Email Dispatch Test",
    "System Diagnostic",
    `
      <div style="background: #0d1726; border-left: 4px solid #10b981; padding: 18px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; color: #10b981; font-size: 16px; font-weight: 700;">Connection Test Successful</p>
        <p style="margin: 6px 0 0 0; color: #cbd5e1; font-size: 14px;">
          This test email confirms that your Brevo integration is active and able to send transactional notifications for subscribers, inquiries, and careers.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Timestamp (IST)</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${dateStr}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Sender Address</td>
          <td style="padding: 10px 0; color: #00f0ff; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${SENDER_EMAIL}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8;">Recipient Address</td>
          <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right;">${recipient}</td>
        </tr>
      </table>
    `
  );

  return dispatchEmail({
    to: recipient,
    subject: `[VyomAI Test] Brevo Email Service Verification (${dateStr})`,
    htmlContent,
  });
}
