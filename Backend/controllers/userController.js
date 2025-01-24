    import User from '../models/userMo.js';

    // Update user role
    export const updateUserRole = async (req, res) => {
        const { userId, newRole } = req.body;

        if (!userId || !newRole) {
            return res.status(400).json({ error: 'User ID and new role are required.' });
        }

        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(newRole)) {
            return res.status(400).json({ error: 'Invalid role provided.' });
        }

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            user.role = newRole;
            await user.save();

            res.status(200).json({ message: 'User role updated successfully!', user });
        } catch (error) {
            console.error('Error updating user role:', error);
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    };
