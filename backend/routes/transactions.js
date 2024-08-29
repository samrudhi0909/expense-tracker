// backend/routes/transactions.js
const express = require('express');
const { addTransaction, getUserInfo,getNetWorth, getTransactionsByDateRange } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addTransaction);
router.get('/userinfo', protect, getUserInfo);
router.get('/networth', protect, getNetWorth);
router.get('/', protect, getTransactionsByDateRange);  

module.exports = router;
