const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/maintenance', studentController.maintenance);
router.get('/guideline', studentController.guideline);
router.get('/contact', studentController.contact);

module.exports = router;