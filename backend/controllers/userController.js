//import statements
import User from '../models/User.js';

//get all users
export const getAllUsers = async (req, res) => {
    try {
        // retrieve all users from the database
        const users = await User.find();
        // send the list of users as a response
        res.json(users);
    } catch (error) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get a single user by ID
export const getUserById = async (req, res) => {
    try {
        // extract user ID from request parameters
        const userId = req.params.id;
        // find the user by ID
        const user = await User.findById(userId);
        // if the user doesn't exist, send a 404 (Not Found) response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // send the user details as a response
        res.json(user);
    } catch (error) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// update a user
export const updateUser = async (req, res) => {
    try {
        // extract user ID from request parameters and updated user data from request body
        const userId = req.params.id;
        const updatedUser = req.body;
        // find the user by ID and update it with the new data
        const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        // if the user doesn't exist, send a 404 (Not Found) response
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        // send a success message along with the updated user as a response
        res.json({ message: 'User updated successfully', user: result });
    } catch (error) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// delete a user
export const deleteUser = async (req, res) => {
    try {
        // extract user ID from request parameters
        const userId = req.params.id;
        // find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);
        // if the user doesn't exist, send a 404 (Not Found) response
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // send a success message along with the deleted user as a response
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        // handle any errors and send a 500 (Internal Server Error) response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
