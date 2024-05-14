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

router.use(protect);
router.use(adminOnly);

router.get('/users/total', getTotalUsers);
router.post('/products/create', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id/update', updateProduct);
router.delete('/products/:id/delete', deleteProduct);
router.put('/orders/:id/confirm', confirmOrderFulfillment);

export default router;
