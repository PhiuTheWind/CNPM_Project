const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/buypage', authenticate, paymentController.buyPage);

module.exports = router;