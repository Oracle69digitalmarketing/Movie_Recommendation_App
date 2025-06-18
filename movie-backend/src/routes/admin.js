import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController.js';

const router = express.Router();

// All routes below require user to be authenticated and have admin role
router.use(authMiddleware, isAdmin);

// GET /api/admin/stats – Admin dashboard metrics
router.get('/stats', getDashboardStats);

// GET /api/admin/users – List all users
router.get('/users', getAllUsers);

// PUT /api/admin/users/:id – Update user role
router.put('/users/:id', updateUserRole);

// DELETE /api/admin/users/:id – Delete user
router.delete('/users/:id', deleteUser);

export default router;
