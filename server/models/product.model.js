const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    type: String,
    length: Number,
    gender: String,
    price: Number,
    range: Number,
    date: String,
    image: String
}, {timestamps: true});
const productModel = mongoose.model('product', productSchema);

class ProductServiceModel {
    static async getAllProducts() {
        return await productModel.find({}).where('date').gt(new Date().toISOString()).sort({date: 1});
    }
    static async getProductsByFilter(query) {
        return await productModel.find(query).where('date').gt(new Date().toISOString()).sort({date: 1});
    }
    static async getProductById(id) {
        return await productModel.findOne({_id: id});
    }
    static async createProduct(newProduct) {
        return await productModel.create(newProduct);
    }
    static async updateProduct(id, product) {
        return await productModel.findByIdAndUpdate(id, product);
    }
    static async updatePriceByBidOrder(id, orderPrice) {
        return await productModel.findByIdAndUpdate(id, {price: orderPrice});
    }
    static async deleteProduct(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

module.exports = ProductServiceModel;