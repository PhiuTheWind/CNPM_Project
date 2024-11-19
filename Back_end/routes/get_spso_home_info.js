const express = require('express');
const router = express.Router();
const spsoController = require('../controllers/spsoController');


route.get('/add_printer', spsoController.add_printer);


module.exports = router;