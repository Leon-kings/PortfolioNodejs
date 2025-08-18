const mongoose = require('mongoose');

const hireMeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long']
  },
  budget: {
    type: String,
    required: [true, 'Budget selection is required'],
    enum: ['$500-$1000', '$1000-$5000', '$5000+', 'Not sure']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'contacted', 'archived'],
    default: 'new'
  }
});

module.exports = mongoose.model('HireMe', hireMeSchema);