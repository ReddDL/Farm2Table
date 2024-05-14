import express from 'express';
import { createOrder, updateOrderStatus, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Update order status
router.put('/:id', updateOrderStatus);

// Get order details by ID
router.get('/:id', getOrderById);

// Add more route handlers for listing orders, deleting orders, etc.

export default router;
