const router = require('express').Router();
const ProductController = require('../controllers/product.controller');
const uploadImage = require('../middleware/uploadImage');

router.get('/', ProductController.getAllProducts);
// add get with specified data filter 
router.get('/:type', ProductController.getProductByType);
router.post('/', uploadImage.single('image'), ProductController.createProduct);

module.exports = router;