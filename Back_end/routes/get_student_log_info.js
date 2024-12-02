const express = require('express');
const router = express.Router();
const studentLogController = require('../controllers/studentLogController');


router.get('/log', studentLogController.GetStudentLog);
router.get('/logdetail', studentLogController.GetStudentLogDetail);

module.exports = router;