import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true      
    },
    category:{
        type:String,
        required:true       
    }

})

export const ProductModel = mongoose.model('Product',productSchema)