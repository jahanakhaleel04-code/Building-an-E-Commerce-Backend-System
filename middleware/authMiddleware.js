import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const token = authHeader.split(' ')[1];
    //    console.log(token)
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded+"decoded")
        const user = await UserModel.findById(decoded.id).select("-password");
        console.log(user);
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        req.user = user;

        next();
    } catch (e) {
        console.log('AUTH ERROR:', e);
        return res.status(401).json({

            message: 'Invalid token'
        })
    }

}
export const isAdmin = (role) => {
    return (req, res, next) => {
        console.log(req.user)
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({
                message: 'Forbidden: Admin access only'
            });
        }
    };
};