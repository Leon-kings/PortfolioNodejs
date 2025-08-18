const express = require('express');
const router = express.Router();
const hireMeController = require('../controllers/hireMeController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message must be at least 10 characters').isLength({ min: 10 }),
    check('budget', 'Please select a budget range').not().isEmpty()
  ],
  hireMeController.createHireMeRequest
);


router.get('/', hireMeController.getHireMeRequests);

router.put('/:id/status', hireMeController.updateRequestStatus);

module.exports = router;