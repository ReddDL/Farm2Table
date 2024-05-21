import express from 'express';
import { createOrder, updateOrderStatus, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// protect all order routes
router.use(protect);

// create a new order
// POST /api/orders/create
router.post('/create', createOrder);

// update order status by ID
// PUT /api/orders/updateOrder/:id
router.put('/updateOrder/:id', updateOrderStatus);

// get order details by ID
// GET /api/orders/getOrder/:id
router.get('/getOrder/:id', getOrderById);

export default router;
