// const User = require('../models/User');

// // @desc    Create a new admin (optional, only if needed)
// // @route   POST /api/admin/create
// // @access  Private (you can protect this later)
// exports.createAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await User.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     const admin = await User.create({
//       name,
//       email,
//       password,
//       role: 'admin'
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete an admin by ID or email
// exports.deleteAdmin = async (req, res) => {
//   try {
//     const { id, email } = req.body;

//     // Validate input
//     if (!id && !email) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide admin ID or email to delete",
//       });
//     }

//     // Find the admin
//     const admin = id
//       ? await User.findById(id)
//       : await User.findOne({ email });

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found",
//       });
//     }

//     // Ensure role is admin
//     if (admin.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Only admins can be deleted via this route",
//       });
//     }

//     // Delete admin
//     await admin.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: `Admin ${admin.email} deleted successfully`,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (err) {
//     console.error("Delete admin error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // controllers/adminController.js

// exports.logoutAdmin = async (req, res) => {
//   try {
//     // Optionally, you can update lastLogin or isActive
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, { lastLogin: new Date() });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Admin logged out successfully'
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Admin login
// // @route   POST /api/admin/login
// // @access  Public
// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find admin
//     const admin = await User.findOne({ email }).select('+password');
//     if (!admin || admin.role !== 'admin') {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Update last login
//     admin.lastLogin = new Date();
//     await admin.save();

//     res.status(200).json({
//       success: true,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Get admin profile
// // @route   GET /api/admin/profile
// // @access  Private
// exports.getAdminProfile = async (req, res) => {
//   try {
//     const admin = await User.findById(req.admin.id); // assuming admin ID is in req.admin
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     res.status(200).json({
//       success: true,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//         lastLogin: admin.lastLogin
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
















// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = '6h';

// // Generate JWT token
// const generateToken = (admin) => {
//   return jwt.sign(
//     { id: admin._id, role: admin.role, email: admin.email },
//     JWT_SECRET,
//     { expiresIn: JWT_EXPIRES_IN }
//   );
// };

// // @desc    Create admin (optional)
// exports.createAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingAdmin = await User.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ success: false, message: 'Admin already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'admin',
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // @desc    Delete admin by ID or email
// exports.deleteAdmin = async (req, res) => {
//   try {
//     const { id, email } = req.body;
//     if (!id && !email) {
//       return res.status(400).json({ success: false, message: 'Provide ID or email' });
//     }

//     const admin = id ? await User.findById(id) : await User.findOne({ email });
//     if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
//     if (admin.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Only admins can be deleted' });
//     }

//     await admin.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: `Admin ${admin.email} deleted`,
//       data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // @desc    Admin login
// // exports.loginAdmin = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const admin = await User.findOne({ email }).select('+password');

// //     if (!admin || admin.role !== 'admin') {
// //       return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }

// //     const isMatch = await bcrypt.compare(password, admin.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }

// //     // Update last login
// //     admin.lastLogin = new Date();
// //     await admin.save();

// //     const token = generateToken(admin);

// //     res.status(200).json({
// //       success: true,
// //       token,
// //       user: {
// //         id: admin._id,
// //         name: admin.name,
// //         email: admin.email,
// //         role: admin.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // };

// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await User.findOne({ email }).select("+password");
//     if (!admin || admin.role !== "admin") {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Sign JWT
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "6h" } // or your preferred expiry
//     );

//     res.status(200).json({
//       success: true,
//       token, // <- send token here
//       user: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // @desc    Logout admin (optional backend logic)
// exports.logoutAdmin = async (req, res) => {
//   try {
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, { lastLogin: new Date() });
//     }
//     res.status(200).json({ success: true, message: 'Admin logged out successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // @desc    Get admin profile
// exports.getAdminProfile = async (req, res) => {
//   try {
//     const admin = await User.findById(req.user.id);
//     if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });

//     res.status(200).json({
//       success: true,
//       data: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//         lastLogin: admin.lastLogin,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



























const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Create a new admin (optional)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

// @desc    Admin login
// @route   POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email }).select('+password');
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(admin);

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id);
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

// @desc    Admin logout
// @route   POST /api/admin/logout
exports.logoutAdmin = async (req, res) => {
  try {
    if (req.admin) {
      await User.findByIdAndUpdate(req.admin.id, { lastLogin: new Date() });
    }
    res.status(200).json({ success: true, message: 'Admin logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an admin
// @route   DELETE /api/admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id && !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide admin ID or email to delete'
      });
    }

    const admin = id
      ? await User.findById(id)
      : await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can be deleted' });
    }

    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: `Admin ${admin.email} deleted successfully`,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
