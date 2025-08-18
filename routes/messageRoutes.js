const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message must be at least 10 characters').isLength({ min: 10 })
  ],
  messageController.createMessage
);

router.get('/', messageController.getMessages);

router.put('/:id/read', messageController.markAsRead);

module.exports = router;