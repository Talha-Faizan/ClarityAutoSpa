const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const AdminUser = require('../models/AdminUser');
const requireAuth = require('../middleware/requireAuth');

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: { error: 'Too many login attempts, please try again after 15 minutes.' }
});

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    const admin = await AdminUser.findOne({ email: email.toLowerCase() });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const payload = {
      id: admin._id
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Client-side token discard placeholder
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

// @route   GET /api/auth/session
// @desc    Verify JWT and return session
router.get('/session', requireAuth, (req, res) => {
  res.json({
    admin: {
      id: req.adminUser._id,
      email: req.adminUser.email
    }
  });
});

module.exports = router;
