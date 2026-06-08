import express from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    const token =  authHeader.split(' ')[1];
   try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user =decoded;
        next();
   }catch(e){
    // console.log(e)
    return res.status(401).json({
        
        message:'Invalid token'
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