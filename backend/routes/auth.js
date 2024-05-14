import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/authController.js';

//registration
router.post('/register', register);
//login
router.post('/login', login);
//logout
router.post('/logout', logout);

export default router;
    