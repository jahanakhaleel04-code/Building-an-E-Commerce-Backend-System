import express from 'express'
import { createOrder, getOrdersByUser } from '../controllers/orderController.js'
import {auth,isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/',auth, createOrder)
router.get('/:userId', auth, getOrdersByUser)

export default router