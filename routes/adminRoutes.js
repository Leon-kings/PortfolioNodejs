const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Public route
router.post("/login", loginAdmin);

// Optional: create admin (use protectAdmin if you want only existing admin to create new one)
router.post("/create", createAdmin);

// Protected route
router.get("/profile", protectAdmin, getAdminProfile);
router.post("/logout", protectAdmin, logoutAdmin);

module.exports = router;
