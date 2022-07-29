const router = require('express').Router();
const ProductController = require('../controllers/product.controller');
const uploadImage = require('../middleware/uploadImage');

router.get('/', ProductController.getProducts);
router.post('/', uploadImage.single('image'), ProductController.createProduct);

module.exports = router;