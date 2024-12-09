const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');
const authenticate = require('../middlewares/authenticate');

router.post('/print', authenticate, printController.savePrintRequest);

module.exports = router;