const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/login/student', homeController.loginStudent);
router.get('/login/spso', homeController.loginSPSO);
router.get('/', authenticate, homeController.getUserByID);

module.exports = router;