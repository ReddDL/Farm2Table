import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['crop', 'poultry'], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const Product = mongoose.model('Products', productSchema);

export default Product;
