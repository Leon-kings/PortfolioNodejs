const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const storage = multer.diskStorage({});
const upload = multer({ storage });

// CRUD Routes
router.post('/', upload.fields([{ name: 'image' }, { name: 'hoverImage' }]), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'hoverImage' }]), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
