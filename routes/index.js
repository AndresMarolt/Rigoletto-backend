import { Router } from "express";
import { createItem, deleteImg, deleteItem, fetchAll, fetchItemsByCategory, fetchItemsById, updateItem } from "../controllers/items.js";
import itemRoutes from './items.js'
import adminAuthRoutes from './admin.js'
import userAuthRoutes from './user.js'
import cartRoutes from './cart.js'

const router = Router();

router.use('/item', itemRoutes)
router.use('/admin', adminAuthRoutes)
router.use('/user', userAuthRoutes)
router.use('/cart', cartRoutes)

export default router;