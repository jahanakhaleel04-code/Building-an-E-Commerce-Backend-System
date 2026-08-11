import { ProductModel } from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

 export const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body
        console.log(req.body)
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            })
        }

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "products"
                },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }
            )

            stream.end(req.file.buffer)
        })

        const product = await ProductModel.create({
            name,
            price,
            category,
            image: result.secure_url
        })

        return res.status(201).json({
            message: "Product created successfully",
            product
        })

    } catch (e) {

        console.error(e)

        return res.status(400).json({
            message: "Bad request"
        })
    }
}
 

export const getAllProducts = async (req, res) => {
    const { name , category , search , sort } = req.query;
    let filter = {}

    //filter by name and cat
    if (name) {
        filter.name = { $regex: name, $options: 'i' }
    }
    if (category) {
        filter.category = { $regex: category, $options: 'i' }
    }
    //search in name and category
    if(search){
        filter.$or = [
            {name: {$regex: search, $options: 'i'}},
            {category: {$regex: search, $options:'i'}}
        ]
    }
    // console.log(filter)
    //sort
      let sortOption = {};

        if (sort === "price_asc") {
            sortOption.price = 1;
        }
        else if (sort === "price_desc") {
            sortOption.price = -1;
        }
        else if (sort === "name_asc") {
            sortOption.name = 1;
        }
        else if (sort === "name_desc") {
            sortOption.name = -1;
        }
    const products = await ProductModel
            .find(filter)
            .sort(sortOption);

    
    if (products.length === 0) {
        return res.status(404).json({
            message: 'No products found'
        })
    }
    return res.status(200).json({
        message: 'Products fetched successfully',
        products
    })
}

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        return res.status(200).json({
            message: 'Product found',
            product
        })
    }
    catch (e) {
        return res.status(400).json({
            message: 'Bad request'
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json({
            message: 'product updated successfully',
            product: updatedProduct
        })
    }
    catch (e) {
        return res.status(400).json({
            message: 'Bad request'
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const prodcut = await ProductModel.findById(req.params.id)
        if (!prodcut) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        await ProductModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: 'Product deleted successfully'
        })
    }
    catch (e) {
        return res.status(400).json({
            message: 'Bad request'
        })
    }
}