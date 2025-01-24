import express from 'express';
import { registerDevice } from '../controllers/deviceController.js';
import authMiddleware from '../middwares/authoMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registerDevice);

export default router;
