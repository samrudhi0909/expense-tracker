// backend/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Add a new transaction
exports.addTransaction = async (req, res) => {
  
  try {
    const { amount, type, tag} = req.body;
    const transaction = await Transaction.create({ user: req.user.id, amount, type, tag });

    // Update user's net worth
    const user = await User.findById(req.user.id);
    if (type === 'income') {
      console.log('Processing income');
      user.netWorth = parseFloat(user.netWorth) + parseFloat(amount);
    } else {
      console.log('Processing expense');
      user.netWorth = parseFloat(user.netWorth) - parseFloat(amount);
    }
     // Save the updated user document
    console.log('Updated net worth:', user.netWorth);  // Log for debugging

    await user.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json( user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user's net worth
exports.getNetWorth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure netWorth is a number
    const netWorth = typeof user.netWorth === 'number' ? user.netWorth : 0;

    res.json({ netWorth });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get transactions for a specified date
exports.getTransactionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Both startDate and endDate query parameters are required' });
    }

    // Find transactions within the date range
    const transactions = await Transaction.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate).setHours(0, 0, 0, 0),
        $lt: new Date(endDate).setHours(23, 59, 59, 999),
      },
    });

    res.json(transactions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


