import nodemailer from "nodemailer";

function createTransport() {
  if (!Bun.env.SMTP_HOST) {
    // Dev mode: log emails to console instead of sending
    return null;
  }
  return nodemailer.createTransport({
    host: Bun.env.SMTP_HOST,
    port: Number(Bun.env.SMTP_PORT) || 587,
    secure: Bun.env.SMTP_SECURE === "true",
    auth: {
      user: Bun.env.SMTP_USER,
      pass: Bun.env.SMTP_PASS,
    },
    // Fail fast if connection cannot be established
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

const transporter = createTransport();

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendMail(opts: MailOptions) {
  if (!transporter) {
    console.log("\n[DEV EMAIL]");
    console.log(`To: ${opts.to}`);
    console.log(`Subject: ${opts.subject}`);
    console.log(`Body preview: ${opts.html.replace(/<[^>]+>/g, "").slice(0, 120)}\n`);
    return;
  }
  
  // Use Resend onboarding email as default to avoid 550 errors
  const fromEmail = Bun.env.FROM_EMAIL ?? "onboarding@resend.dev";
  
  try {
    await transporter.sendMail({
      from: `"SwiftSign" <${fromEmail}>`,
      ...opts,
    });
  } catch (err) {
    console.error(`[EMAIL ERROR]: Failed to send email to ${opts.to}`, err);
    // DO NOT re-throw. We don't want an email failure to crash a successful signing process.
  }
}

export async function sendSigningRequest({
  to,
  title,
  requesterEmail,
  signingToken,
}: {
  to: string;
  title: string;
  requesterEmail: string;
  signingToken: string;
}) {
  const frontendUrl = Bun.env.FRONTEND_URL ?? "http://localhost:5173";
  const signingUrl = `${frontendUrl}/sign/${signingToken}`;

  await sendMail({
    to,
    subject: `Please sign: ${title}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="color:#111">You have a document to sign</h2>
        <p><strong>${requesterEmail}</strong> has requested your signature on
           <strong>"${title}"</strong>.</p>
        <div style="margin:24px 0">
          <a href="${signingUrl}"
             style="display:inline-block;padding:12px 24px;
                    background:#111;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">
            Review &amp; Sign
          </a>
        </div>
        <p style="color:#666;font-size:13px;border-top:1px solid #eee;padding-top:16px">
          This link expires in 7 days. If you did not expect this email, you can ignore it.
        </p>
      </div>
    `,
  });
}

export async function sendSignedNotification({
  to,
  title,
  signerEmail,
  documentId,
}: {
  to: string;
  title: string;
  signerEmail: string;
  documentId: string;
}) {
  const frontendUrl = Bun.env.FRONTEND_URL ?? "http://localhost:5173";
  const downloadUrl = `${frontendUrl}/dashboard`;

  await sendMail({
    to,
    subject: `Signed: ${title}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="color:#111">Document signed</h2>
        <p><strong>${signerEmail}</strong> has signed
           <strong>"${title}"</strong>.</p>
        <a href="${downloadUrl}"
           style="display:inline-block;margin:16px 0;padding:12px 24px;
                  background:#111;color:#fff;text-decoration:none;border-radius:8px">
          Download signed PDF
        </a>
      </div>
    `,
  });
}