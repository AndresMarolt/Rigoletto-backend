import express from 'express'
import { createUser, getUser, loginUser } from '../controllers/authUser.js';
import { userProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/me', userProtect, getUser);

export default router;