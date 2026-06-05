import { UserModel } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        // // console.log('login hit');

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'All fields are required'
            })
        }
        const userwithUsername = await UserModel.findOne({ name })
        if (userwithUsername) {
            return res.status(400).json({
                message: 'Username already exists'
            })
        }

        const userwithEmail = await UserModel.findOne({ email })
        if (userwithEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log(process.env.JWT_SECRET + '.......' + token);
        return res.status(201).json({ user, token });

    } catch (e) {
        
        return res.status(400).json({
            message: 'Bad request'
        });
    }
}
export const login = async (req, res) => {
    try {
        // console.log('login hit');
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: 'All fields are required'
            })
        }
        
        const user = await UserModel.findOne({ email })
        
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }console.log('verifiedPassword')
        const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        console.log(token)
        return res.status(200).json({ user, token });
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({
            message: 'Bad request'
        })
    }
}
export const getAllUserProfiles = async (req, res) => {
    try {
        // // console.log('get all users hit');
        const users = await UserModel.find();
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found'
            })
        }
        return res.status(200).json(users)
    }
    catch (e) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        return res.status(200).json(user)

    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedUser);
    } catch (e) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const deleteUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        await UserModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: 'User deleted successfully'
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}