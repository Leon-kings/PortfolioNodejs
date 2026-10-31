const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

router.post("/", createTestimonial);

router.get("/", getAllTestimonials);

router.get("/:id", getTestimonialById);

router.put("/:id", updateTestimonial);

router.delete("/:id", deleteTestimonial);

module.exports = router;