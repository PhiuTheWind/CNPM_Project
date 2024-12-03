const express = require('express');
const get_home_info = require('./get_home_info');
const get_spso_home_info = require('./get_spso_home_info');
const get_student_home_info = require('./get_student_home_info');
const get_student_log_info = require('./get_student_log_info');
const router = express.Router();

router.use(get_home_info);
router.use(get_spso_home_info);
router.use(get_student_home_info);
router.use(get_student_log_info);
module.exports = router;