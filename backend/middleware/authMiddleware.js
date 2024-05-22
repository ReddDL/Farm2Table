//import statements

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Secret key for JWT token generation
const secretKey = "mama mo";

// protect routes and ensure the user is authenticated
export const protect = async (req, res, next) => {
    try {
        let token;

        // check if the authorization header contains a Bearer token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            //verify the token using the secret key
            // const decoded = jwt.verify(token, process.env.JWT_SECRET );
            const decoded = jwt.verify(token, process.env.JWT_SECRET || secretKey);

            //attach the user information to the request object, excluding the password
            req.user = await User.findById(decoded.userId).select('-password');
            
            //proceed to the next middleware or route handler
            next();
        } else {
            //if no token is found, send a 401 (Unauthorized) response
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error(error);
        //if token verification fails, send a 401 (Unauthorized) response
        res.status(401).json({ message: 'Not authorized' });
    }
};

//middleware to allow access only to admin users
export const adminOnly = (req, res, next) => {
    //check if the user is authenticated and has an admin userType
    if (req.user && req.user.userType === 'admin') {
        //proceed to the next middleware or route handler
        next();
    } else {
        //if the user is not an admin, send a 403 (Forbidden) response
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};
