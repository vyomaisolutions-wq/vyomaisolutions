import { NextRequest, NextResponse } from "next/server";
import { testBrevoConnection, testEmailSend } from "@/lib/mailer";

export async function GET() {
  const brevoApiKey =
    process.env.BREVO_API_KEY ||
    (process.env.SMTP_PASS?.startsWith("xkeysib-")
      ? process.env.SMTP_PASS
      : undefined);

  const smtpUser = process.env.SMTP_USER;
  const smtpHost = process.env.SMTP_HOST;
  const destinationEmail =
    process.env.NOTIFICATION_EMAIL || "vyomaisolutions@gmail.com";
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || "vyomaisolutions@gmail.com";

  let brevoTestResult = null;
  if (brevoApiKey) {
    brevoTestResult = await testBrevoConnection(brevoApiKey);
  }

  return NextResponse.json({
    hasBrevoKey: !!brevoApiKey,
    brevoKeyPreview: brevoApiKey
      ? `${brevoApiKey.slice(0, 10)}...${brevoApiKey.slice(-4)}`
      : null,
    hasSmtpConfig: !!(smtpUser && smtpHost),
    smtpHost: smtpHost || null,
    destinationEmail,
    senderEmail,
    brevoStatus: brevoTestResult,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const recipient = body.recipient || process.env.NOTIFICATION_EMAIL;

    const result = await testEmailSend(recipient);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: String((err as Error).message || err),
      },
      { status: 500 }
    );
  }
}
