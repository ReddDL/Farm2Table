import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // auto generated ung user id sa MongoDB
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('Users', userSchema);

export default User;
