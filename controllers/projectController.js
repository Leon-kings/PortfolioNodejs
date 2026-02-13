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























// const fs = require("fs");
// const Project = require("../models/Project");
// const cloudinary = require("../cloudinary/cloudinary");

// // Utility: Safe JSON parse
// const safeParse = (value, fallback) => {
//   try {
//     return typeof value === "string" ? JSON.parse(value) : value || fallback;
//   } catch {
//     return fallback;
//   }
// };

// /* =========================
//    CREATE PROJECT
// ========================= */
// // exports.createProject = async (req, res, next) => {
// //   try {
// //     const {
// //       title,
// //       category,
// //       description,
// //       fullDescription,
// //       color,
// //     } = req.body;

// //     if (!title || !category)
// //       return res.status(400).json({ success: false, error: "Title & category required" });

// //     if (!req.files?.image)
// //       return res.status(400).json({ success: false, error: "Main image required" });

// //     // Upload main image
// //     const imageUpload = await cloudinary.uploader.upload(
// //       req.files.image[0].path,
// //       { folder: "projects" }
// //     );
// //     fs.unlinkSync(req.files.image[0].path);

// //     // Upload hover image (optional)
// //     let hoverImageData = null;
// //     if (req.files?.hoverImage) {
// //       const hoverUpload = await cloudinary.uploader.upload(
// //         req.files.hoverImage[0].path,
// //         { folder: "projects" }
// //       );
// //       fs.unlinkSync(req.files.hoverImage[0].path);

// //       hoverImageData = {
// //         public_id: hoverUpload.public_id,
// //         url: hoverUpload.secure_url,
// //       };
// //     }

// //     const project = await Project.create({
// //       title: title.slice(0, 100),
// //       category,
// //       description: description?.slice(0, 1000) || "",
// //       fullDescription: fullDescription?.slice(0, 5000) || "",
// //       color: color?.slice(0, 50) || "",
// //       technologies: safeParse(req.body.technologies, []).slice(0, 50),
// //       features: safeParse(req.body.features, []).slice(0, 100),
// //       links: safeParse(req.body.links, {}),
// //       stats: safeParse(req.body.stats, {}),
// //       image: {
// //         public_id: imageUpload.public_id,
// //         url: imageUpload.secure_url,
// //       },
// //       hoverImage: hoverImageData,
// //     });

// //     res.status(201).json(project);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// exports.createProject = async (req, res) => {
//   try {
//     const { title, category, description, fullDescription, links, stats, color } = req.body;

//     // Required fields
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

//     // Slice arrays safely
//     const featuresArr = Array.isArray(req.body.features)
//       ? req.body.features.map(f => (f || "").slice(0, 200)).slice(0, 100)
//       : [];

//     const techArr = Array.isArray(req.body.technologies)
//       ? req.body.technologies.map(t => (t || "").slice(0, 200)).slice(0, 50)
//       : [];

//     // Parse objects safely
//     const linksObj = links ? JSON.parse(links) : {};
//     const statsObj = stats ? JSON.parse(stats) : {};

//     // Create project
//     const project = await Project.create({
//       title: (title || "").slice(0, 200),
//       category,
//       description: (description || "").slice(0, 5000),
//       fullDescription: (fullDescription || "").slice(0, 10000),
//       features: featuresArr,
//       technologies: techArr,
//       links: linksObj,
//       stats: statsObj,
//       color: (color || "").slice(0, 20),
//       image: { public_id: imageResult.public_id, url: imageResult.secure_url },
//       hoverImage: hoverImageData,
//     });

//     res.status(201).json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /* =========================
//    GET ALL PROJECTS
// ========================= */
// exports.getProjects = async (req, res, next) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.status(200).json(projects);
//   } catch (error) {
//     next(error);
//   }
// };

// /* =========================
//    GET SINGLE PROJECT
// ========================= */
// exports.getProjectById = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project)
//       return res.status(404).json({ success: false, error: "Project not found" });

//     res.status(200).json(project);
//   } catch (error) {
//     next(error);
//   }
// };

// /* =========================
//    UPDATE PROJECT
// ========================= */
// exports.updateProject = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project)
//       return res.status(404).json({ success: false, error: "Project not found" });

//     const {
//       title,
//       category,
//       description,
//       fullDescription,
//       color,
//     } = req.body;

//     // Replace main image if new one provided
//     if (req.files?.image) {
//       await cloudinary.uploader.destroy(project.image.public_id);

//       const newImage = await cloudinary.uploader.upload(
//         req.files.image[0].path,
//         { folder: "projects" }
//       );

//       fs.unlinkSync(req.files.image[0].path);

//       project.image = {
//         public_id: newImage.public_id,
//         url: newImage.secure_url,
//       };
//     }

//     // Replace hover image
//     if (req.files?.hoverImage) {
//       if (project.hoverImage?.public_id) {
//         await cloudinary.uploader.destroy(project.hoverImage.public_id);
//       }

//       const newHover = await cloudinary.uploader.upload(
//         req.files.hoverImage[0].path,
//         { folder: "projects" }
//       );

//       fs.unlinkSync(req.files.hoverImage[0].path);

//       project.hoverImage = {
//         public_id: newHover.public_id,
//         url: newHover.secure_url,
//       };
//     }

//     // Update fields
//     project.title = title?.slice(0, 100) || project.title;
//     project.category = category || project.category;
//     project.description = description?.slice(0, 1000) || project.description;
//     project.fullDescription = fullDescription?.slice(0, 5000) || project.fullDescription;
//     project.color = color?.slice(0, 50) || project.color;
//     project.technologies = safeParse(req.body.technologies, project.technologies);
//     project.features = safeParse(req.body.features, project.features);
//     project.links = safeParse(req.body.links, project.links);
//     project.stats = safeParse(req.body.stats, project.stats);

//     await project.save();

//     res.status(200).json(project);
//   } catch (error) {
//     next(error);
//   }
// };

// /* =========================
//    DELETE PROJECT
// ========================= */
// exports.deleteProject = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project)
//       return res.status(404).json({ success: false, error: "Project not found" });

//     await cloudinary.uploader.destroy(project.image.public_id);

//     if (project.hoverImage?.public_id) {
//       await cloudinary.uploader.destroy(project.hoverImage.public_id);
//     }

//     await project.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Project deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };















// const Project = require("../models/Project");
// const cloudinary = require("../cloudinary/cloudinary");
// const fs = require("fs");

// // ---------------- CREATE ----------------
// // exports.createProject = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       category,
// //       description,
// //       fullDescription,
// //       features,
// //       technologies,
// //       links,
// //       stats,
// //       color,
// //     } = req.body;

// //     if (!title || !category) return res.status(400).json({ message: "Title & category required" });
// //     if (!req.files?.image) return res.status(400).json({ message: "Main image required" });

// //     // Upload main image
// //     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "projects" });
// //     fs.unlinkSync(req.files.image[0].path);

// //     // Optional hover image
// //     let hoverImageData = null;
// //     if (req.files?.hoverImage) {
// //       const hoverResult = await cloudinary.uploader.upload(req.files.hoverImage[0].path, { folder: "projects" });
// //       fs.unlinkSync(req.files.hoverImage[0].path);
// //       hoverImageData = { public_id: hoverResult.public_id, url: hoverResult.secure_url };
// //     }

// //     // ---------------- SAFE SLICING ----------------
// //     const safeTitle = (title || "").slice(0, 200);
// //     const safeCategory = category;
// //     const safeDescription = (description || "").slice(0, 5000);
// //     const safeFullDescription = (fullDescription || "").slice(0, 10000);
// //     const safeColor = (color || "").slice(0, 20);

// //     const safeFeatures = Array.isArray(features)
// //       ? features.map(f => (f || "").slice(0, 200)).slice(0, 100)
// //       : [];

// //     const safeTechnologies = Array.isArray(technologies)
// //       ? technologies.map(t => (t || "").slice(0, 200)).slice(0, 50)
// //       : [];

// //     let safeLinks = {};
// //     let safeStats = {};
// //     try {
// //       safeLinks = links ? JSON.parse(links) : {};
// //       safeStats = stats ? JSON.parse(stats) : {};
// //     } catch (err) {
// //       safeLinks = {};
// //       safeStats = {};
// //     }

// //     const project = await Project.create({
// //       title: safeTitle,
// //       category: safeCategory,
// //       description: safeDescription,
// //       fullDescription: safeFullDescription,
// //       features: safeFeatures,
// //       technologies: safeTechnologies,
// //       links: safeLinks,
// //       stats: safeStats,
// //       color: safeColor,
// //       image: { public_id: imageResult.public_id, url: imageResult.secure_url },
// //       hoverImage: hoverImageData,
// //     });

// //     res.status(201).json(project);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };

// exports.createProject = async (req, res) => {
//   try {
//     console.log("========== CREATE PROJECT START ==========");
//     console.log("BODY RECEIVED:", req.body);
//     console.log("FILES RECEIVED:", req.files);

//     const {
//       title,
//       category,
//       description,
//       fullDescription,
//       features,
//       technologies,
//       links,
//       stats,
//       color,
//     } = req.body;

//     if (!title || !category) {
//       return res.status(400).json({ error: "Title and category required" });
//     }

//     if (!req.files?.image) {
//       return res.status(400).json({ error: "Main image required" });
//     }

//     // ---------------- PARSE JSON SAFELY ----------------
//     let parsedFeatures = [];
//     let parsedTechnologies = [];
//     let parsedLinks = {};
//     let parsedStats = {};

//     try {
//       parsedFeatures = features ? JSON.parse(features) : [];
//       parsedTechnologies = technologies ? JSON.parse(technologies) : [];
//       parsedLinks = links ? JSON.parse(links) : {};
//       parsedStats = stats ? JSON.parse(stats) : {};
//     } catch (err) {
//       console.log("❌ JSON PARSE ERROR:", err.message);
//       return res.status(400).json({ error: "Invalid JSON format" });
//     }

//     console.log("Parsed Features:", parsedFeatures);
//     console.log("Parsed Technologies:", parsedTechnologies);

//     // ---------------- ENFORCE LIMITS ----------------
//     const safeTitle = (title || "").slice(0, 200);
//     const safeDescription = (description || "").slice(0, 5000);
//     const safeFullDescription = (fullDescription || "").slice(0, 10000);
//     const safeColor = (color || "").slice(0, 20);

//     const safeFeatures = parsedFeatures
//       .map((f, index) => {
//         if ((f || "").length > 200) {
//           console.log(`⚠ Feature too long at index ${index}:`, f.length);
//         }
//         return (f || "").slice(0, 200);
//       })
//       .slice(0, 100);

//     const safeTechnologies = parsedTechnologies
//       .map((t, index) => {
//         if ((t || "").length > 200) {
//           console.log(`⚠ Technology too long at index ${index}:`, t.length);
//         }
//         return (t || "").slice(0, 200);
//       })
//       .slice(0, 50);

//     // ---------------- LOG LENGTHS ----------------
//     console.log("Title length:", safeTitle.length);
//     console.log("Description length:", safeDescription.length);
//     console.log("FullDescription length:", safeFullDescription.length);
//     console.log("Color length:", safeColor.length);

//     // ---------------- UPLOAD IMAGE ----------------
//     const imageResult = await cloudinary.uploader.upload(
//       req.files.image[0].path,
//       { folder: "projects" }
//     );
//     fs.unlinkSync(req.files.image[0].path);

//     let hoverImageData = null;

//     if (req.files?.hoverImage) {
//       const hoverResult = await cloudinary.uploader.upload(
//         req.files.hoverImage[0].path,
//         { folder: "projects" }
//       );
//       fs.unlinkSync(req.files.hoverImage[0].path);

//       hoverImageData = {
//         public_id: hoverResult.public_id,
//         url: hoverResult.secure_url,
//       };
//     }

//     // ---------------- CREATE PROJECT ----------------
//     const project = await Project.create({
//       title: safeTitle,
//       category,
//       description: safeDescription,
//       fullDescription: safeFullDescription,
//       features: safeFeatures,
//       technologies: safeTechnologies,
//       links: {
//         live: (parsedLinks.live || "").slice(0, 500),
//         code: (parsedLinks.code || "").slice(0, 500),
//       },
//       stats: {
//         clients: (parsedStats.clients || "1").slice(0, 50),
//         rating: (parsedStats.rating || "4.2").slice(0, 10),
//         projects: (parsedStats.projects || "1").slice(0, 50),
//       },
//       color: safeColor,
//       image: {
//         public_id: imageResult.public_id,
//         url: imageResult.secure_url,
//       },
//       hoverImage: hoverImageData,
//     });

//     console.log("✅ PROJECT CREATED SUCCESSFULLY");
//     console.log("========== CREATE PROJECT END ==========");

//     res.status(201).json(project);
//   } catch (error) {
//     console.log("❌ SERVER ERROR:", error.message);
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Server error",
//     });
//   }
// };


// // ---------------- READ ----------------
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.status(200).json({ data: projects });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ---------------- UPDATE ----------------
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const updates = req.body;

//     // Safe slicing
//     if (updates.title) updates.title = updates.title.slice(0, 200);
//     if (updates.description) updates.description = updates.description.slice(0, 5000);
//     if (updates.fullDescription) updates.fullDescription = updates.fullDescription.slice(0, 10000);
//     if (updates.color) updates.color = updates.color.slice(0, 20);
//     if (updates.features) updates.features = updates.features.map(f => f.slice(0, 200)).slice(0, 100);
//     if (updates.technologies) updates.technologies = updates.technologies.map(t => t.slice(0, 200)).slice(0, 50);

//     const updatedProject = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
//     res.status(200).json(updatedProject);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ---------------- DELETE ----------------
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     await Project.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Project deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };













const Project = require("../models/Project");
const cloudinary = require("../cloudinary/cloudinary");
const fs = require("fs");

// ---------------- HELPER FUNCTIONS ----------------
const deleteCloudinaryImage = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`✅ Deleted image from Cloudinary: ${publicId}`);
    }
  } catch (error) {
    console.error("❌ Error deleting image from Cloudinary:", error);
  }
};

const validateProjectData = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim() === '') {
    errors.push("Title is required");
  }
  
  if (!data.category || !["web", "mobile", "games"].includes(data.category)) {
    errors.push("Valid category is required (web, mobile, games)");
  }
  
  return errors;
};

// ---------------- CREATE PROJECT ----------------
exports.createProject = async (req, res) => {
  try {
    console.log("========== CREATE PROJECT START ==========");
    console.log("BODY RECEIVED:", req.body);
    console.log("FILES RECEIVED:", req.files);

    const {
      title,
      category,
      description,
      fullDescription,
      features,
      technologies,
      links,
      stats,
      color,
    } = req.body;

    // Validate required fields
    const validationErrors = validateProjectData({ title, category });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        errors: validationErrors 
      });
    }

    if (!req.files?.image) {
      return res.status(400).json({ 
        success: false, 
        error: "Main image is required" 
      });
    }

    // ---------------- PARSE JSON SAFELY ----------------
    let parsedFeatures = [];
    let parsedTechnologies = [];
    let parsedLinks = {};
    let parsedStats = {};

    try {
      parsedFeatures = features ? JSON.parse(features) : [];
      parsedTechnologies = technologies ? JSON.parse(technologies) : [];
      parsedLinks = links ? JSON.parse(links) : {};
      parsedStats = stats ? JSON.parse(stats) : {};
    } catch (err) {
      console.log("❌ JSON PARSE ERROR:", err.message);
      return res.status(400).json({ 
        success: false, 
        error: "Invalid JSON format in one of the fields" 
      });
    }

    console.log("Parsed Features:", parsedFeatures);
    console.log("Parsed Technologies:", parsedTechnologies);

    // ---------------- ENFORCE LIMITS ----------------
    const safeTitle = (title || "").trim().slice(0, 200);
    const safeDescription = (description || "").trim().slice(0, 5000);
    const safeFullDescription = (fullDescription || "").trim().slice(0, 10000);
    const safeColor = (color || "").trim().slice(0, 20);

    const safeFeatures = parsedFeatures
      .filter(f => f && f.trim())
      .map(f => f.trim().slice(0, 200))
      .slice(0, 100);

    const safeTechnologies = parsedTechnologies
      .filter(t => t && t.trim())
      .map(t => t.trim().slice(0, 200))
      .slice(0, 50);

    // ---------------- UPLOAD MAIN IMAGE ----------------
    console.log("Uploading main image to Cloudinary...");
    const imageResult = await cloudinary.uploader.upload(
      req.files.image[0].path,
      { 
        folder: "projects",
        transformation: [
          { width: 1200, height: 800, crop: "limit" },
          { quality: "auto" }
        ]
      }
    );
    fs.unlinkSync(req.files.image[0].path);
    console.log("✅ Main image uploaded:", imageResult.secure_url);

    // ---------------- UPLOAD HOVER IMAGE (OPTIONAL) ----------------
    let hoverImageData = null;
    if (req.files?.hoverImage) {
      console.log("Uploading hover image to Cloudinary...");
      const hoverResult = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { 
          folder: "projects",
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto" }
          ]
        }
      );
      fs.unlinkSync(req.files.hoverImage[0].path);

      hoverImageData = {
        public_id: hoverResult.public_id,
        url: hoverResult.secure_url,
      };
      console.log("✅ Hover image uploaded:", hoverResult.secure_url);
    }

    // ---------------- CREATE PROJECT ----------------
    const projectData = {
      title: safeTitle,
      category,
      description: safeDescription,
      fullDescription: safeFullDescription,
      features: safeFeatures,
      technologies: safeTechnologies,
      links: {
        live: (parsedLinks.live || "").trim().slice(0, 500),
        code: (parsedLinks.code || "").trim().slice(0, 500),
      },
      stats: {
        clients: (parsedStats.clients || "1").trim().slice(0, 50),
        rating: (parsedStats.rating || "4.2").trim().slice(0, 10),
        projects: (parsedStats.projects || "1").trim().slice(0, 50),
      },
      color: safeColor,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
      hoverImage: hoverImageData,
    };

    const project = await Project.create(projectData);

    console.log("✅ PROJECT CREATED SUCCESSFULLY:", project._id);
    console.log("========== CREATE PROJECT END ==========");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });

  } catch (error) {
    console.log("❌ SERVER ERROR:", error.message);
    console.error(error);
    
    // Clean up uploaded files if project creation failed
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        req.files[key].forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || "Server error while creating project",
    });
  }
};

// ---------------- GET ALL PROJECTS ----------------
exports.getProjects = async (req, res) => {
  try {
    const { category, limit, page = 1, search } = req.query;
    let query = {};
    let sort = { createdAt: -1 };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Pagination
    const pageSize = limit ? parseInt(limit) : 100;
    const skip = (parseInt(page) - 1) * pageSize;

    const projects = await Project.find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    const total = await Project.countDocuments(query);

    res.status(200).json({ 
      success: true,
      data: projects,
      pagination: {
        total,
        page: parseInt(page),
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ---------------- GET SINGLE PROJECT ----------------
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: project 
    });
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ---------------- UPDATE PROJECT ----------------
exports.updateProject = async (req, res) => {
  try {
    console.log("========== UPDATE PROJECT START ==========");
    console.log("Project ID:", req.params.id);
    console.log("BODY RECEIVED:", req.body);
    console.log("FILES RECEIVED:", req.files);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }

    const {
      title,
      category,
      description,
      fullDescription,
      features,
      technologies,
      links,
      stats,
      color,
    } = req.body;

    // ---------------- PARSE JSON SAFELY ----------------
    let parsedFeatures = [];
    let parsedTechnologies = [];
    let parsedLinks = {};
    let parsedStats = {};

    try {
      parsedFeatures = features ? JSON.parse(features) : project.features;
      parsedTechnologies = technologies ? JSON.parse(technologies) : project.technologies;
      parsedLinks = links ? JSON.parse(links) : project.links;
      parsedStats = stats ? JSON.parse(stats) : project.stats;
    } catch (err) {
      console.log("❌ JSON PARSE ERROR:", err.message);
      return res.status(400).json({ 
        success: false, 
        error: "Invalid JSON format in one of the fields" 
      });
    }

    // ---------------- ENFORCE LIMITS ----------------
    const updates = {
      title: title ? title.trim().slice(0, 200) : project.title,
      category: category || project.category,
      description: description ? description.trim().slice(0, 5000) : project.description,
      fullDescription: fullDescription ? fullDescription.trim().slice(0, 10000) : project.fullDescription,
      color: color ? color.trim().slice(0, 20) : project.color,
      features: parsedFeatures
        .filter(f => f && f.trim())
        .map(f => f.trim().slice(0, 200))
        .slice(0, 100),
      technologies: parsedTechnologies
        .filter(t => t && t.trim())
        .map(t => t.trim().slice(0, 200))
        .slice(0, 50),
      links: {
        live: (parsedLinks.live || project.links?.live || "").trim().slice(0, 500),
        code: (parsedLinks.code || project.links?.code || "").trim().slice(0, 500),
      },
      stats: {
        clients: (parsedStats.clients || project.stats?.clients || "1").trim().slice(0, 50),
        rating: (parsedStats.rating || project.stats?.rating || "4.2").trim().slice(0, 10),
        projects: (parsedStats.projects || project.stats?.projects || "1").trim().slice(0, 50),
      }
    };

    // ---------------- HANDLE IMAGE UPDATE ----------------
    if (req.files?.image) {
      console.log("Updating main image...");
      
      // Delete old image from Cloudinary
      if (project.image?.public_id) {
        await deleteCloudinaryImage(project.image.public_id);
      }

      // Upload new image
      const imageResult = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { 
          folder: "projects",
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto" }
          ]
        }
      );
      fs.unlinkSync(req.files.image[0].path);

      updates.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
      console.log("✅ Main image updated:", imageResult.secure_url);
    }

    // ---------------- HANDLE HOVER IMAGE UPDATE ----------------
    if (req.files?.hoverImage) {
      console.log("Updating hover image...");
      
      // Delete old hover image from Cloudinary
      if (project.hoverImage?.public_id) {
        await deleteCloudinaryImage(project.hoverImage.public_id);
      }

      // Upload new hover image
      const hoverResult = await cloudinary.uploader.upload(
        req.files.hoverImage[0].path,
        { 
          folder: "projects",
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto" }
          ]
        }
      );
      fs.unlinkSync(req.files.hoverImage[0].path);

      updates.hoverImage = {
        public_id: hoverResult.public_id,
        url: hoverResult.secure_url,
      };
      console.log("✅ Hover image updated:", hoverResult.secure_url);
    }

    // ---------------- UPDATE PROJECT ----------------
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    );

    console.log("✅ PROJECT UPDATED SUCCESSFULLY:", updatedProject._id);
    console.log("========== UPDATE PROJECT END ==========");

    res.status(200).json({ 
      success: true,
      message: "Project updated successfully",
      data: updatedProject 
    });

  } catch (error) {
    console.error("❌ Error updating project:", error);
    
    // Clean up uploaded files if update failed
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        req.files[key].forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      });
    }

    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ---------------- DELETE PROJECT ----------------
exports.deleteProject = async (req, res) => {
  try {
    console.log("========== DELETE PROJECT START ==========");
    console.log("Project ID:", req.params.id);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }

    // Delete images from Cloudinary
    if (project.image?.public_id) {
      await deleteCloudinaryImage(project.image.public_id);
    }
    
    if (project.hoverImage?.public_id) {
      await deleteCloudinaryImage(project.hoverImage.public_id);
    }

    // Delete project from database
    await Project.findByIdAndDelete(req.params.id);

    console.log("✅ PROJECT DELETED SUCCESSFULLY");
    console.log("========== DELETE PROJECT END ==========");

    res.status(200).json({ 
      success: true, 
      message: "Project deleted successfully" 
    });

  } catch (error) {
    console.error("❌ Error deleting project:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ---------------- BULK DELETE PROJECTS ----------------
exports.bulkDeleteProjects = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide an array of project IDs" 
      });
    }

    const projects = await Project.find({ _id: { $in: ids } });

    // Delete images from Cloudinary
    for (const project of projects) {
      if (project.image?.public_id) {
        await deleteCloudinaryImage(project.image.public_id);
      }
      if (project.hoverImage?.public_id) {
        await deleteCloudinaryImage(project.hoverImage.public_id);
      }
    }

    // Delete projects from database
    await Project.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ 
      success: true, 
      message: `${projects.length} projects deleted successfully` 
    });

  } catch (error) {
    console.error("❌ Error bulk deleting projects:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ---------------- GET PROJECT STATS ----------------
exports.getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    
    const categoryCounts = await Project.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category image.url createdAt');

    const stats = {
      total: totalProjects,
      categories: {
        web: 0,
        mobile: 0,
        games: 0
      },
      recent: recentProjects
    };

    categoryCounts.forEach(item => {
      if (item._id) {
        stats.categories[item._id] = item.count;
      }
    });

    res.status(200).json({ 
      success: true, 
      data: stats 
    });

  } catch (error) {
    console.error("❌ Error fetching project stats:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};