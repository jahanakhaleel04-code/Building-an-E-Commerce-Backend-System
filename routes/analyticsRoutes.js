import express from 'express'
import { userActivity,getRecommendations } from '../controllers/analyticsController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/', authMiddleware, userActivity)
router.get('/recommendations', authMiddleware, getRecommendations)
export default router