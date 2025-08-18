const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  unsubscribedAt: {
    type: Date
  }
});

// Prevent duplicate emails
subscriptionSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);