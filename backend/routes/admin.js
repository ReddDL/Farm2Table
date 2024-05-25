import express from 'express';
import {
    getTotalUsers,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    confirmOrderFulfillment
} from '../controllers/adminController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

//protects all admin routes and ensure only admin can access
router.use(protect);
router.use(adminOnly);

// route to get total users
// GET /api/admin/users/total
router.get('/users/total', getTotalUsers);

// route to create a product
// POST /api/admin/products/create
router.post('/products/create', createProduct);

// route to get all products
// GET /api/admin/products/getAll
router.get('/products/getAll', getAllProducts);

// route to get a product by ID
// GET /api/admin/products/get/:id
router.get('/products/get/:id', getProductById);

// route to update a product by ID
// PUT /api/admin/products/update/:id
router.put('/products/update/:id/', updateProduct);

// route to delete a product by ID
// DELETE /api/admin/products/delete/:id
router.delete('/products/delete/:id', deleteProduct);

// route to confirm order fulfillment
// PUT /api/admin/orders/confirm/:id
router.patch('/orders/confirm/:id', confirmOrderFulfillment);

export default router;
