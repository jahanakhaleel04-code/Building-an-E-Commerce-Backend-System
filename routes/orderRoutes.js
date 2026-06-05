import express from 'express'
import { createOrder, getOrdersByUser } from '../controllers/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/',authMiddleware, createOrder)
router.get('/:userId', authMiddleware, getOrdersByUser)

export default router