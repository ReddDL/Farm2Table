//import statements
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const generateSalesReport = async (req, res) => {
    try {
        const { interval } = req.query; // access the parameter using req.query.interval
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

