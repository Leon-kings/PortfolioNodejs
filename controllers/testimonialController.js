const mongoose = require("mongoose");
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
        message: "Name, role, and message are required.",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      website,
      message,
      rating: rating || 5,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully.",
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
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean();

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const allowedFields = [
      "name",
      "role",
      "company",
      "website",
      "message",
      "rating",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
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
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};