const OrderServiceModel = require('../models/bid.model');

class BidController {
    static async bidOrder(req, res) {
        const { user, username, product, price, status } = req.body;
        const newOrder = {
            user,
            username,
            product,
            price,
            status
        }
        OrderServiceModel.createOrder(newOrder)
        .then(() => {
            res.status(201).json({
                message: 'Order created'
            });
        }).catch((err) => {
            res.status(500).json({
                message: err
            });
        })
    }
    static async getBidOrders(req, res) {
        const { id } = req.params;
        OrderServiceModel.getBidOrdersById(id)
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            });
        })
    }
}

module.exports = BidController;