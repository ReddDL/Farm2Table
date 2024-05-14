import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

//get all users
router.get('/all', getAllUsers);

//get a single user by ID
router.get('/:id', getUserById);

//update a user
router.put('/update/:id', updateUser);

//delete a user
router.delete('/delete/:id', deleteUser);

export default router;
