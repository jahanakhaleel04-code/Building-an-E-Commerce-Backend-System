import express from 'express'
import { userActivity,getRecommendations } from '../controllers/analyticsController.js'
import {auth} from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/', auth, userActivity)
router.get('/recommendations', auth, getRecommendations)
export default router