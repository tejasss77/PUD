const express = require('express');
const router = express.Router();
const { scanUrl, getHistory } = require('../controllers/scan.controller');

router.post('/', scanUrl);
router.get('/history', getHistory);

module.exports = router;
