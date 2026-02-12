// const Project = require('../models/Project');
// const cloudinary = require('../cloudinary/cloudinary');
// const fs = require('fs');

// // CREATE
// exports.createProject = async (req, res) => {
//   try {
//     const { title, category, description, fullDescription, technologies, features, links, stats, color } = req.body;

//     // Upload images
//     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path);
//     const hoverImageResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path);

//     // Delete temp files
//     fs.unlinkSync(req.files.image[0].path);
//     fs.unlinkSync(req.files.hoverImage[0].path);

//     const project = new Project({
//       title,
//       category,
//       description,
//       fullDescription,
//       technologies: JSON.parse(technologies),
//       features: JSON.parse(features),
//       links: JSON.parse(links),
//       stats: JSON.parse(stats),
//       color,
//       image: imageResult.secure_url,
//       hoverImage: hoverImageResult.secure_url,
//     });

//     await project.save();
//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // READ ALL
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // READ ONE
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // UPDATE
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });

//     const { title, category, description, fullDescription, technologies, features, links, stats, color } = req.body;

//     // Update images if provided
//     if (req.files?.image) {
//       // Delete old image from Cloudinary
//       const oldImagePublicId = project.image.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(oldImagePublicId);

//       const imageResult = await cloudinary.uploader.upload(req.files.image[0].path);
//       fs.unlinkSync(req.files.image[0].path);
//       project.image = imageResult.secure_url;
//     }

//     if (req.files?.hoverImage) {
//       const oldHoverImagePublicId = project.hoverImage.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(oldHoverImagePublicId);

//       const hoverImageResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path);
//       fs.unlinkSync(req.files.hoverImage[0].path);
//       project.hoverImage = hoverImageResult.secure_url;
//     }

//     project.title = title || project.title;
//     project.category = category || project.category;
//     project.description = description || project.description;
//     project.fullDescription = fullDescription || project.fullDescription;
//     project.technologies = technologies ? JSON.parse(technologies) : project.technologies;
//     project.features = features ? JSON.parse(features) : project.features;
//     project.links = links ? JSON.parse(links) : project.links;
//     project.stats = stats ? JSON.parse(stats) : project.stats;
//     project.color = color || project.color;

//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // DELETE
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });

//     // Delete images from Cloudinary
//     const imagePublicId = project.image.split('/').pop().split('.')[0];
//     const hoverImagePublicId = project.hoverImage.split('/').pop().split('.')[0];
//     await cloudinary.uploader.destroy(imagePublicId);
//     await cloudinary.uploader.destroy(hoverImagePublicId);

//     await project.deleteOne();
//     res.json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };









const Project = require("../models/Project");
const cloudinary = require("../cloudinary/cloudinary");
const fs = require("fs");

// ========================
// CREATE
// ========================
// exports.createProject = async (req, res) => {
//   try {
//     const {
//       title,
//       category,
//       description,
//       fullDescription,
//       technologies,
//       features,
//       links,
//       stats,
//       color,
//     } = req.body;

//     if (!req.files?.image) {
//       return res.status(400).json({ message: "Main image is required" });
//     }

//     // Upload main image
//     const imageResult = await cloudinary.uploader.upload(
//       req.files.image[0].path,
//       { folder: "projects" }
//     );

//     fs.unlinkSync(req.files.image[0].path);

//     let hoverImageData = null;

//     if (req.files?.hoverImage) {
//       const hoverImageResult = await cloudinary.uploader.upload(
//         req.files.hoverImage[0].path,
//         { folder: "projects" }
//       );

//       fs.unlinkSync(req.files.hoverImage[0].path);

//       hoverImageData = {
//         public_id: hoverImageResult.public_id,
//         url: hoverImageResult.secure_url,
//       };
//     }

//     const project = await Project.create({
//       title,
//       category,
//       description,
//       fullDescription,
//       technologies: technologies ? JSON.parse(technologies) : [],
//       features: features ? JSON.parse(features) : [],
//       links: links ? JSON.parse(links) : {},
//       stats: stats ? JSON.parse(stats) : {},
//       color,
//       image: {
//         public_id: imageResult.public_id,
//         url: imageResult.secure_url,
//       },
//       hoverImage: hoverImageData,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      fullDescription,
      technologies,
      features,
      links,
      stats,
      color,
    } = req.body;

    // --- Validate required fields ---
    if (!req.files?.image) {
      return res.status(400).json({ message: "Main image is required" });
    }

    // Optional: limit string lengths
    if (description && description.length > 5000) {
      return res
        .status(400)
        .json({ message: "Description is too long (max 5000 chars)" });
    }
    if (fullDescription && fullDescription.length > 10000) {
      return res
        .status(400)
        .json({ message: "Full description is too long (max 10000 chars)" });
    }

    // Parse arrays safely
    let techArr = [];
    let featuresArr = [];
    let linksObj = {};
    let statsObj = {};

    try {
      techArr = technologies ? JSON.parse(technologies) : [];
      featuresArr = features ? JSON.parse(features) : [];
      linksObj = links ? JSON.parse(links) : {};
      statsObj = stats ? JSON.parse(stats) : {};
    } catch {
      return res
        .status(400)
        .json({ message: "Invalid JSON format for features/technologies/links/stats" });
    }

    // Optional: limit array sizes
    if (techArr.length > 50) techArr = techArr.slice(0, 50);
    if (featuresArr.length > 100) featuresArr = featuresArr.slice(0, 100);

    // --- Upload images ---
    const imageResult = await cloudinary.uploader.upload(
      req.files.image[0].path,
      { folder: "projects" }
    );
    fs.unlinkSync(req.files.image[0].path);

    let hoverImageData = null;
    if (req.files?.hoverImage) {
      const hoverImageResult = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { folder: "projects" }
      );
      fs.unlinkSync(req.files.hoverImage[0].path);
      hoverImageData = {
        public_id: hoverImageResult.public_id,
        url: hoverImageResult.secure_url,
      };
    }

    // --- Create project ---
    const project = await Project.create({
      title,
      category,
      description,
      fullDescription,
      technologies: techArr,
      features: featuresArr,
      links: linksObj,
      stats: statsObj,
      color,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
      hoverImage: hoverImageData,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ========================
// READ ALL
// ========================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================
// READ ONE
// ========================
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================
// UPDATE
// ========================
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const {
      title,
      category,
      description,
      fullDescription,
      technologies,
      features,
      links,
      stats,
      color,
    } = req.body;

    // Update main image
    if (req.files?.image) {
      if (project.image?.public_id) {
        await cloudinary.uploader.destroy(project.image.public_id);
      }

      const imageResult = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "projects" }
      );

      fs.unlinkSync(req.files.image[0].path);

      project.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    }

    // Update hover image
    if (req.files?.hoverImage) {
      if (project.hoverImage?.public_id) {
        await cloudinary.uploader.destroy(project.hoverImage.public_id);
      }

      const hoverImageResult = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { folder: "projects" }
      );

      fs.unlinkSync(req.files.hoverImage[0].path);

      project.hoverImage = {
        public_id: hoverImageResult.public_id,
        url: hoverImageResult.secure_url,
      };
    }

    project.title = title || project.title;
    project.category = category || project.category;
    project.description = description || project.description;
    project.fullDescription =
      fullDescription || project.fullDescription;
    project.technologies = technologies
      ? JSON.parse(technologies)
      : project.technologies;
    project.features = features
      ? JSON.parse(features)
      : project.features;
    project.links = links ? JSON.parse(links) : project.links;
    project.stats = stats ? JSON.parse(stats) : project.stats;
    project.color = color || project.color;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================
// DELETE
// ========================
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.image?.public_id) {
      await cloudinary.uploader.destroy(project.image.public_id);
    }

    if (project.hoverImage?.public_id) {
      await cloudinary.uploader.destroy(project.hoverImage.public_id);
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
