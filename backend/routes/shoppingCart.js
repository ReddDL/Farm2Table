import express from 'express';
import {
    getShoppingCart,
    addItemToCart,
    updateCart,
    removeItemFromCart,
    clearCart
} from '../controllers/shoppingCartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all shopping cart routes
router.use(protect);

// Route to get the shopping cart
// GET /api/cart
router.get('/', getShoppingCart);

// Route to add an item to the shopping cart
// POST /api/cart/add
router.post('/add', addItemToCart);

// Route to update shopping cart
// PUT /api/cart/update
router.put('/update', updateCart);

// Route to remove an item from the shopping cart
// DELETE /api/cart/remove/:productId
router.delete('/remove/:productId', removeItemFromCart);

// Route to clear the shopping cart
// DELETE /api/cart/clear
router.delete('/clear', clearCart);

export default router;
