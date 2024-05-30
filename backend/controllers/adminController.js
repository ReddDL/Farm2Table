//import statements
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js'; 

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
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err); // Log the error details
        res.status(500).json({ message: 'Server Error', error: err.message }); // Send detailed error message
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
        // update the order status to 'Confirmed' (assuming 1 represents 'Confirmed')
        order.status = 1;
        await order.save();
        // send the updated order as a response
        res.status(200).json(order);
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ message: 'Server Error' });
    }
};

// get confirmed/fulfilled orders
export const getConfirmedOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 1 }); 
        if (!orders.length) return res.status(404).json({ message: 'No confirmed orders found' });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// get unconfirmed/fulfilled orders
export const getUnConfirmedOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 0 }); 
        if (!orders.length) return res.status(404).json({ message: 'No unconfirmed orders found' });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// generate sales report
export const generateSalesReport = async (req, res) => {
    try {
        const { interval } = req.query; // access the parameter using req.query.interval
        let startDate;

        // calculate start date based on the interval
        switch (interval) {
            case 'weekly':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'monthly':
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'annual':
                startDate = new Date();
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                return res.status(400).json({ message: 'Invalid interval' });
        }

        // find orders within the specified interval
        const orders = await Order.find({ dateOrdered: { $gte: startDate } }); // gte is greater than or equal to

        // aggregate sales data
        const salesReport = {};
        let totalSalesAmount = 0;

        for (const order of orders) {
            const productId = order.productId;
            const product = await Product.findById(productId);
            if (!salesReport[productId]) {    
                salesReport[productId] = {
                    productName: product.name,
                    quantitySold: 0,
                    income: 0,
                };
            }
            salesReport[productId].quantitySold += order.quantity;
            salesReport[productId].income += order.quantity * product.price; // assuming `price` is part of the order model
            totalSalesAmount += order.quantity * product.price;
        }
        res.status(200).json({ salesReport, totalSalesAmount });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}; 

// Get all orders for a specific interval and confirmed
export const getOrdersByInterval = async (req, res) => {
    try {
        const { interval } = req.query;
        let startDate;

        // Calculate start date based on the interval
        switch (interval) {
            case 'weekly':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'monthly':
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'annually':
                startDate = new Date();
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                return res.status(400).json({ message: 'Invalid interval' });
        }

        // find confirmed orders within the specified interval
        const orders = await Order.find({ 
            dateOrdered: { $gte: startDate },
            status: 1 // Assuming 1 is the status for confirmed orders
        });

        res.status(200).json({ orders });
    } catch (err) {
        console.error(err); // Log error details for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get summary of total sales and income per interval by product including those not bought
export const getSalesSummaryByInterval = async (req, res) => {
    try {
        const { interval } = req.query;
        let startDate;

        // Calculate start date based on the interval
        switch (interval) {
            case 'weekly':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'monthly':
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'annually':
                startDate = new Date();
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                return res.status(400).json({ message: 'Invalid interval' });
        }

        // find orders within the specified interval
        const orders = await Order.find({ dateOrdered: { $gte: startDate } });

        // get all products
        const products = await Product.find();

        // aggregate sales data by product
        const salesSummary = {};
        for (const product of products) {
            salesSummary[product._id] = {
                productName: product.name,
                totalQuantitySold: 0,
                totalIncome: 0,
            };
        }

        for (const order of orders) {
            const productId = order.productId;
            if (salesSummary[productId]) {
                salesSummary[productId].totalQuantitySold += order.quantity;
                salesSummary[productId].totalIncome += order.totalPrice;
            }
        }

        res.status(200).json({ salesSummary });
    } catch (err) {
        console.error(err); // Log error details for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};
