import React, { useState } from 'react';
import axios from 'axios';
import "../styles/LoginForm.css"; // Importing CSS for styling

const LoginForm = () => {
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState(''); // Password state
    const [error, setError] = useState(''); // Error state
    const [successMessage, setSuccessMessage] = useState(''); // Success message state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
    
        // Basic validation
        if (!email || !password) {
            setError('Please fill in both fields.');
            setSuccessMessage('login sucessfully');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email, // Use email here
                password, // Use password here
            });

            localStorage.setItem('token', response.data.token); // Save token
           
            setSuccessMessage(response.data.message); // Show success message
            setError('');

        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.'); // Show error
            setSuccessMessage('');
        }
    };
    
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
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
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
