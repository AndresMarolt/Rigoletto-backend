import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

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

export default upload;