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












const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  createProject
);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/:id", deleteProject);

module.exports = router;
