const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentReportController');
const authenticate = require('../middlewares/authenticate');

router.post('/papersize_summary',authenticate, studentController.get_papersizesummary)
router.post('/fileextension_summary',authenticate, studentController.get_fileextensionsummary)
router.post('/frequency_summary',authenticate, studentController.get_frequencysummary)

module.exports = router;