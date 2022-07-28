const multer = require('multer');

var storage = multer.diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

var checkFileType = (file, cb) => {
    (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') ? cb(null, true) : cb(null, false);
}

var uploadImage = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
})

module.exports = uploadImage;