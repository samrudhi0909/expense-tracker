import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const[error,setError] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        // Send the POST request to your backend API
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }), // send name, email, and password in the request body
        });
        const data = await response.json();
        if (response.ok) {
            // Assuming the token is returned in the data object
            const token = data.token;
            // Save the token in local storage (or any other storage mechanism)
            localStorage.setItem('authToken', token);
            // Redirect to the home page
            navigate('/home');
        } else {
            // If there was an error, set the error message to be displayed to the user
            setError(data.message || 'Failed to sign up');
        }
    } catch (err) {
        // Handle any other errors that might occur
        setError('Something went wrong. Please try again later.');
    }
    navigate('/home');
  };
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
        <button type="submit">Sign Up</button>
      </form>
      <p className="auth-link">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}
export default SignUp;
