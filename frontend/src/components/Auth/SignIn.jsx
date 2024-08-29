import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign-in attempt');
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Sign-in successful, token:', data.token);
        localStorage.setItem('authToken', data.token);
        navigate("/home");
      } else {
        console.log('Sign-in failed:', data.message);
        setError(data.message || 'Failed to sign in');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignIn} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p className="auth-link">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default SignIn;