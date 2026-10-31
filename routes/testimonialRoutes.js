const express = require("express");

const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// CREATE
router.post("/", createTestimonial);

// GET ALL
router.get("/", getTestimonials);

// GET SINGLE
router.get("/:id", getTestimonialById);

// UPDATE
router.put("/:id", updateTestimonial);

// DELETE
router.delete("/:id", deleteTestimonial);

module.exports = router;