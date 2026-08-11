import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import {auth,isAdmin} from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/',auth,isAdmin('admin'),upload.single("image"),createProduct)
 
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.put('/:id',auth,isAdmin('admin'),updateProduct)
router.delete('/:id',auth,isAdmin('admin'),deleteProduct)

export default router;