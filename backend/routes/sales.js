import express from 'express';
const router = express.Router();
import { generateSalesReport } from '../controllers/salesController.js'; // Ensure the correct path

// route to generate sales report based on interval (weekly, monthly, annual)
router.get('/interval', generateSalesReport);

export default router;
