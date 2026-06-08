import express from 'express';
const router = express.Router();
import { getUserProfile,register, getAllUserProfiles, updateUserProfile, deleteUserProfile,login } from "../controllers/userProfile.js";
import {auth,isAdmin} from '../middleware/authMiddleware.js';


router.get('/:id',auth,getUserProfile)
router.post('/register',register)
router.get('/',getAllUserProfiles)
router.put('/:id',auth,updateUserProfile)
router.delete('/:id',auth,deleteUserProfile)
router.post('/login',login)

export default router;