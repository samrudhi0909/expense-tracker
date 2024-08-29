import React, { useState } from 'react';
import { API_URL } from '../../config';
function TransactionHistory() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchTransactions = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please sign in again.');
      }

      const response = await fetch(
        `${API_URL}/transactions?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h3>Transaction History</h3>
      <form onSubmit={handleFetchTransactions}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Fetch</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div>
        <h4>Transactions:</h4>
        {transactions.length === 0 ? (
          <p>No transactions found for the selected date range.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="transaction-item">
                <span className="transaction-date">{formatDate(transaction.date)}</span>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;