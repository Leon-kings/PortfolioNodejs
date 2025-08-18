const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if already subscribed
    const existingSub = await Subscription.findOne({ email });
    if (existingSub) {
      if (existingSub.isActive) {
        return res.status(400).json({
          success: false,
          error: 'This email is already subscribed'
        });
      }
      // Reactivate if previously unsubscribed
      existingSub.isActive = true;
      existingSub.unsubscribedAt = undefined;
      await existingSub.save();
    } else {
      // Create new subscription
      await Subscription.create({ email });
    }

    res.status(201).json({
      success: true,
      message: 'Subscription successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.params;

    const subscription = await Subscription.findOneAndUpdate(
      { email },
      { isActive: false, unsubscribedAt: Date.now() },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Email not found in subscriptions'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Unsubscribed successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscription.find({ isActive: true })
      .sort({ subscribedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (err) {
    next(err);
  }
};