const express = require('express');
const router = express.Router();
const spsoController = require('../controllers/spsoController');

router.post('/add_printer', spsoController.add_printer);
//router.post('/modify_status', spsoController.modify_status);
router.patch('/modify_status', spsoController.modify_status);
router.patch('/refill_paper', spsoController.refill_paper);
router.patch('/sysconfig_patch', spsoController.patch_config);
router.get('/manage_printer', spsoController.get_printer_list)
router.get('/sysconfig', spsoController.get_config);
router.post('/printer_history', spsoController.get_history)
router.get('/history', spsoController.get_history_all)
router.post('/year_report',spsoController.get_yearly_statistics)
router.post('/month_report',spsoController.get_month_statistics)
//router.get('/report', spsoController.report);

module.exports = router;    