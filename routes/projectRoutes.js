const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const projectController = require("../controllers/projectController");

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  projectController.createProject
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  projectController.updateProject
);

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
