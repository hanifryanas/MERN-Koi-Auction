const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    type: String,
    size: Number,
    gender: String,
    price: Number,
    range: Number,
    image: String
}, {timestamps: true});
const productModel = mongoose.model('product', productSchema);

class ProductServiceModel {
    static async getAllProducts() {
        return await productModel.find();
    }
    static async getProductsByFilter(query) {
        console.log(query);
        return await productModel.find(query);
    }
    static async createProduct(newProduct) {
        return await productModel.create(newProduct);
    }
}

module.exports = ProductServiceModel;