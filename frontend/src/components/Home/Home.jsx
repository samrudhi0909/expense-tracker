import React, { useState, useEffect } from 'react';
import AddTransaction from './AddTransaction';
import TransactionHistory from './TransactionHistory';
import { API_URL } from '../../config';
import './Home.css'; 

function Home() {
  const [netWorth, setNetWorth] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchNetWorth();
  }, []);

  const fetchNetWorth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/transactions/networth`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userinfo = await fetch(`${API_URL}/transactions/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      const userData = await userinfo.json();

      if (response.ok && userinfo.ok) {
        setNetWorth(data.netWorth);
        setUserName(userData.name);
      } else {
        console.error('Failed to fetch net worth');
      }
    } catch (error) {
      userinfo.ok === false ? console.error('Error fetching net worth', error) : console.error('Error fetching user info', error);
    }
  };

  const handleTransactionAdded = (amount, type) => {
    setNetWorth(prevNetWorth => {
      const newNetWorth = type === 'income'
        ? prevNetWorth + amount
        : prevNetWorth - amount;
      return parseFloat(newNetWorth.toFixed(2));
    });
  };

  return (
    <div className="container home-grid">
      <div className="header">
        <h1 className="app-title">Moolah</h1>
        <h6 className="tagline">Track that Money!</h6>
      </div>
      <div className="net-worth">
        <h1>Welcome, {userName}!</h1>
        <br></br>
        <h2>Your current net worth is</h2>
        <p className="net-worth-amount">${netWorth.toFixed(2)}</p>
      </div>
      <div className="add-transaction">
        <AddTransaction onTransactionAdded={handleTransactionAdded} />
      </div>
      <div className="transaction-history">
        <TransactionHistory />
      </div>
    </div>
  );
}

export default Home;
