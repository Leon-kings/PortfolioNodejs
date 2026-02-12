const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "games"],
      default: "web",
    },
    image: { type: String, required: true },
    hoverImage: { type: String },
    description: { type: String },
    fullDescription: { type: String },
    technologies: [String],
    features: [String],
    links: {
      live: { type: String },
      code: { type: String },
    },
    stats: {
      clients: { type: String, default: "1" },
      rating: { type: String, default: "4.2" },
      projects: { type: String, default: "1" },
    },
    color: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
