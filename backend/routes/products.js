import express from 'express';
import { listProducts, viewProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Route to list all products
// GET /api/products/list
router.get('/list', listProducts);

// Route to view a specific product by ID
// GET /api/products/view/:id
router.get('/view/:id', viewProduct);

export default router;
