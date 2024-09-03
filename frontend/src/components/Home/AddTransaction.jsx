import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config';
const API_URL = `${API_ENDPOINT}api`;

function AddTransaction({ onTransactionAdded }) {  
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (!token) {
      setError('No authentication token found. Please sign in again.');
      return;
    }

    console.log('Preparing to send request');
    fetch(`${API_URL}/transactions/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        amount: parseFloat(amount), 
        type,
        ...(tag && { tag })  // Include tag if it's provided
      }),
    })
    .then(response => {
      console.log('Response received:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Data:', data);
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('Transaction added successfully');
        // Call the callback function to update the net worth
        if (typeof onTransactionAdded === 'function') {
          onTransactionAdded(parseFloat(amount), type);
        }
        setAmount('');
        setType('income');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setError('Something went wrong. Please try again later.');
    });
  };
  return (
    <div>
      <h2 style={{ color: '#14FFEC' }}>Add Transaction</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleAddTransaction}>
        <div className="form-group">
          <label htmlFor="amount" style={{ fontWeight: 'bold', fontSize: '1.2em'}}>Amount: <span style={{ color: 'red' }}>*</span></label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" style={{ fontWeight: 'bold', fontSize: '1.2em'}}>Type: <span style={{ color: 'red' }}>*</span></label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="spending">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tag" style={{ fontWeight: 'bold', fontSize: '1.2em'}}>Tag (optional):</label>
          <input
            id="tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
  
          />
        </div>
        <button type="submit" style={{ marginTop: '5px' }}>Add</button>
      </form>
    </div>
  );
}
export default AddTransaction;