import ShoppingCart from '../models/Cart.js';
import Product from '../models/Product.js';

//get shopping cart for a user
export const getShoppingCart = async (req, res) => {
    try {
        const cart = await ShoppingCart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Shopping cart not found' });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//add item to shopping cart
export const addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = new ShoppingCart({ userId: req.user._id, items: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//remove item from shopping cart
export const removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Shopping cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//clear shopping cart
export const clearCart = async (req, res) => {
    try {
        const cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Shopping cart not found' });

        cart.items = [];
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
