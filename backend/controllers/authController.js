import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT token generation
const secretKey = "mama mo";
console.log('Secret Key:', secretKey);

// Specific password for DA access
const DA_PASSWORD = "12345";

// Function to generate JWT token
const generateToken = (userId, userType) => {
    return jwt.sign({ userId, userType }, secretKey, { expiresIn: '1h' });
};

// Registration function (sign-up)
export const register = async (req, res) => {
    try {
        console.log('Received request body:', req.body);

        const { firstName, lastName, email, password } = req.body;
        console.log('Received user details:', { firstName, lastName, email, password });

        // Check if any of the required fields are undefined
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('Password:', password); // Log the password before hashing

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Determine user type based on the provided password
        const userType = password === DA_PASSWORD ? 'admin' : 'customer';

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType // Assign user type based on password
        });

        // Save the new user to the database
        await user.save();

        // Generate JWT token for the newly registered user
        const token = generateToken(user._id, user.userType);

        // Send the JWT token as a response
        res.status(201).json({ token });
    } catch (err) {
        // Handle any errors and send a 500 (Internal Server Error) response
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login function (sign-in)
export const login = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        // If the user doesn't exist, send a 400 (Bad Request) response
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // If the password is invalid, send a 400 (Bad Request) response
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token for the authenticated user
        const token = generateToken(user._id, user.userType);

        // Send the JWT token as a response
        res.status(200).json({ token });
    } catch (err) {
        // Handle any errors and send a 500 (Internal Server Error) response
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Logout function
export const logout = async (req, res) => {
    try {
        // No action needed for JWT logout, send a success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // Handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
