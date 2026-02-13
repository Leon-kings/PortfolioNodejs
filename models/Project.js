// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     category: {
//       type: String,
//       required: true,
//       enum: ["web", "mobile", "games"],
//       default: "web",
//     },
//     image: { type: String, required: true },
//     hoverImage: { type: String },
//     description: { type: String },
//     fullDescription: { type: String },
//     technologies: [String],
//     features: [String],
//     links: {
//       live: { type: String },
//       code: { type: String },
//     },
//     stats: {
//       clients: { type: String, default: "1" },
//       rating: { type: String, default: "4.2" },
//       projects: { type: String, default: "1" },
//     },
//     color: { type: String },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Project", projectSchema);




// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },

//     category: {
//       type: String,
//       required: true,
//       enum: ["web", "mobile", "games"],
//       default: "web",
//     },

//     image: {
//       public_id: { type: String, required: true },
//       url: { type: String, required: true },
//     },

//     hoverImage: {
//       public_id: { type: String },
//       url: { type: String },
//     },

//     description: { type: String },
//     fullDescription: { type: String },
//     technologies: [String],
//     features: [String],

//     links: {
//       live: { type: String },
//       code: { type: String },
//     },

//     stats: {
//       clients: { type: String, default: "1" },
//       rating: { type: String, default: "4.2" },
//       projects: { type: String, default: "1" },
//     },

//     color: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Project", projectSchema);


















// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },

//     category: {
//       type: String,
//       required: true,
//       enum: ["web", "mobile", "games"],
//       default: "web",
//     },

//     image: {
//       public_id: { type: String, required: true },
//       url: { type: String, required: true },
//     },

//     hoverImage: {
//       public_id: { type: String },
//       url: { type: String },
//     },

//     description: { type: String },
//     fullDescription: { type: String },
//     technologies: [String],
//     features: [String],

//     links: {
//       live: { type: String },
//       code: { type: String },
//     },

//     stats: {
//       clients: { type: String, default: "1" },
//       rating: { type: String, default: "4.2" },
//       projects: { type: String, default: "1" },
//     },

//     color: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Project", projectSchema);













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

    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },

    hoverImage: {
      public_id: { type: String },
      url: { type: String },
    },

    description: { type: String, default: "" },
    fullDescription: { type: String, default: "" },

    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },

    links: {
      live: { type: String, default: "" },
      code: { type: String, default: "" },
    },

    stats: {
      clients: { type: String, default: "1" },
      rating: { type: String, default: "4.2" },
      projects: { type: String, default: "1" },
    },

    color: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

