const User = require('../models/User');

// @desc    Create a new admin (optional, only if needed)
// @route   POST /api/admin/create
// @access  Private (you can protect this later)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/adminController.js
const User = require('../models/User');

// Delete an admin by ID or email
exports.deleteAdmin = async (req, res) => {
  try {
    const { id, email } = req.body;

    // Validate input
    if (!id && !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide admin ID or email to delete",
      });
    }

    // Find the admin
    const admin = id
      ? await User.findById(id)
      : await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Ensure role is admin
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can be deleted via this route",
      });
    }

    // Delete admin
    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: `Admin ${admin.email} deleted successfully`,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Delete admin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// controllers/adminController.js

exports.logoutAdmin = async (req, res) => {
  try {
    // Optionally, you can update lastLogin or isActive
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { lastLogin: new Date() });
    }

    res.status(200).json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await User.findOne({ email }).select('+password');
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id); // assuming admin ID is in req.admin
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
