import express from 'express'
import { addCartItem, deleteCartItem, createCart, fetchCart, updateCartItem } from '../controllers/cart.js';
const router = express.Router();

router.post('/', createCart);
router.get('/user/:userId', fetchCart);
router.put('/add-item', addCartItem);
router.put('/update-item', updateCartItem);
router.put('/delete-item/:itemId', deleteCartItem);

export default router