import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';
import { getAnalytics } from '../controllers/adminController.js';

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.get('/analytics', getAnalytics);

export default router;
