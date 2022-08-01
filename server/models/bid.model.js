const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user: String,
    username: String,
    product: String,
    price: Number,
    status: String
}, {timestamps: true});
const orderModel = mongoose.model('order', orderSchema);

class OrderServiceModel{
    static async createOrder(order){
        return orderModel.create(order);
    }
    static async getOrders(){
        return orderModel.find();
    }
    static async getOrderById(id){
        return orderModel.findById(id);
    }
    static async updateOrder(id, order){
        return orderModel.findByIdAndUpdate(id, order);
    }
    static async deleteOrder(id){
        return orderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderServiceModel;
