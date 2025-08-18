const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  subscriptionController.subscribe
);

router.delete('/:email', subscriptionController.unsubscribe);
router.get('/', subscriptionController.getAllSubscribers);

module.exports = router;