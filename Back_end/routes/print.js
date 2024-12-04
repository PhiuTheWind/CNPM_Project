const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');

router.post('/print', printController.savePrintRequest);

module.exports = router;