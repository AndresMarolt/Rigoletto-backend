import express from 'express'
import { createUser, loginUser } from '../controllers/authUser.js';

const route = express.Router();

route.post('/signup', createUser);
route.post('/login', loginUser);

export default route;