const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
const emailTemplates = {
  signupOTP: (otp) => ({
    subject: 'QuickCourt - Verify Your Email',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - QuickCourt</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%); 
            padding: 40px 30px; 
            text-align: center; 
            color: white;
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 40px 30px; 
            text-align: center;
          }
          .otp-container { 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
            border-radius: 15px; 
            padding: 30px; 
            margin: 30px 0;
            border: 2px solid #e2e8f0;
          }
          .otp-code { 
            font-size: 48px; 
            font-weight: 700; 
            color: #1e293b; 
            letter-spacing: 8px; 
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .message { 
            color: #475569; 
            font-size: 16px; 
            line-height: 1.6; 
            margin: 20px 0;
          }
          .footer { 
            background: #f1f5f9; 
            padding: 30px; 
            text-align: center; 
            color: #64748b;
            font-size: 14px;
          }
          .sports-icon { 
            font-size: 48px; 
            margin-bottom: 20px;
          }
          .expiry-note { 
            background: #fef3c7; 
            border: 1px solid #f59e0b; 
            border-radius: 8px; 
            padding: 15px; 
            margin: 20px 0; 
            color: #92400e;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="sports-icon">🏀</div>
            <h1>QuickCourt</h1>
            <p>Your Ultimate Sports Booking Platform</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p class="message">
              Welcome to QuickCourt! To complete your registration and start booking sports facilities, 
              please verify your email address using the OTP code below.
            </p>
            
            <div class="otp-container">
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">Your verification code:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 15px 0 0 0; color: #64748b; font-size: 14px;">Enter this code on the verification page</p>
            </div>
            
            <div class="expiry-note">
              ⏰ This code will expire in 5 minutes for security reasons.
            </div>
            
            <p class="message">
              If you didn't create a QuickCourt account, please ignore this email.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 QuickCourt. All rights reserved.</p>
            <p>Book local sports courts in seconds. 🏟️</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  passwordResetOTP: (otp) => ({
    subject: 'QuickCourt - Password Reset Code',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - QuickCourt</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
            min-height: 100vh;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); 
            padding: 40px 30px; 
            text-align: center; 
            color: white;
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 40px 30px; 
            text-align: center;
          }
          .otp-container { 
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
            border-radius: 15px; 
            padding: 30px; 
            margin: 30px 0;
            border: 2px solid #fecaca;
          }
          .otp-code { 
            font-size: 48px; 
            font-weight: 700; 
            color: #991b1b; 
            letter-spacing: 8px; 
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .message { 
            color: #475569; 
            font-size: 16px; 
            line-height: 1.6; 
            margin: 20px 0;
          }
          .footer { 
            background: #f1f5f9; 
            padding: 30px; 
            text-align: center; 
            color: #64748b;
            font-size: 14px;
          }
          .sports-icon { 
            font-size: 48px; 
            margin-bottom: 20px;
          }
          .expiry-note { 
            background: #fef3c7; 
            border: 1px solid #f59e0b; 
            border-radius: 8px; 
            padding: 15px; 
            margin: 20px 0; 
            color: #92400e;
            font-size: 14px;
          }
          .security-note { 
            background: #fef2f2; 
            border: 1px solid #fca5a5; 
            border-radius: 8px; 
            padding: 15px; 
            margin: 20px 0; 
            color: #991b1b;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="sports-icon">🔐</div>
            <h1>QuickCourt</h1>
            <p>Password Reset Request</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Reset Your Password</h2>
            <p class="message">
              We received a request to reset your QuickCourt account password. 
              Use the OTP code below to create a new password.
            </p>
            
            <div class="otp-container">
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">Your reset code:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 15px 0 0 0; color: #64748b; font-size: 14px;">Enter this code on the password reset page</p>
            </div>
            
            <div class="expiry-note">
              ⏰ This code will expire in 5 minutes for security reasons.
            </div>
            
            <div class="security-note">
              🔒 If you didn't request a password reset, please contact our support team immediately.
            </div>
            
            <p class="message">
              After resetting your password, you can log in to your QuickCourt account and continue booking sports facilities.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 QuickCourt. All rights reserved.</p>
            <p>Book local sports courts in seconds. 🏟️</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = template(data);
    
    const mailOptions = {
      from: `"QuickCourt" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Send OTP email for signup
const sendSignupOTP = async (email, otp) => {
  return sendEmail(email, emailTemplates.signupOTP, otp);
};

// Send OTP email for password reset
const sendPasswordResetOTP = async (email, otp) => {
  return sendEmail(email, emailTemplates.passwordResetOTP, otp);
};

module.exports = {
  sendSignupOTP,
  sendPasswordResetOTP,
  sendEmail
};

