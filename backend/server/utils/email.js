const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = port === 465; // true for 465, false otherwise
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"QuickCourt" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  // OTP for signup verification
  signupOTP: (userName, otp) => ({
    subject: 'QuickCourt - Verify Your Email',
    message: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header with sports theme -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white; border-radius: 12px 12px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">🏀</div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">QuickCourt</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your Local Sports Booking Platform</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px; background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Hi ${userName}! 👋</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            Welcome to QuickCourt! We're excited to have you join our community of sports enthusiasts. 
            To complete your registration, please verify your email address using the OTP code below.
          </p>
          
          <!-- OTP Display Box -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px dashed #dee2e6;">
            <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Verification Code</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; border: 2px solid #667eea;">
              <span style="font-size: 32px; font-weight: 700; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
            </div>
            <p style="color: #6c757d; margin: 15px 0 0 0; font-size: 14px;">
              This code will expire in <strong>5 minutes</strong>
            </p>
          </div>
          
          <!-- Sports-themed info box -->
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #2196f3;">
            <h3 style="color: #1976d2; margin-top: 0; font-size: 18px; font-weight: 600;">🏆 What's Next?</h3>
            <ul style="color: #1565c0; line-height: 1.8; margin: 15px 0 0 0; padding-left: 20px;">
              <li>Enter this OTP code on the verification page</li>
              <li>Start exploring sports facilities near you</li>
              <li>Book courts and join games</li>
              <li>Connect with fellow sports enthusiasts</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>🔒 Security Note:</strong> Never share this OTP with anyone. QuickCourt will never ask for your OTP via phone or email.
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            If you didn't create an account with QuickCourt, please ignore this email.
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Best regards,<br>
            <strong>The QuickCourt Team</strong> 🏀⚽🎾
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #343a40; padding: 20px; text-align: center; color: white; border-radius: 12px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved. | Making sports accessible to everyone.
          </p>
        </div>
      </div>
    `
  }),

  // OTP for password reset
  passwordResetOTP: (userName, otp) => ({
    subject: 'QuickCourt - Password Reset Code',
    message: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header with sports theme -->
        <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px; text-align: center; color: white; border-radius: 12px 12px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">QuickCourt</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Password Reset Request</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px; background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Hi ${userName}! 🔑</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            You requested a password reset for your QuickCourt account. Use the OTP code below to reset your password and get back to booking your favorite sports facilities.
          </p>
          
          <!-- OTP Display Box -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px dashed #dee2e6;">
            <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Password Reset Code</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; border: 2px solid #dc3545;">
              <span style="font-size: 32px; font-weight: 700; color: #dc3545; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
            </div>
            <p style="color: #6c757d; margin: 15px 0 0 0; font-size: 14px;">
              This code will expire in <strong>5 minutes</strong>
            </p>
          </div>
          
          <!-- Security info box -->
          <div style="background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #dc3545;">
            <h3 style="color: #721c24; margin-top: 0; font-size: 18px; font-weight: 600;">⚠️ Security Notice</h3>
            <ul style="color: #721c24; line-height: 1.8; margin: 15px 0 0 0; padding-left: 20px;">
              <li>If you didn't request this password reset, ignore this email</li>
              <li>Your current password will remain unchanged</li>
              <li>Never share this OTP with anyone</li>
              <li>QuickCourt will never ask for your OTP via phone</li>
            </ul>
          </div>
          
          <!-- Sports motivation -->
          <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #155724; margin-top: 0; font-size: 18px; font-weight: 600;">🏀 Get Back in the Game!</h3>
            <p style="color: #155724; margin: 0; line-height: 1.6;">
              Once you reset your password, you'll be back to booking courts, joining games, and staying active with QuickCourt!
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Best regards,<br>
            <strong>The QuickCourt Team</strong> 🏀⚽🎾
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #343a40; padding: 20px; text-align: center; color: white; border-radius: 12px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved. | Making sports accessible to everyone.
          </p>
        </div>
      </div>
    `
  }),

  // OTP for login verification (2FA)
  loginOTP: (userName, otp) => ({
    subject: 'QuickCourt - Login Verification Code',
    message: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header with sports theme -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px; text-align: center; color: white; border-radius: 12px 12px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">🔒</div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">QuickCourt</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Login Verification</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px; background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Hi ${userName}! 🏀</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            You're trying to log in to your QuickCourt account. To complete your login, please enter the verification code below. This adds an extra layer of security to your account.
          </p>
          
          <!-- OTP Display Box -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px dashed #dee2e6;">
            <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Login Verification Code</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; border: 2px solid #28a745;">
              <span style="font-size: 32px; font-weight: 700; color: #28a745; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
            </div>
            <p style="color: #6c757d; margin: 15px 0 0 0; font-size: 14px;">
              This code will expire in <strong>5 minutes</strong>
            </p>
          </div>
          
          <!-- Security info box -->
          <div style="background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #17a2b8;">
            <h3 style="color: #0c5460; margin-top: 0; font-size: 18px; font-weight: 600;">🔒 Security Feature</h3>
            <ul style="color: #0c5460; line-height: 1.8; margin: 15px 0 0 0; padding-left: 20px;">
              <li>This is a two-factor authentication (2FA) feature</li>
              <li>It protects your account from unauthorized access</li>
              <li>Never share this code with anyone</li>
              <li>QuickCourt will never ask for this code via phone</li>
            </ul>
          </div>
          
          <!-- Sports motivation -->
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #2196f3;">
            <h3 style="color: #1976d2; margin-top: 0; font-size: 18px; font-weight: 600;">🏆 Ready to Play!</h3>
            <p style="color: #1976d2; margin: 0; line-height: 1.6;">
              Once verified, you'll be back to booking courts, joining games, and staying active with QuickCourt!
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Best regards,<br>
            <strong>The QuickCourt Team</strong> 🏀⚽🎾
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #343a40; padding: 20px; text-align: center; color: white; border-radius: 12px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved. | Making sports accessible to everyone.
          </p>
        </div>
      </div>
    `
  }),

  welcome: (userName) => ({
    subject: 'Welcome to QuickCourt!',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Welcome to QuickCourt!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Your local sports booking platform</p>
        </div>
        
        <div style="padding: 40px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName},</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Welcome to QuickCourt! We're excited to have you join our community of sports enthusiasts.
          </p>
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            With QuickCourt, you can easily book sports facilities, discover new venues, and connect with fellow players.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/venues" 
               style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Explore Venues
            </a>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">What you can do:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Browse and book sports facilities</li>
              <li>Read reviews and ratings</li>
              <li>Manage your bookings</li>
              <li>Connect with other players</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, feel free to reach out to our support team.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The QuickCourt Team
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  verification: (userName, verificationUrl) => ({
    subject: 'Verify Your Email - QuickCourt',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Email Verification</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">QuickCourt</p>
        </div>
        
        <div style="padding: 40px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName},</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for registering with QuickCourt! To complete your registration, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin: 0;">
              <strong>Important:</strong> This link will expire in 10 minutes. If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="color: #856404; margin: 10px 0 0 0; word-break: break-all;">
              ${verificationUrl}
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you didn't create an account with QuickCourt, please ignore this email.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The QuickCourt Team
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  passwordReset: (userName, resetUrl) => ({
    subject: 'Password Reset - QuickCourt',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Password Reset</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">QuickCourt</p>
        </div>
        
        <div style="padding: 40px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName},</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            You requested a password reset for your QuickCourt account. Click the button below to reset your password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin: 0;">
              <strong>Important:</strong> This link will expire in 10 minutes. If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="color: #856404; margin: 10px 0 0 0; word-break: break-all;">
              ${resetUrl}
            </p>
          </div>
          
          <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #17a2b8;">
            <p style="color: #0c5460; margin: 0;">
              <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged.
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The QuickCourt Team
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  bookingConfirmation: (userName, bookingDetails) => ({
    subject: 'Booking Confirmed - QuickCourt',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">QuickCourt</p>
        </div>
        
        <div style="padding: 40px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName},</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Your booking has been confirmed! Here are the details:
          </p>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin: 30px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong style="color: #333;">Facility:</strong><br>
                <span style="color: #666;">${bookingDetails.facilityName}</span>
              </div>
              <div>
                <strong style="color: #333;">Court:</strong><br>
                <span style="color: #666;">${bookingDetails.courtName}</span>
              </div>
              <div>
                <strong style="color: #333;">Date:</strong><br>
                <span style="color: #666;">${bookingDetails.date}</span>
              </div>
              <div>
                <strong style="color: #333;">Time:</strong><br>
                <span style="color: #666;">${bookingDetails.time}</span>
              </div>
              <div>
                <strong style="color: #333;">Duration:</strong><br>
                <span style="color: #666;">${bookingDetails.duration} hours</span>
              </div>
              <div>
                <strong style="color: #333;">Total Amount:</strong><br>
                <span style="color: #28a745; font-weight: bold;">$${bookingDetails.totalAmount}</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/bookings" 
               style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              View My Bookings
            </a>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">What to expect:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Arrive 10 minutes before your booking time</li>
              <li>Bring your own equipment if required</li>
              <li>Check in at the facility reception</li>
              <li>Enjoy your game!</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you need to cancel or modify your booking, please do so at least 24 hours in advance.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The QuickCourt Team
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 QuickCourt. All rights reserved.
          </p>
        </div>
      </div>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
}; 