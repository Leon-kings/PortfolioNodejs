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

// Delete Message by ID
exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Validate request
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Message ID is required",
      });
    }

    const existingMessage = await Message.findById(id);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await existingMessage.deleteOne();

    res.status(200).json({
      success: true,
      message: `Message from ${existingMessage.email} deleted successfully`,
      data: {
        id: existingMessage._id,
        name: existingMessage.name,
        email: existingMessage.email,
        services: existingMessage.services,
      },
    });

  } catch (err) {
    console.error("Delete message error:", err);
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
