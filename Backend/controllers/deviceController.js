import Device from '../models/deviceModel.js';


export const registerDevice = async (req, res) => {
    const { deviceName, imei, simNumber } = req.body;

    // Basic validation
    if (!deviceName || !imei || !simNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Save device to the database
        const newDevice = new Device({ deviceName, imei, simNumber });
        await newDevice.save();
        res.status(201).json({ message: 'Device registered successfully!' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'IMEI must be unique.' });
        }
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

// module.exports = { registerDevice };
