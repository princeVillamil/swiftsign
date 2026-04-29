async function sendMail(opts: { to: string; subject: string; html: string }) {
  const apiKey = Bun.env.SMTP_PASS || Bun.env.RESEND_API_KEY;
  const fromEmail = Bun.env.FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || apiKey.includes("your_api_key")) {
    console.log("\n[DEV EMAIL (No API Key)]");
    console.log(`To: ${opts.to}`);
    console.log(`Subject: ${opts.subject}`);
    console.log(`Body preview: ${opts.html.replace(/<[^>]+>/g, "").slice(0, 120)}\n`);
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `SwiftSign <${fromEmail}>`,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const data = await response.json();
    console.log(`[EMAIL SENT]: ${opts.to} (ID: ${data.id})`);
  } catch (err) {
    console.error(`[EMAIL ERROR]: Failed to send email to ${opts.to}`, err);
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