// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const messageRoutes = require("./routes/messageRoutes");
// const errorHandler = require("./middleware/errorHandler");
// const hireMeRoutes = require("./routes/hireMeRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const adminRoutes = require('./routes/adminRoutes');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/messages", messageRoutes);
// app.use("/hire", hireMeRoutes);
// app.use("/subscription", subscriptionRoutes);
// app.use('/admin', adminRoutes);

// // Error handling middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const messageRoutes = require("./routes/messageRoutes");
// const hireMeRoutes = require("./routes/hireMeRoutes");
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const errorHandler = require("./middleware/errorHandler");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI); // modern Mongoose uses defaults, no need for useNewUrlParser or useUnifiedTopology
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1); // Exit process if DB connection fails
//   }
// };

// connectDB();

// // Routes
// app.use("/messages", messageRoutes);
// app.use("/hire", hireMeRoutes);
// app.use("/subscription", subscriptionRoutes);
// app.use("/admin", adminRoutes);

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











// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const messageRoutes = require("./routes/messageRoutes");
const hireMeRoutes = require("./routes/hireMeRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const adminRoutes = require("./routes/adminRoutes");

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
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
