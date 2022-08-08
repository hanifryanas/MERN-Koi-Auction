const router = require('express').Router();
const BidController = require('../controllers/bid.controller');

router.post('/', BidController.bidOrder);
router.get('/:id', BidController.getBidOrders);

module.exports = router;