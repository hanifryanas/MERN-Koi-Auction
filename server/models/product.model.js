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
    static async createProduct(newProduct) {
        return await productModel.create(newProduct);
    }
}

module.exports = ProductServiceModel;