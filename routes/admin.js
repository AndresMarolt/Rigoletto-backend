import express from 'express'
import { loginAdmin, createAdmin } from '../controllers/authAdmin.js';

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', loginAdmin);

export default router;