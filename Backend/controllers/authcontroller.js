import jwt from 'jsonwebtoken';
import User from '../models/userMo.js';
import bcrypt from 'bcryptjs';

 const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        console.log('Request body:', req.body);

        // Query the database for the user with the provided email
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log('User found:', user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate a token with user ID and role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
export default loginUser;


export const registerUser = async (req, res) => {
    const { email, password, role } = req.body;


    console.log('Request body:', req.body); // Log the incoming request body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const validRoles = ['user', 'admin'];
    if (role && !validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role provided.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        console.log('Existing user check:', existingUser); // Log existing user check result

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Existing user check:', existingUser); // Log existing user check result

        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();
        const savedUser = await newUser.save();
        console.log('New user created:', savedUser); 

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during user registration:', error); // Log detailed error
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
