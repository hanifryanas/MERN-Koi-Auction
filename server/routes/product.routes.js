const router = require('express').Router();
const ProductController = require('../controllers/product.controller');
const uploadImage = require('../middleware/uploadImage');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', uploadImage.single('image'), ProductController.createProduct);
router.put('/:id', uploadImage.single('image'), ProductController.updateProduct);
router.put('/:id/price', ProductController.updatePriceByBidOrder);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;