import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUser
} from '../controllers/userController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all user routes
router.use(protect);

// Route to get user profile
// GET /api/users/profile
router.get('/profile', getUserProfile);

// Route to update user profile
// PUT /api/users/profile
router.put('/update/profile', updateUserProfile);

// Admin routes
router.use(adminOnly);

// Route to get all users (admin only)
// GET /api/users/all
router.get('/all', getAllUsers);

// Route to get a user by ID (admin only)
// GET /api/users/getuser/:id
router.get('/getuser/:id', getUserById);

// Route to delete a user by ID (admin only)
// DELETE /api/users/delete/:id
router.delete('/delete/:id', deleteUser);

export default router;
