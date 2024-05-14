import express from 'express';
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

//create a new product
router.post('/create', createProduct);

//get all products
router.get('/fetch', getAllProducts);

//get a single product by ID
router.get('/getPID:id', getProductById);

//update a product
router.put('/update:id', updateProduct);

//delete a product
router.delete('/:id', deleteProduct);

export default router;
