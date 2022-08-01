const router = require('express').Router();
const BidController = require('../controllers/bid.controller');

router.post('/', BidController.bidOrder);

module.exports = router;