import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css'; // Reuse the styling for the form

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Both fields are required.');
            setSuccessMessage('');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
            setSuccessMessage(response.data.message || 'Signup successful!');
            setError('');
        } catch (err) {
            console.error('Error during signup:', err); // Log the error for debugging
            setError(err.response?.data?.error || 'Something went wrong.');
            setSuccessMessage('');
        }
    };
    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">UserEmail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter an email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
