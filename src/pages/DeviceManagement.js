import React, { useState } from 'react';
import '../styles/DeviceManagement.css'; // Optional: Add styling
import axios from 'axios';

const DeviceManagement = () => {
    const [deviceName, setDeviceName] = useState('');
    const [imei, setImei] = useState('');
    const [simNumber, setSimNumber] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!deviceName || !imei || !simNumber) {
            setError('All fields are required.');
            setSuccessMessage('');
            return;
        };
    try {
        const response = await axios.post(
            'http://localhost:5000/api/devices/register',
            { deviceName, imei, simNumber },
            { headers: { Authorization: `Bearer ${token}` } }

        );
        setSuccessMessage(response.data.message);
    } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong.');
    }

};
    return (
        <div className="device-management-container">
            <form className="device-form" onSubmit={handleSubmit}>
                <h2>Register a Device</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="form-group">
                    <label htmlFor="deviceName">Device Name:</label>
                    <input
                        type="text"
                        id="deviceName"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        placeholder="Enter device name"
                        required
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="imei">IMEI:</label>
                    <input
                        type="text"
                        id="imei"
                        value={imei}
                        onChange={(e) => setImei(e.target.value)}
                        placeholder="Enter 15-digit IMEI"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="simNumber">SIM Number:</label>
                    <input
                        type="text"
                        id="simNumber"
                        value={simNumber}
                        onChange={(e) => setSimNumber(e.target.value)}
                        placeholder="Enter SIM number"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Register Device</button>
            </form>
        </div>
    );
};

export default DeviceManagement;
