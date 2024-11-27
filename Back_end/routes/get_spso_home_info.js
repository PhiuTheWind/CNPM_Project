const express = require('express');
const router = express.Router();
const spsoController = require('../controllers/spsoController');

router.post('/add_printer', spsoController.add_printer);
router.post('/modify_status', spsoController.modify_status);
//router.get('/report', spsoController.report);

module.exports = router;    