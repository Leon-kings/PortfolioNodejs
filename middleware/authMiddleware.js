const User = require('../models/User');

// Simple auth middleware (JWT optional)
exports.protectAdmin = async (req, res, next) => {
  try {
    // For simplicity, we use a header "x-admin-id"
    const adminId = req.headers['x-admin-id'];
    if (!adminId) return res.status(401).json({ message: 'Not authorized' });

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
