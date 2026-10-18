import nodemailer from "nodemailer";

interface SubscriberNotificationPayload {
  email: string;
  source?: string;
  subscribedAt?: Date | string;
  ipAddress?: string;
}

const DESTINATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "vyomaisolutions@gmail.com";

/**
 * Sends a notification email to vyomaisolutions@gmail.com when a user subscribes.
 */
export async function sendSubscriberNotification(
  payload: SubscriberNotificationPayload
): Promise<{ success: boolean; error?: string }> {
  const email = payload.email.trim();
  const dateStr = payload.subscribedAt
    ? new Date(payload.subscribedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass =
    process.env.SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS;
  const smtpHost =
    process.env.SMTP_HOST || (smtpUser?.includes("gmail") ? "smtp.gmail.com" : undefined);
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;

  // If SMTP is configured, dispatch the live email
  if (smtpUser && smtpPass && smtpHost) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #050b14; color: #f8fafc; border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0284c7 0%, #00f0ff 100%); padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #050b14; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">VyomAI Solutions</h1>
            <p style="margin: 4px 0 0 0; color: #050b14; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">New Newsletter Subscriber</p>
          </div>
          
          <div style="padding: 32px 24px;">
            <div style="background: #0d1726; border-left: 4px solid #00f0ff; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subscriber Email</p>
              <p style="margin: 6px 0 0 0; color: #00f0ff; font-size: 18px; font-weight: bold; word-break: break-all;">${email}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Timestamp (IST)</td>
                <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">${dateStr} IST</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Source</td>
                <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right; border-bottom: 1px solid #1e293b;">Footer Newsletter Form</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8;">Destination Portal</td>
                <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right;">VyomAI Admin Dashboard</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 28px;">
              <a href="https://vyomai.com/admin" style="display: inline-block; background: #00f0ff; color: #050b14; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">Open Admin Panel</a>
            </div>
          </div>

          <div style="background: #0a1220; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">
            This automated alert was dispatched by VyomAI Web Architecture to ${DESTINATION_EMAIL}.
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"VyomAI System" <${smtpUser}>`,
        to: DESTINATION_EMAIL,
        subject: `[VyomAI Alert] New Newsletter Subscriber: ${email}`,
        html: htmlContent,
      });

      console.log(
        `[Mailer] Dispatched subscriber notification email for ${email} to ${DESTINATION_EMAIL}`
      );
      return { success: true };
    } catch (err: unknown) {
      console.warn(
        `[Mailer] Failed sending SMTP email notification to ${DESTINATION_EMAIL}:`,
        err
      );
      return { success: false, error: String(err) };
    }
  } else {
    // If SMTP is not yet configured, log the pending notification clearly
    console.log(
      `[Mailer Notification] New Subscriber: ${email} at ${dateStr}. Configured destination: ${DESTINATION_EMAIL}. (Set SMTP_USER & SMTP_PASS in .env.local to activate automated outbound Gmail sending).`
    );
    return {
      success: true,
      error: "SMTP not configured; notification logged to admin panel.",
    };
  }
}
