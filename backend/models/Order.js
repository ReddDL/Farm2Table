import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    status: { type: Number, enum: [0, 1, 2], default: 0 },
    email: { type: String, required: true },
    dateOrdered: { type: Date, default: Date.now }
});

const Order = mongoose.model('Orders', orderSchema);

export default Order;
