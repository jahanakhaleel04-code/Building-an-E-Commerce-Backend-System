import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    action: {
        type: String,
        enum: ['viewed', 'purchased']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const UserActivityModel = mongoose.model('UserActivity', userActivitySchema)  