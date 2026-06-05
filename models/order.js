    import mongoose, { mongo } from "mongoose";

    const orderSchema = mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        products:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
                },
                quantity:{
                    type:Number,
                }
            }
        ]
        

    })

    export const OrderModel = mongoose.model('Order',orderSchema)   