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









// const Project = require("../models/Project");
// const cloudinary = require("../cloudinary/cloudinary");
// const fs = require("fs");

// // ========================
// // CREATE
// // ========================
// // exports.createProject = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       category,
// //       description,
// //       fullDescription,
// //       technologies,
// //       features,
// //       links,
// //       stats,
// //       color,
// //     } = req.body;

// //     if (!req.files?.image) {
// //       return res.status(400).json({ message: "Main image is required" });
// //     }

// //     // Upload main image
// //     const imageResult = await cloudinary.uploader.upload(
// //       req.files.image[0].path,
// //       { folder: "projects" }
// //     );

// //     fs.unlinkSync(req.files.image[0].path);

// //     let hoverImageData = null;

// //     if (req.files?.hoverImage) {
// //       const hoverImageResult = await cloudinary.uploader.upload(
// //         req.files.hoverImage[0].path,
// //         { folder: "projects" }
// //       );

// //       fs.unlinkSync(req.files.hoverImage[0].path);

// //       hoverImageData = {
// //         public_id: hoverImageResult.public_id,
// //         url: hoverImageResult.secure_url,
// //       };
// //     }

// //     const project = await Project.create({
// //       title,
// //       category,
// //       description,
// //       fullDescription,
// //       technologies: technologies ? JSON.parse(technologies) : [],
// //       features: features ? JSON.parse(features) : [],
// //       links: links ? JSON.parse(links) : {},
// //       stats: stats ? JSON.parse(stats) : {},
// //       color,
// //       image: {
// //         public_id: imageResult.public_id,
// //         url: imageResult.secure_url,
// //       },
// //       hoverImage: hoverImageData,
// //     });

// //     res.status(201).json(project);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };
// // exports.createProject = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       category,
// //       description,
// //       fullDescription,
// //       technologies,
// //       features,
// //       links,
// //       stats,
// //       color,
// //     } = req.body;

// //     // ------------------------------
// //     // 1️⃣ Validate required fields
// //     // ------------------------------
// //     if (!title || !category) {
// //       return res.status(400).json({ message: "Title and category are required" });
// //     }

// //     if (!req.files?.image) {
// //       return res.status(400).json({ message: "Main image is required" });
// //     }

// //     // ------------------------------
// //     // 2️⃣ Limit string lengths
// //     // ------------------------------
// //     const maxDescLength = 5000;
// //     const maxFullDescLength = 10000;

// //     const safeDescription = description?.slice(0, maxDescLength) || "";
// //     const safeFullDescription = fullDescription?.slice(0, maxFullDescLength) || "";

// //     // ------------------------------
// //     // 3️⃣ Parse arrays safely
// //     // ------------------------------
// //     let techArr = [];
// //     let featuresArr = [];
// //     let linksObj = {};
// //     let statsObj = {};

// //     try {
// //       techArr = technologies ? JSON.parse(technologies) : [];
// //       featuresArr = features ? JSON.parse(features) : [];
// //       linksObj = links ? JSON.parse(links) : {};
// //       statsObj = stats ? JSON.parse(stats) : {};
// //     } catch {
// //       return res.status(400).json({
// //         message: "Invalid JSON format for features, technologies, links, or stats",
// //       });
// //     }

// //     // ------------------------------
// //     // 4️⃣ Limit array sizes
// //     // ------------------------------
// //     if (techArr.length > 50) techArr = techArr.slice(0, 50);
// //     if (featuresArr.length > 100) featuresArr = featuresArr.slice(0, 100);

// //     // ------------------------------
// //     // 5️⃣ Upload images to Cloudinary
// //     // ------------------------------
// //     const imageResult = await cloudinary.uploader.upload(
// //       req.files.image[0].path,
// //       { folder: "projects" }
// //     );
// //     fs.unlinkSync(req.files.image[0].path);

// //     let hoverImageData = null;
// //     if (req.files?.hoverImage) {
// //       const hoverImageResult = await cloudinary.uploader.upload(
// //         req.files.hoverImage[0].path,
// //         { folder: "projects" }
// //       );
// //       fs.unlinkSync(req.files.hoverImage[0].path);

// //       hoverImageData = {
// //         public_id: hoverImageResult.public_id,
// //         url: hoverImageResult.secure_url,
// //       };
// //     }

// //     // ------------------------------
// //     // 6️⃣ Create Project
// //     // ------------------------------
// //     const project = await Project.create({
// //       title,
// //       category,
// //       description: safeDescription,
// //       fullDescription: safeFullDescription,
// //       technologies: techArr,
// //       features: featuresArr,
// //       links: linksObj,
// //       stats: statsObj,
// //       color,
// //       image: {
// //         public_id: imageResult.public_id,
// //         url: imageResult.secure_url,
// //       },
// //       hoverImage: hoverImageData,
// //     });

// //     res.status(201).json(project);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // };
// exports.createProject = async (req, res) => {
//   try {
//     const { title, category, description, fullDescription, links, stats, color } = req.body;

//     if (!title || !category) return res.status(400).json({ message: "Title & category required" });
//     if (!req.files?.image) return res.status(400).json({ message: "Main image required" });

//     // ----------------------------
//     // Upload images
//     // ----------------------------
//     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "projects" });
//     fs.unlinkSync(req.files.image[0].path);

//     let hoverImageData = null;
//     if (req.files?.hoverImage) {
//       const hoverResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path, { folder: "projects" });
//       fs.unlinkSync(req.files.hoverImage[0].path);
//       hoverImageData = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
//     }

//     // ----------------------------
//     // Parse arrays (sent as multiple FormData entries)
//     // ----------------------------
//     const featuresArr = Array.isArray(req.body.features)
//       ? req.body.features.map(f => f.slice(0, 200)).slice(0, 100)
//       : [];

//     const techArr = Array.isArray(req.body.technologies)
//       ? req.body.technologies.map(t => t.slice(0, 200)).slice(0, 50)
//       : [];

//     // ----------------------------
//     // Create project
//     // ----------------------------
//     const project = await Project.create({
//       title,
//       category,
//       description: description?.slice(0, 5000) || "",
//       fullDescription: fullDescription?.slice(0, 10000) || "",
//       features: featuresArr,
//       technologies: techArr,
//       links: links ? JSON.parse(links) : {},
//       stats: stats ? JSON.parse(stats) : {},
//       color,
//       image: { public_id: imageResult.public_id, url: imageResult.secure_url },
//       hoverImage: hoverImageData,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // READ ALL
// // ========================
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // READ ONE
// // ========================
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // UPDATE
// // ========================
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

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

//     // Update main image
//     if (req.files?.image) {
//       if (project.image?.public_id) {
//         await cloudinary.uploader.destroy(project.image.public_id);
//       }

//       const imageResult = await cloudinary.uploader.upload(
//         req.files.image[0].path,
//         { folder: "projects" }
//       );

//       fs.unlinkSync(req.files.image[0].path);

//       project.image = {
//         public_id: imageResult.public_id,
//         url: imageResult.secure_url,
//       };
//     }

//     // Update hover image
//     if (req.files?.hoverImage) {
//       if (project.hoverImage?.public_id) {
//         await cloudinary.uploader.destroy(project.hoverImage.public_id);
//       }

//       const hoverImageResult = await cloudinary.uploader.upload(
//         req.files.hoverImage[0].path,
//         { folder: "projects" }
//       );

//       fs.unlinkSync(req.files.hoverImage[0].path);

//       project.hoverImage = {
//         public_id: hoverImageResult.public_id,
//         url: hoverImageResult.secure_url,
//       };
//     }

//     project.title = title || project.title;
//     project.category = category || project.category;
//     project.description = description || project.description;
//     project.fullDescription =
//       fullDescription || project.fullDescription;
//     project.technologies = technologies
//       ? JSON.parse(technologies)
//       : project.technologies;
//     project.features = features
//       ? JSON.parse(features)
//       : project.features;
//     project.links = links ? JSON.parse(links) : project.links;
//     project.stats = stats ? JSON.parse(stats) : project.stats;
//     project.color = color || project.color;

//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // DELETE
// // ========================
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     if (project.image?.public_id) {
//       await cloudinary.uploader.destroy(project.image.public_id);
//     }

//     if (project.hoverImage?.public_id) {
//       await cloudinary.uploader.destroy(project.hoverImage.public_id);
//     }

//     await project.deleteOne();
//     res.json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };




















// const Project = require("../models/Project");
// const cloudinary = require("../cloudinary/cloudinary");
// const fs = require("fs");

// // ========================
// // CREATE PROJECT
// // ========================
// exports.createProject = async (req, res) => {
//   try {
//     const { title, category, description, fullDescription, links, stats, color } = req.body;

//     if (!title || !category)
//       return res.status(400).json({ message: "Title & category required" });

//     if (!req.files?.image)
//       return res.status(400).json({ message: "Main image required" });

//     // ----------------------------
//     // Upload main image
//     // ----------------------------
//     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
//       folder: "projects",
//     });
//     fs.unlinkSync(req.files.image[0].path);

//     // ----------------------------
//     // Upload hover image (optional)
//     // ----------------------------
//     let hoverImageData = null;
//     if (req.files.hoverImage) {
//       const hoverResult = await cloudinary.uploader.upload(
//         req.files.hoverImage[0].path,
//         { folder: "projects" }
//       );
//       fs.unlinkSync(req.files.hoverImage[0].path);
//       hoverImageData = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
//     }

//     // ----------------------------
//     // Parse arrays safely
//     // ----------------------------
//     const featuresArr = Array.isArray(req.body.features)
//       ? req.body.features.map((f) => f.slice(0, 200)).slice(0, 100)
//       : [];

//     const techArr = Array.isArray(req.body.technologies)
//       ? req.body.technologies.map((t) => t.slice(0, 200)).slice(0, 50)
//       : [];

//     // ----------------------------
//     // Create project in DB
//     // ----------------------------
//     const project = await Project.create({
//       title,
//       category,
//       description: description?.slice(0, 5000) || "",
//       fullDescription: fullDescription?.slice(0, 10000) || "",
//       features: featuresArr,
//       technologies: techArr,
//       links: links ? JSON.parse(links) : {},
//       stats: stats ? JSON.parse(stats) : {},
//       color,
//       image: { public_id: imageResult.public_id, url: imageResult.secure_url },
//       hoverImage: hoverImageData,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // GET ALL PROJECTS
// // ========================
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // GET SINGLE PROJECT
// // ========================
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // UPDATE PROJECT
// // ========================
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const { title, category, description, fullDescription, technologies, features, links, stats, color } = req.body;

//     // Update main image
//     if (req.files?.image) {
//       if (project.image?.public_id) await cloudinary.uploader.destroy(project.image.public_id);

//       const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "projects" });
//       fs.unlinkSync(req.files.image[0].path);

//       project.image = { public_id: imageResult.public_id, url: imageResult.secure_url };
//     }

//     // Update hover image
//     if (req.files?.hoverImage) {
//       if (project.hoverImage?.public_id) await cloudinary.uploader.destroy(project.hoverImage.public_id);

//       const hoverResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path, { folder: "projects" });
//       fs.unlinkSync(req.files.hoverImage[0].path);

//       project.hoverImage = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
//     }

//     // ----------------------------
//     // Update fields safely
//     // ----------------------------
//     project.title = title || project.title;
//     project.category = category || project.category;
//     project.description = description?.slice(0, 5000) || project.description;
//     project.fullDescription = fullDescription?.slice(0, 10000) || project.fullDescription;
//     project.technologies = technologies ? JSON.parse(technologies) : project.technologies;
//     project.features = features ? JSON.parse(features) : project.features;
//     project.links = links ? JSON.parse(links) : project.links;
//     project.stats = stats ? JSON.parse(stats) : project.stats;
//     project.color = color || project.color;

//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ========================
// // DELETE PROJECT
// // ========================
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     // Delete images from Cloudinary
//     if (project.image?.public_id) await cloudinary.uploader.destroy(project.image.public_id);
//     if (project.hoverImage?.public_id) await cloudinary.uploader.destroy(project.hoverImage.public_id);

//     await project.deleteOne();
//     res.json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };










// const Project = require("../models/Project");
// const cloudinary = require("../cloudinary/cloudinary");
// const fs = require("fs");

// // ------------------------
// // CREATE PROJECT
// // ------------------------
// exports.createProject = async (req, res) => {
//   try {
//     const { title, category, description, fullDescription, links, stats, color } = req.body;

//     if (!title || !category)
//       return res.status(400).json({ message: "Title & category required" });
//     if (!req.files?.image)
//       return res.status(400).json({ message: "Main image required" });

//     // Upload main image
//     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
//       folder: "projects",
//     });
//     fs.unlinkSync(req.files.image[0].path);

//     // Upload hover image (optional)
//     let hoverImageData = null;
//     if (req.files?.hoverImage) {
//       const hoverResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path, {
//         folder: "projects",
//       });
//       fs.unlinkSync(req.files.hoverImage[0].path);
//       hoverImageData = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
//     }

//     // Parse arrays safely
//     const featuresArr = Array.isArray(req.body.features)
//       ? req.body.features.map(f => f.slice(0, 200)).slice(0, 100)
//       : [];
//     const techArr = Array.isArray(req.body.technologies)
//       ? req.body.technologies.map(t => t.slice(0, 200)).slice(0, 50)
//       : [];

//     // Create project
//     const project = await Project.create({
//       title: title.slice(0, 200),
//       category,
//       description: description?.slice(0, 5000) || "",
//       fullDescription: fullDescription?.slice(0, 10000) || "",
//       features: featuresArr,
//       technologies: techArr,
//       links: links ? JSON.parse(links) : {},
//       stats: stats ? JSON.parse(stats) : {},
//       color: color?.slice(0, 20),
//       image: { public_id: imageResult.public_id, url: imageResult.secure_url },
//       hoverImage: hoverImageData,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ------------------------
// // GET ALL PROJECTS
// // ------------------------
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ------------------------
// // GET SINGLE PROJECT
// // ------------------------
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ------------------------
// // UPDATE PROJECT
// // ------------------------
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const { title, category, description, fullDescription, technologies, features, links, stats, color } = req.body;

//     // Update images
//     if (req.files?.image) {
//       if (project.image?.public_id) await cloudinary.uploader.destroy(project.image.public_id);
//       const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "projects" });
//       fs.unlinkSync(req.files.image[0].path);
//       project.image = { public_id: imageResult.public_id, url: imageResult.secure_url };
//     }

//     if (req.files?.hoverImage) {
//       if (project.hoverImage?.public_id) await cloudinary.uploader.destroy(project.hoverImage.public_id);
//       const hoverResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path, { folder: "projects" });
//       fs.unlinkSync(req.files.hoverImage[0].path);
//       project.hoverImage = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
//     }

//     // Update fields safely
//     project.title = title?.slice(0, 200) || project.title;
//     project.category = category || project.category;
//     project.description = description?.slice(0, 5000) || project.description;
//     project.fullDescription = fullDescription?.slice(0, 10000) || project.fullDescription;
//     project.technologies = technologies ? JSON.parse(technologies).slice(0, 50) : project.technologies;
//     project.features = features ? JSON.parse(features).slice(0, 100) : project.features;
//     project.links = links ? JSON.parse(links) : project.links;
//     project.stats = stats ? JSON.parse(stats) : project.stats;
//     project.color = color?.slice(0, 20) || project.color;

//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ------------------------
// // DELETE PROJECT
// // ------------------------
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     if (project.image?.public_id) await cloudinary.uploader.destroy(project.image.public_id);
//     if (project.hoverImage?.public_id) await cloudinary.uploader.destroy(project.hoverImage.public_id);

//     await project.deleteOne();
//     res.json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };























const fs = require("fs");
const Project = require("../models/Project");
const cloudinary = require("../cloudinary/cloudinary");

// Utility: Safe JSON parse
const safeParse = (value, fallback) => {
  try {
    return typeof value === "string" ? JSON.parse(value) : value || fallback;
  } catch {
    return fallback;
  }
};

/* =========================
   CREATE PROJECT
========================= */
exports.createProject = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      fullDescription,
      color,
    } = req.body;

    if (!title || !category)
      return res.status(400).json({ success: false, error: "Title & category required" });

    if (!req.files?.image)
      return res.status(400).json({ success: false, error: "Main image required" });

    // Upload main image
    const imageUpload = await cloudinary.uploader.upload(
      req.files.image[0].path,
      { folder: "projects" }
    );
    fs.unlinkSync(req.files.image[0].path);

    // Upload hover image (optional)
    let hoverImageData = null;
    if (req.files?.hoverImage) {
      const hoverUpload = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { folder: "projects" }
      );
      fs.unlinkSync(req.files.hoverImage[0].path);

      hoverImageData = {
        public_id: hoverUpload.public_id,
        url: hoverUpload.secure_url,
      };
    }

    const project = await Project.create({
      title: title.slice(0, 100),
      category,
      description: description?.slice(0, 1000) || "",
      fullDescription: fullDescription?.slice(0, 5000) || "",
      color: color?.slice(0, 50) || "",
      technologies: safeParse(req.body.technologies, []).slice(0, 50),
      features: safeParse(req.body.features, []).slice(0, 100),
      links: safeParse(req.body.links, {}),
      stats: safeParse(req.body.stats, {}),
      image: {
        public_id: imageUpload.public_id,
        url: imageUpload.secure_url,
      },
      hoverImage: hoverImageData,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL PROJECTS
========================= */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET SINGLE PROJECT
========================= */
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ success: false, error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

/* =========================
   UPDATE PROJECT
========================= */
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ success: false, error: "Project not found" });

    const {
      title,
      category,
      description,
      fullDescription,
      color,
    } = req.body;

    // Replace main image if new one provided
    if (req.files?.image) {
      await cloudinary.uploader.destroy(project.image.public_id);

      const newImage = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "projects" }
      );

      fs.unlinkSync(req.files.image[0].path);

      project.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    // Replace hover image
    if (req.files?.hoverImage) {
      if (project.hoverImage?.public_id) {
        await cloudinary.uploader.destroy(project.hoverImage.public_id);
      }

      const newHover = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { folder: "projects" }
      );

      fs.unlinkSync(req.files.hoverImage[0].path);

      project.hoverImage = {
        public_id: newHover.public_id,
        url: newHover.secure_url,
      };
    }

    // Update fields
    project.title = title?.slice(0, 100) || project.title;
    project.category = category || project.category;
    project.description = description?.slice(0, 1000) || project.description;
    project.fullDescription = fullDescription?.slice(0, 5000) || project.fullDescription;
    project.color = color?.slice(0, 50) || project.color;
    project.technologies = safeParse(req.body.technologies, project.technologies);
    project.features = safeParse(req.body.features, project.features);
    project.links = safeParse(req.body.links, project.links);
    project.stats = safeParse(req.body.stats, project.stats);

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

/* =========================
   DELETE PROJECT
========================= */
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ success: false, error: "Project not found" });

    await cloudinary.uploader.destroy(project.image.public_id);

    if (project.hoverImage?.public_id) {
      await cloudinary.uploader.destroy(project.hoverImage.public_id);
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
