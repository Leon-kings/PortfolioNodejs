// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");
// const projectController = require("../controllers/projectController");

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   projectController.createProject
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   projectController.updateProject
// );

// router.get("/", projectController.getProjects);
// router.get("/:id", projectController.getProjectById);
// router.delete("/:id", projectController.deleteProject);

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");
// const projectController = require("../controllers/projectController");

// // ----------------------------
// // CREATE PROJECT
// // ----------------------------
// // Accepts "image" (required) and "hoverImage" (optional)
// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   projectController.createProject
// );

// // ----------------------------
// // UPDATE PROJECT
// // ----------------------------
// // Accepts new images optionally
// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   projectController.updateProject
// );

// // ----------------------------
// // GET ALL PROJECTS
// // ----------------------------
// router.get("/", projectController.getProjects);

// // ----------------------------
// // GET SINGLE PROJECT
// // ----------------------------
// router.get("/:id", projectController.getProjectById);

// // ----------------------------
// // DELETE PROJECT
// // ----------------------------
// router.delete("/:id", projectController.deleteProject);

// module.exports = router;












// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const {
//   createProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } = require("../controllers/projectController");

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   createProject
// );

// router.get("/", getProjects);

// router.get("/:id", getProjectById);

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "hoverImage", maxCount: 1 },
//   ]),
//   updateProject
// );

// router.delete("/:id", deleteProject);

// module.exports = router;

















// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/multer"); // multer for handling files
// const {
//   createProject,
//   getProjects,
//   updateProject,
//   deleteProject,
// } = require("../controllers/projectController");

// // Full CRUD
// router.get("/", getProjects);
// router.post("/", upload.fields([{ name: "image" }, { name: "hoverImage" }]), createProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

// module.exports = router;















const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const rateLimit = require("express-rate-limit"); // npm install express-rate-limit

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  bulkDeleteProjects,
  getProjectStats
} = require("../controllers/projectController");


// Rate limiting for updates
const updateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many update requests from this IP, please try again later"
});

// GET routes
router.get("/", getProjects);
router.get("/stats", getProjectStats);
router.get("/:id", getProjectById);

// POST routes with rate limiting
router.post(
  "/", 
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 }
  ]), 
  createProject
);

// PUT routes with rate limiting
router.put(
  "/:id", 
//   updateLimiter,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 }
  ]), 
  updateProject
);

// DELETE routes
router.delete("/:id", deleteProject);
router.delete("/", bulkDeleteProjects);

module.exports = router;

