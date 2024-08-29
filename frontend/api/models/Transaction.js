// backend/models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'spending'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type : String,
    required : false,
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
