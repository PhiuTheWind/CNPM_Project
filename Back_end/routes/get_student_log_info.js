const express = require('express');
const router = express.Router();
const studentLogController = require('../controllers/studentLogController');
const authenticate = require('../middlewares/authenticate');

router.get('/log', authenticate, studentLogController.GetStudentLog);

module.exports = router;