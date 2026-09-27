const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod');
    
    // Attach the user to the request
    const adminUser = await AdminUser.findById(decoded.id).select('-passwordHash');
    if (!adminUser) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.adminUser = adminUser;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Token invalid or expired' });
  }
};

module.exports = requireAuth;
