const express = require('express');
const router = express.Router();
router.get('/', require('../controllers/recentTransactionsController'))

module.exports = router;