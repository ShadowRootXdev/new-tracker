import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm.js';
import Dashboard from './pages/Dashboard.js';
import DeviceManagement from './pages/DeviceManagement.js';
import SignupForm from './components/SignupForm'; // Import the SignupForm component
import Navbar from './components/Navbar.js';

const App = () => {
    const isAuthenticated = false; // Replace with actual authentication logic

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/devices"
                        element={
                            isAuthenticated ? <DeviceManagement /> : <Navigate to="/login" replace />
                        }
                    />
                     <Route path="/signup" element={<SignupForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
