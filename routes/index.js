import { Router } from "express";
import { createItem, deleteImg, deleteItem, fetchAll, fetchItemsByCategory, fetchItemsById, updateItem } from "../controllers/items.js";
import auth from '../middleware/auth.js'
import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

// img filter

const isImg = (req, file, callback) => {
    if(file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(null, Error("Only image is allowed"))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: isImg
})

const router = Router();

// -------------------------------------------------------------------------------------------------------------

router.get('/item/:id', fetchItemsById);
router.get('/items/category/:category', fetchItemsByCategory);
router.post('/item', /* auth,  */upload.single("img"), createItem);
router.put('/item/:id', upload.single("img"), updateItem);
router.delete('/item/:id', deleteItem);
router.delete('/item/img/:img', deleteImg);

router.post('/item', /* auth,  */upload.single("img"), createItem);

export default router;