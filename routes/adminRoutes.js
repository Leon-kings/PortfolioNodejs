// const express = require("express");
// const router = express.Router();
// const {
//   createAdmin,
//   loginAdmin,
//   getAdminProfile,
//   logoutAdmin,
//   deleteAdmin,
// } = require("../controllers/adminController");

// // Public route
// router.post("/login", loginAdmin);

// // Optional: create admin (use protectAdmin if you want only existing admin to create new one)
// router.post("/create", createAdmin);
// // Protected route
// router.get("/profile", getAdminProfile);
// router.post("/logout", logoutAdmin);
// router.delete("/", deleteAdmin);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const {
//   createAdmin,
//   loginAdmin,
//   getAdminProfile,
//   logoutAdmin,
//   deleteAdmin,
// } = require('../controllers/adminController');


// // Public
// router.post('/login', loginAdmin);
// router.post('/create', createAdmin); // optional, protect if needed

// // Protected
// router.get('/profile', getAdminProfile);
// router.post('/logout', logoutAdmin);
// router.delete('/', deleteAdmin);

// module.exports = router;




const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const { protectAdmin } = require("../middleware/authMiddleware");

// Public route
router.post("/login", loginAdmin);

// Optional: create admin (can protect if needed)
router.post("/create", createAdmin);

// Protected routes
router.get("/profile", protectAdmin, getAdminProfile);
router.post("/logout", protectAdmin, logoutAdmin);
router.delete("/:id", protectAdmin, deleteAdmin);

module.exports = router;
