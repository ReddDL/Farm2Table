import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// secret key for JWT token generation
const secretKey = process.env.JWT_SECRET;

// specific password for DA access
const DA_PASSWORD = process.env.DA_PASSWORD || 'da-special-password';

// function to generate JWT token
const generateToken = (userId, userType) => {
    return jwt.sign({ userId, userType }, secretKey, { expiresIn: '1h' });
};

// registration function (sign-up)
export const register = async (req, res) => {
    try {
        // check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // determine user type based on the provided password
        const userType = req.body.password === DA_PASSWORD ? 'admin' : 'customer';

        // create a new user instance
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            userType: userType  // assign user type based on password
        });

        // save the new user to the database
        await user.save();

        // generate JWT token for the newly registered user
        const token = generateToken(user._id, user.userType);

        // send the JWT token as a response
        res.status(201).json({ token });
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// login function (sign-in)
export const login = async (req, res) => {
    try {
        // extract email, password, and daPassword from the request body
        const { email, password, daPassword } = req.body;

        // find the user by email
        const user = await User.findOne({ email });
        // if the user doesn't exist, send a 400 (Bad Request) response
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // if the password is invalid, send a 400 (Bad Request) response
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // check if the user is trying to log in as DA and if the DA password is correct
        if (daPassword && daPassword === DA_PASSWORD) {
            // check if the user is actually an admin
            if (user.userType !== 'admin') {
                return res.status(403).json({ message: 'Access denied' });
            }
        } else if (user.userType === 'admin') {
            // if the user is an admin but the DA password is incorrect or not provided, deny access
            return res.status(403).json({ message: 'Access denied' });
        }

        // generate JWT token for the authenticated user
        const token = generateToken(user._id, user.userType);

        // send the JWT token as a response
        res.status(200).json({ token });
    } catch (err) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// logout function
export const logout = async (req, res) => {
    try {
        // no action needed for JWT logout, send a success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status500().json({ message: 'Internal server error' });
    }
};
