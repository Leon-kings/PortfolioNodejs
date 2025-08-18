const HireMe = require('../models/HireMe');
const { sendAdminNotification, sendConfirmationEmail } = require('../mails/emailService');

exports.createHireMeRequest = async (req, res, next) => {
  try {
    const { name, email, message, budget } = req.body;
    
    const newRequest = await HireMe.create({
      name,
      email,
      message,
      budget
    });

    // Send emails (don't await to make response faster)
    sendAdminNotification({
      ...newRequest.toObject(),
      subject: 'New Hire Me Request',
      type: 'hire'
    }).catch(console.error);
    
    sendConfirmationEmail({
      ...newRequest.toObject(),
      subject: 'We Received Your Hiring Request',
      type: 'hire'
    }).catch(console.error);

    res.status(201).json({
      success: true,
      data: newRequest
    });
  } catch (err) {
    next(err);
  }
};

exports.getHireMeRequests = async (req, res, next) => {
  try {
    const requests = await HireMe.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    const request = await HireMe.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (err) {
    next(err);
  }
};