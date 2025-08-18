const Message = require("../models/Message");
const {
  sendAdminNotification,
  sendConfirmationEmail,
} = require("../mails/emailService");

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message, services } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      message,
      services,
    });

    // Send emails (don't await to make response faster)
    sendAdminNotification(newMessage).catch(console.error);
    sendConfirmationEmail(newMessage).catch(console.error);

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (err) {
    next(err);
  }
};
