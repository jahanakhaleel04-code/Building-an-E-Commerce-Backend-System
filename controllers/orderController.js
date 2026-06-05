import { OrderModel } from "../models/order.js";

export const createOrder = async (req, res) => {
    try {
        // console.log(req.user)
        const {  products } = req.body;
        const order = new OrderModel({
            user: req.user.id,
            products
        })
        const savedOrder = await order.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
}

export const getOrdersByUser = async (req,res) =>{
    const userID = req.params.userId;
    try{
        const orders = await OrderModel.find({user:userID}).populate('products.product');
        return res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
}