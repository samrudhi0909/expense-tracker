import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './SignIn.css'; // Create this CSS file for custom styling

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
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
                localStorage.setItem('authToken', data.token);
                navigate("/home");
            } else {
                setError(data.message || 'Failed to sign in');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h1 className="app-title">Moolah</h1>
                <h2 className="welcome-message">Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignIn} className="signin-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
                <p className="signup-redirect">
                    New to Moolah? <a href="/signup">Create an account</a>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
