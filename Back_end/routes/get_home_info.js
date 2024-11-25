const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authenticate = require('../middlewares/authenticate');

// router.post('/login/student', homeController.loginStudent);
// router.post('/login/spso', homeController.loginSPSO);
// router.post('/', authenticate, homeController.getUserByUsername);

module.exports = router;
