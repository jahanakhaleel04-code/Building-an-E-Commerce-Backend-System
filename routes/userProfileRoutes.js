import express from 'express';
const router = express.Router();
import { getUserProfile,register, getAllUserProfiles, updateUserProfile, deleteUserProfile,login } from "../controllers/userProfile.js";
import authMiddleware from '../middleware/authMiddleware.js';


router.get('/:id',authMiddleware,getUserProfile)
router.post('/register',register)
router.get('/',getAllUserProfiles)
router.put('/:id',authMiddleware,updateUserProfile)
router.delete('/:id',authMiddleware,deleteUserProfile)
router.post('/login',login)

export default router;