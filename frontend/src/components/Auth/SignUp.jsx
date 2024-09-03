import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './SignIn.css'; // Reusing the same CSS file

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                navigate("/home");
            } else {
                setError(data.message || 'Failed to sign up');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="signin-container"> {/* Reuse the same container class */}
            <div className="signin-card"> {/* Reuse the same card class */}
                <h1 className="app-title">Moolah</h1> {/* Same app title styling */}
                <h2 className="welcome-message">Create Your Account</h2> {/* Modified welcome message */}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignUp} className="signin-form"> {/* Reuse the same form class */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Name"
                        className="input-field"
                    />
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
                    <button type="submit" className="signin-button">Sign Up</button>
                </form>
                <p className="signup-redirect">
                    Already have an account? <a href="/signin">Sign In here</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
