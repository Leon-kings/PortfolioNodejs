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

//     description: { type: String, default: "" },
//     fullDescription: { type: String, default: "" },

//     technologies: { type: [String], default: [] },
//     features: { type: [String], default: [] },

//     links: {
//       live: { type: String, default: "" },
//       code: { type: String, default: "" },
//     },

//     stats: {
//       clients: { type: String, default: "1" },
//       rating: { type: String, default: "4.2" },
//       projects: { type: String, default: "1" },
//     },

//     color: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Project", projectSchema);












// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, maxlength: 200 },
//     category: { type: String, required: true, enum: ["web", "mobile", "games"], default: "web" },

//     image: {
//       public_id: { type: String, required: true, maxlength: 500 },
//       url: { type: String, required: true, maxlength: 1000 },
//     },

//     hoverImage: {
//       public_id: { type: String, maxlength: 500 },
//       url: { type: String, maxlength: 1000 },
//     },

//     description: { type: String, maxlength: 5000 },
//     fullDescription: { type: String, maxlength: 10000 },

//     technologies: [{ type: String, maxlength: 200 }],
//     features: [{ type: String, maxlength: 200 }],

//     links: {
//       live: { type: String, maxlength: 500 },
//       code: { type: String, maxlength: 500 },
//     },

//     stats: {
//       clients: { type: String, maxlength: 50, default: "1" },
//       rating: { type: String, maxlength: 10, default: "4.2" },
//       projects: { type: String, maxlength: 50, default: "1" },
//     },

//     color: { type: String, maxlength: 20 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Project", projectSchema);




















const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Project title is required"], 
      maxlength: [200, "Title cannot exceed 200 characters"],
      trim: true 
    },
    
    category: { 
      type: String, 
      required: [true, "Category is required"], 
      enum: {
        values: ["web", "mobile", "games"],
        message: "Category must be either web, mobile, or games"
      }, 
      default: "web" 
    },

    image: {
      public_id: { 
        type: String, 
        required: [true, "Image public_id is required"], 
        maxlength: [500, "Public_id cannot exceed 500 characters"] 
      },
      url: { 
        type: String, 
        required: [true, "Image URL is required"], 
        maxlength: [1000, "URL cannot exceed 1000 characters"] 
      },
    },

    hoverImage: {
      public_id: { 
        type: String, 
        maxlength: [500, "Public_id cannot exceed 500 characters"] 
      },
      url: { 
        type: String, 
        maxlength: [1000, "URL cannot exceed 1000 characters"] 
      },
    },

    description: { 
      type: String, 
      maxlength: [5000, "Description cannot exceed 5000 characters"],
      default: "" 
    },
    
    fullDescription: { 
      type: String, 
      maxlength: [10000, "Full description cannot exceed 10000 characters"],
      default: "" 
    },

    technologies: [{ 
      type: String, 
      maxlength: [200, "Technology name cannot exceed 200 characters"],
      trim: true 
    }],
    
    features: [{ 
      type: String, 
      maxlength: [200, "Feature cannot exceed 200 characters"],
      trim: true 
    }],

    links: {
      live: { 
        type: String, 
        maxlength: [500, "Live URL cannot exceed 500 characters"],
        validate: {
          validator: function(v) {
            if (!v) return true;
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
          },
          message: "Please provide a valid URL for live demo"
        }
      },
      code: { 
        type: String, 
        maxlength: [500, "Code URL cannot exceed 500 characters"],
        validate: {
          validator: function(v) {
            if (!v) return true;
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
          },
          message: "Please provide a valid URL for code repository"
        }
      },
    },

    stats: {
      clients: { 
        type: String, 
        maxlength: [50, "Clients value cannot exceed 50 characters"],
        default: "1" 
      },
      rating: { 
        type: String, 
        maxlength: [10, "Rating cannot exceed 10 characters"],
        default: "4.2",
        validate: {
          validator: function(v) {
            if (!v) return true;
            return /^\d+(\.\d+)?\+?$/.test(v);
          },
          message: "Rating must be a valid number (e.g., 4.5 or 4.5+)"
        }
      },
      projects: { 
        type: String, 
        maxlength: [50, "Projects value cannot exceed 50 characters"],
        default: "1" 
      },
    },

    color: { 
      type: String, 
      maxlength: [20, "Color cannot exceed 20 characters"],
      default: "from-indigo-500 to-purple-600" 
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add index for better query performance
projectSchema.index({ title: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for formatted date
projectSchema.virtual('formattedDate').get(function() {
  return this.createdAt ? this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;
});

// Virtual for short description (first 100 characters)
projectSchema.virtual('shortDescription').get(function() {
  return this.description ? 
    (this.description.length > 100 ? 
      this.description.substring(0, 100) + '...' : 
      this.description) : '';
});

// Pre-save middleware to trim arrays and ensure defaults
projectSchema.pre('save', function(next) {
  // Trim technologies array items
  if (this.technologies && this.technologies.length > 0) {
    this.technologies = this.technologies
      .filter(tech => tech && tech.trim())
      .map(tech => tech.trim());
  }

  // Trim features array items
  if (this.features && this.features.length > 0) {
    this.features = this.features
      .filter(feature => feature && feature.trim())
      .map(feature => feature.trim());
  }

  // Set default stats if not provided
  if (!this.stats) {
    this.stats = {
      clients: "1",
      rating: "4.2",
      projects: "1"
    };
  }

  // Ensure links object exists
  if (!this.links) {
    this.links = {
      live: "",
      code: ""
    };
  }

  next();
});

// Method to get image URL with fallback
projectSchema.methods.getImageUrl = function() {
  return this.image && this.image.url ? this.image.url : null;
};

// Method to get hover image URL with fallback
projectSchema.methods.getHoverImageUrl = function() {
  return this.hoverImage && this.hoverImage.url ? this.hoverImage.url : null;
};

// Static method to get projects by category
projectSchema.statics.findByCategory = function(category) {
  return this.find({ category }).sort({ createdAt: -1 });
};

// Static method to search projects
projectSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { technologies: { $in: [new RegExp(query, 'i')] } },
      { features: { $in: [new RegExp(query, 'i')] } }
    ]
  }).sort({ createdAt: -1 });
};

// Static method to get project count by category
projectSchema.statics.getCategoryCounts = async function() {
  const counts = await this.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    web: 0,
    mobile: 0,
    games: 0
  };
  
  counts.forEach(item => {
    if (item._id) {
      result[item._id] = item.count;
    }
  });
  
  return result;
};

// Static method to get recent projects
projectSchema.statics.getRecent = function(limit = 5) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('title category image.url description stats');
};

// Error handling middleware for duplicate keys (if any)
projectSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

// Add validation for required fields on update
projectSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  
  // Check if title is being updated and validate
  if (update.title && update.title.length > 200) {
    next(new Error('Title cannot exceed 200 characters'));
  }
  
  // Check if arrays are being updated and trim them
  if (update.technologies) {
    update.technologies = update.technologies
      .filter(tech => tech && tech.trim())
      .map(tech => tech.trim());
  }
  
  if (update.features) {
    update.features = update.features
      .filter(feature => feature && feature.trim())
      .map(feature => feature.trim());
  }
  
  next();
});

// Add a compound index for better search performance
projectSchema.index({ 
  title: 'text', 
  description: 'text', 
  technologies: 'text', 
  features: 'text' 
});

module.exports = mongoose.model("Project", projectSchema);

