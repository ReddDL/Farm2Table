import Product from '../models/Product.js';

// list all products
export const listProducts = async (req, res) => {
    try {
        // fetch all products from the database
        const products = await Product.find();
        // send the list of products as a response
        res.status(200).json(products);
    } catch (err) {
        // if an error occurs, send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// view a specific product by ID
export const viewProduct = async (req, res) => {
    try {
        // find the product by its ID
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // send the product as a response
        res.status(200).json(product);
    } catch (err) {
        // if an error occurs, send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};
