import express from 'express';
const router = express.Router();
import { generateSalesReport } from '../controllers/salesController.js'; // Update import to use named export

// Route to generate sales report based on interval (weekly, monthly, annual)
router.get('/:interval', generateSalesReport); // Update to use the named function directly

export default router; // Export the router directly
