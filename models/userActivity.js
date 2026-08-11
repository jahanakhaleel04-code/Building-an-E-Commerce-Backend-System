import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    action: {
        type: String,
        enum: ['viewed', 'purchased'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const UserActivityModel = mongoose.model('UserActivity', userActivitySchema)  