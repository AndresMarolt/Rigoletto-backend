import { Router } from "express";
import { createItem, deleteImg, deleteItem, fetchAll, fetchItemsByCategory, fetchItemsById, updateItem } from "../controllers/items.js";
import upload from "../middleware/multer.js";
import {adminProtect} from "../middleware/auth.js";

const router = Router();

router.get('/:id', fetchItemsById);
router.get('/category/:category', fetchItemsByCategory);
router.post('', adminProtect, upload.single("img"), createItem);

// router.post('/item', adminProtect, upload.single("img"), createItem);    ESTA ESTÁ DE MÁS
router.put('/:id', adminProtect, upload.single("img"), updateItem);
router.delete('/:id', adminProtect, deleteItem);
router.delete('/img/:img', adminProtect, deleteImg);


export default router;