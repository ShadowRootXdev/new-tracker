import express from 'express';
import loginUser from '../controllers/authcontroller.js'; // Ensure the .js extension is included
import { registerUser } from '../controllers/authcontroller.js'; // Correctly import registerUser
import authMiddleware from '../middwares/authoMiddleware.js';
import authorize from '../middwares/authorize.js';
import { updateUserRole } from '../controllers/userController.js';
import roleMiddleware from '../middwares/authoMiddleware.js';

const router = express.Router();

// Define the login route
// router.post('/login', loginUser);
router.post('/login', (req, res) => {
    console.log('Login route accessed'); // Add this
    loginUser(req, res);
});
router.post('/signup', registerUser); // Add signup route



router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access!' });
});
// Protected route for both admin and regular users
router.get('/dashboard', authMiddleware, authorize(['admin', 'user']), (req, res) => {
    res.status(200).json({ message: 'Welcome to your dashboard!' });
});


// Protected route for admin users only
router.get('/admin', authMiddleware, authorize('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
});

// Admin route to update user role
// router.patch('/update-role', authMiddleware, updateUserRole);


// Route accessible only by admins
router.patch('/update-role', roleMiddleware(['admin']), updateUserRole);

// Route accessible by both users and admins
router.get('/user-data', roleMiddleware(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: 'User or admin access granted.', user: req.user });
});
// Export the router as the default export
export default router;
