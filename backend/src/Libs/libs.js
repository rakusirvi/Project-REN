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

export { generateOtp, getOtpHtml };
