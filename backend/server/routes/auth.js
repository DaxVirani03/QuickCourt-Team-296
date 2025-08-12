const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ ok: true, route: 'auth' });
});

// Helper to sign JWT
const signToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  (req, res, next) => {
    // Custom Multer error handler
    upload.single('avatar')(req, res, function (err) {
      if (err) {
        // Multer error (file upload)
        return res.status(400).json({
          errors: [{ msg: 'Avatar upload failed', type: 'MULTER', detail: err.message }]
        });
      }
      next();
    });
  },
  [
    body('fullName').trim().isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please enter a valid phone number'),
    body('role').isIn(['user', 'facility_owner']).withMessage('Role must be either user or facility_owner')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullName, email, password, phone, role } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Email already registered', type: 'DUPLICATE_EMAIL' }] });
      }

      // Handle avatar upload
      let avatar = '';
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      }

      // Create user
      user = new User({
        fullName,
        email,
        password,
        phone,
        role,
        avatar,
        isEmailVerified: true // Set as verified by default (no OTP required)
      });

      await user.save();

      res.status(201).json({
        msg: 'Registration successful! You can now login.',
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified
        }
      });
    } catch (err) {
      // Database or unknown error
      console.error('Registration error:', err);
      res.status(500).json({
        errors: [{ msg: 'Server error', type: 'SERVER', detail: err.message }]
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user and return JWT
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      console.log('Login attempt for email:', email);
      
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials', type: 'AUTH' }] });
      }

      console.log('User found:', user.email, 'Role:', user.role);
      
      const isMatch = await user.comparePassword(password);
      console.log('Password match:', isMatch);
      
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials', type: 'AUTH' }] });
      }

      if (!user.isActive) {
        return res.status(403).json({ errors: [{ msg: 'Account is deactivated', type: 'ACCOUNT' }] });
      }

      const token = signToken(user);
      // Hide password before sending
      user.password = undefined;

      console.log('Login successful for:', user.email);
      
      res.json({
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified
        },
        token
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ errors: [{ msg: 'Server error', type: 'SERVER', detail: err.message }] });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

// Temporary route to create test user (remove in production)
router.get('/create-test-user', async (req, res) => {
  try {
    // Check if test user already exists
    let testUser = await User.findOne({ email: 'test@quickcourt.com' });
    if (testUser) {
      return res.json({ 
        message: 'Test user already exists',
        user: {
          email: testUser.email,
          password: '123456',
          role: testUser.role
        }
      });
    }

    // Create test user
    testUser = new User({
      fullName: 'Test User',
      email: 'test@quickcourt.com',
      password: '123456',
      phone: '1234567890',
      role: 'user',
      isEmailVerified: true
    });

    await testUser.save();

    res.json({ 
      message: 'Test user created successfully',
      user: {
        email: testUser.email,
        password: '123456',
        role: testUser.role
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
