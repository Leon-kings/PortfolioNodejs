const Testimonial = require("../models/Testimonial");

// CREATE TESTIMONIAL
const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      role,
      company,
      website,
      message,
      rating,
    } = req.body;

    if (!name || !role || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, role and message are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      website,
      message,
      rating: rating ?? 5,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully",
      testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit testimonial",
      error: error.message,
    });
  }
};

// GET ALL TESTIMONIALS
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// GET SINGLE TESTIMONIAL
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
      error: error.message,
    });
  }
};

// UPDATE TESTIMONIAL
const updateTestimonial = async (req, res) => {
  try {
    const {
      name,
      role,
      company,
      website,
      message,
      rating,
    } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        company,
        website,
        message,
        rating,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// DELETE TESTIMONIAL
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};