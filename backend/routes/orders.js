import express from 'express';
import { 
  createOrder, 
  updateOrderStatus, 
  getOrderById, 
  getUserOrders, 
  getAllOrders
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

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

// get all orders by user
// GET /api/orders/getUserOrders
router.get('/getUserOrders', getUserOrders); 

router.use(adminOnly)

// get all orders
// GET /api/orders/getAllOrders
router.get('/getAllOrders', getAllOrders); 


export default router;
