// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// import express from 'express';
import express from 'express';
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data



const authMiddleware = (req, res, next) => {
    console.log('Request:', { headers: req.headers, body: req.body });
    try {
        const authHeader = req.headers?.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};



export default authMiddleware;

// Role Middleware: Restricts access based on roles
export const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        next(); // Proceed if role is allowed
    };
};


