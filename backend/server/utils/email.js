const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
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