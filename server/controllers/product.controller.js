const ProductServiceModel = require('../models/product.model');
const multer = require('multer');

class ProductController {
    static async getAllProducts(req, res) {
        ProductServiceModel.getAllProducts()
        .then((products) => {
            products.forEach((product) => {
                product.image = `${process.env.API}/${product.image}`;
            }),
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
        .finally(() => {
            res.end();
        })
    }
    
    static async createProduct(req, res) {
        const { type, size, gender, price, range } = req.body;
        let newProduct = {
            type,
            size,
            gender,
            price,
            range
        }
        if(req.file){
            newProduct.image = req.file.path;
        } 
        ProductServiceModel.createProduct(newProduct)
        .then(() => {
            res.status(201).json({
                message: 'Product created'
            });
        }).catch((err) => {
            res.status(500).json({
                message: err
            });
        });
    }
}

module.exports = ProductController;
