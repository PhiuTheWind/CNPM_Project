const express = require('express');
const router = express.Router();
const studentLogController = require('../controllers/studentLogController');
const authenticate = require('../middlewares/authenticate');

router.post('/log', authenticate, studentLogController.GetStudentLog);
router.post('/logdetail', authenticate, studentLogController.GetStudentLogDetail);

module.exports = router;