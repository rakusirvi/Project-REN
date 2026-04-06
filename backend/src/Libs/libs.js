function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpHtml(otp) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }
        .email-wrapper {
          width: 100%;
          background-color: #f9fafb;
          padding: 40px 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        .header {
          background-color: #4f46e5;
          padding: 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 32px 24px;
          text-align: center;
        }
        .content p {
          color: #374151;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }
        .otp-container {
          background-color: #f3f4f6;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        .otp-code {
          font-size: 36px;
          font-weight: 700;
          color: #111827;
          letter-spacing: 8px;
          margin: 0;
        }
        .warning {
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
        }
        .footer {
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          padding: 24px;
          text-align: center;
        }
        .footer p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <div class="header">
            <h1>Verification Code</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have requested to verify your account. Please use the following One-Time Password (OTP) to complete your verification process:</p>
            
            <div class="otp-container">
              <p class="otp-code">${otp}</p>
            </div>
            
            <p class="warning">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
          </div>
          <div class="footer">
            <p>If you didn't request this verification, you can safely ignore this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
}

function generateJoiningToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function getJoiningTokenHTML(token, role) {
  return `
  
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f3f4f6;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          background-color: #f3f4f6;
          padding: 48px 20px;
        }
        .container {
          max-width: 540px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .accent-bar {
          height: 6px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
        }
        .hero {
          padding: 40px 32px 20px;
          text-align: center;
        }
        .hero h1 {
          color: #111827;
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 10px;
          letter-spacing: -0.025em;
        }
        .hero p {
          color: #4b5563;
          font-size: 16px;
          margin: 0;
        }
        .content {
          padding: 0 32px 40px;
          text-align: center;
        }
        .invitation-details {
          background-color: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          border: 1px dashed #d1d5db;
        }
        .label {
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .token-display {
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 32px;
          font-weight: 700;
          color: #4f46e5;
          letter-spacing: 4px;
          margin: 12px 0;
        }
        .role-badge {
          display: inline-block;
          background-color: #e0e7ff;
          color: #4338ca;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 8px;
        }
        .instructions {
          color: #374151;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .footer {
          background-color: #fafafa;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #f3f4f6;
        }
        .footer p {
          color: #9ca3af;
          font-size: 12px;
          margin: 0;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="accent-bar"></div>
          <div class="hero">
            <h1>Welcome to REN</h1>
            <p>You've been invited to join the organization.</p>
          </div>
          <div class="content">
            <div class="invitation-details">
              <div class="label">Your Joining Token</div>
              <div class="token-display">${token}</div>
              <div class="role-badge">Position: ${role}</div>
            </div>
            
            <p class="instructions">
              Enter this token in the REN app to verify your identity and set up your secure password.
            </p>
            
            <p style="font-size: 13px; color: #9ca3af;">
              This token is personal to you. For security reasons, do not forward this email or share the code.
            </p>
          </div>
          <div class="footer">
            <p>If you were not expecting an invitation from <strong>REN</strong>, please contact your administrator or ignore this message.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export { generateOtp, getOtpHtml, generateJoiningToken, getJoiningTokenHTML };
