import { Schema, model } from 'mongoose';

const deviceSchema = new Schema({
    deviceName: { type: String, required: true },
    imei: { type: String, required: true, unique: true },
    simNumber: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now }
});


export default model('Device', deviceSchema);
