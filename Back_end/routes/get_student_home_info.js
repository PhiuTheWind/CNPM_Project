const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/maintenance', studentController.maintenance);
router.get('/guideline', studentController.guideline);
router.get('/contact', studentController.contact);
router.get('/chooseprinter', studentController.get_printer_list_for_student);
router.post('/pagebalance', studentController.get_pagebalance);

module.exports = router;