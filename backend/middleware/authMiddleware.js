const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!req.user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated. Contact Admin.' });
      }

      // CRITICAL: Return here so the code below DOES NOT run
      return next(); 

    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If we reach here, it means no token was found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { protect, authorize };