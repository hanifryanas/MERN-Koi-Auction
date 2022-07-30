const router = require('express').Router();
const ProductController = require('../controllers/product.controller');
const uploadImage = require('../middleware/uploadImage');

router.get('/', ProductController.getProducts);
router.post('/', uploadImage.single('image'), ProductController.createProduct);
router.put('/:id', uploadImage.single('image'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;