import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/devices">Device Management</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
