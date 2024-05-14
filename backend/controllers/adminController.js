import Product from '../models/Product.js';
import User from '../models/User.js';

//get total number of users
export const getTotalUsers = async (req, res) => {
    try {
        // count the total number of users in the database
        const totalUsers = await User.countDocuments();
        // send the total number of users as a response
        res.status(200).json({ totalUsers });
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// create a new product
export const createProduct = async (req, res) => {
    try {
        // create a new product instance with the data from the request body
        const newProduct = new Product(req.body);
        // save the new product to the database
        await newProduct.save();
        // send the newly created product as a response
        res.status(201).json(newProduct);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// get all products
export const getAllProducts = async (req, res) => {
    try {
        // fetch all products from the database
        const products = await Product.find();
        // send the list of products as a response
        res.status(200).json(products);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// get product by ID
export const getProductById = async (req, res) => {
    try {
        // find the product by its ID
        const product = await Product.findById(req.params.id);
        // if the product doesn't exist, send a 404 (Not Found) response
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // send the product as a response
        res.status(200).json(product);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// update product by ID
export const updateProduct = async (req, res) => {
    try {
        // find the product by its ID and update it with the new data
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // if the product doesn't exist, send a 404 (Not Found) response
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // send the updated product as a response
        res.status(200).json(product);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// delete product by ID
export const deleteProduct = async (req, res) => {
    try {
        // find the product by its ID and delete it
        const product = await Product.findByIdAndDelete(req.params.id);
        // if the product doesn't exist, send a 404 (Not Found) response
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // send a success message as a response
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// confirm order fulfillment
export const confirmOrderFulfillment = async (req, res) => {
    try {
        // find the order by its ID
        const order = await Order.findById(req.params.id);
        // if the order doesn't exist, send a 404 (Not Found) response
        if (!order) return res.status(404).json({ message: 'Order not found' });
        // update the order status to 'Confirmed'
        order.status = 'Confirmed';
        await order.save();
        // send the updated order as a response
        res.status(200).json(order);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};
