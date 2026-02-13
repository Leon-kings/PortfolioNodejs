// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure uploads folder exists
// const uploadPath = "uploads/";
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + "-" + file.fieldname + path.extname(file.originalname)
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const isValid = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   if (isValid) cb(null, true);
//   else cb(new Error("Only image files are allowed"));
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;







// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure uploads folder exists
// const uploadPath = "uploads/";
// if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// // Disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadPath),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname)),
// });

// // File filter (only images)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   if (isValid) cb(null, true);
//   else cb(new Error("Only image files are allowed"));
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max per file
// });

// module.exports = upload;













const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  if (allowedTypes.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

