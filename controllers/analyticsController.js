import { UserActivityModel } from "../models/userActivity.js";
import { ProductModel } from "../models/product.js";

export const userActivity = async (req, res) => {
    try {
        const { action, productId } = req.body;
        const savedActivity = await UserActivityModel.create({
            user: req.user._id,
             action,
            products: productId
        })

        res.status(201).json({
            message: 'User activity recorded successfully',
            activity: savedActivity
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to record user activity', error: error.message });
    }
}


export const getRecommendations = async (req, res) => {

    try {

        const userId = req.user.id;

        const activities =
            await UserActivityModel.find({
                user: userId
            }).populate('products');

        const categories =
            activities.map(
                item => item.products.category
            );

        const recommendedProducts =
            await ProductModel.find({

                category: {
                    $in: categories
                },
                _id: {
                    $nin: productIds
                }

            }).limit(5);

        res.status(200).json(
            recommendedProducts
        );

    } catch (e) {

        res.status(500).json({
            message: e.message
        });
    }
}