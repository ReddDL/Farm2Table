import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Registration route (accessible without authentication)
// POST /api/auth/register
router.post('/register', register);

// Login route (accessible without authentication)
// POST /api/auth/login
router.post('/login', login);

// Logout route (requires authentication)
// POST /api/auth/logout
router.post('/logout', protect, logout);

export default router;
