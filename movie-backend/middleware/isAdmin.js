const User = require('../models/User');

// Toggle this to switch between DB-verified and token-based admin check
const VERIFY_FROM_DB = false;

const isAdmin = async (req, res, next) => {
  if (!req.user?.id || !req.user?.role) {
    return res.status(401).json({ message: 'Invalid token payload' });
  }

  if (VERIFY_FROM_DB) {
    // Slower but always accurate
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Authorization failed' });
    }
  } else {
    // Faster but assumes token has correct role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  }
};

module.exports = isAdmin;
