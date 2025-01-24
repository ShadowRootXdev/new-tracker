import express from 'express';
import authRoutes from './Routes/authRoutes.js';
import deviceRoutes from './Routes/deviceRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);

app.use((res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
    });
    next();
});


// Database connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
    });

// Routes
// app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
