const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendAdminNotification = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'ld-noreply@example.com',
    to: process.env.ADMIN_EMAIL,
    subject: data.subject || 'New Form Submission',
    html: `
      <h2>New ${data.type === 'hire' ? 'Hire Me' : 'Contact'} Request</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      ${data.type === 'hire' ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p>Received at: ${new Date(data.createdAt).toLocaleString()}</p>
      ${data.type === 'hire' ? 
        `<a href="${process.env.ADMIN_PANEL_URL}/hire-me/${data._id}" style="display: inline-block; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">
          View in Admin Panel
        </a>` : ''}
    `
  };

  await transporter.sendMail(mailOptions);
};

exports.sendConfirmationEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'ld-noreply@example.com',
    to: data.email,
    subject: data.subject || 'We Received Your Message',
    html: `
      <h2>Thank You for Your ${data.type === 'hire' ? 'Hiring Request' : 'Message'}</h2>
      <p>Dear ${data.name},</p>
      <p>We've received your ${data.type === 'hire' ? 'hiring request' : 'message'} and will get back to you soon.</p>
      ${data.type === 'hire' ? `<p><strong>Your Budget:</strong> ${data.budget}</p>` : ''}
      <p><strong>Your Message:</strong></p>
      <p>${data.message}</p>
      <p>Best regards,<br>The Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Alternative simpler versions that maintain the original functionality
exports.sendSimpleAdminNotification = async (message) => {
  const mailOptions = {
    from: 'ld-noreply@example.com',
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Message Received</h2>
      <p><strong>From:</strong> ${message.name} (${message.email})</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
      <p>Received at: ${new Date(message.createdAt).toLocaleString()}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

exports.sendSimpleConfirmationEmail = async (message) => {
  const mailOptions = {
    from: 'ld-noreply@example.com',
    to: message.email,
    subject: 'We Received Your Message',
    html: `
      <h2>Thank You for Contacting Us</h2>
      <p>Dear ${message.name},</p>
      <p>We've received your message and will get back to you soon.</p>
      <p><strong>Your Message:</strong></p>
      <p>${message.message}</p>
      <p>Best regards,<br>The Support Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};