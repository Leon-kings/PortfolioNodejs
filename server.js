
// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");

// // Routes
// const messageRoutes = require("./routes/messageRoutes");
// const hireMeRoutes = require("./routes/hireMeRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const projectRoutes = require('./routes/projectRoutes');
// const testimonialRoutes = require("./routes/testimonialRoutes");

// // Middleware
// const errorHandler = require("./middleware/errorHandler");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// connectDB();

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running",
//     timestamp: new Date(),
//   });
// });

// // Routes
// app.use("/messages", messageRoutes);
// app.use("/hire", hireMeRoutes);
// app.use("/subscription", subscriptionRoutes);
// app.use("/admin", adminRoutes);
// app.use('/projects', projectRoutes);
// app.use("/testimonials", testimonialRoutes);

// // Error handling middleware
// app.use(errorHandler);

// // Catch-all 404 route
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const messageRoutes = require("./routes/messageRoutes");
const hireMeRoutes = require("./routes/hireMeRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

// Models
const Testimonial = require("./models/Testimonial");

// Middleware
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");

    // Remove old testimonial email unique index
    try {
      const indexes = await Testimonial.collection.indexes();

      const emailIndex = indexes.find(
        (index) => index.name === "email_1"
      );

      if (emailIndex) {
        await Testimonial.collection.dropIndex("email_1");

        console.log(
          "✅ Old testimonial email index removed successfully"
        );
      } else {
        console.log(
          "✅ No old testimonial email index found"
        );
      }
    } catch (indexError) {
      console.error(
        "❌ Failed to clean testimonial indexes:",
        indexError.message
      );
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date(),
  });
});

// Routes
app.use("/messages", messageRoutes);
app.use("/hire", hireMeRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/admin", adminRoutes);
app.use("/projects", projectRoutes);
app.use("/testimonials", testimonialRoutes);

// Error handling middleware
app.use(errorHandler);

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;

// Start server after MongoDB connects
const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();