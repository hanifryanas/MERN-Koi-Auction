const ProductServiceModel = require('../models/product.model');
const multer = require('multer');

class ProductController {
    static async getProducts(req, res) {
        const { Type, Size, Gender, Price } = req.query;
        let query = {};
        (Type) && (query.type = Type);
        (Gender) && (query.gender = Gender);
        if(Size) {
            switch(Size.charAt(0)) {
                case 'M':
                    query.size = { $lt: 25 };
                    break;
                case 'S':
                    query.size = { $gte: 25, $lte: 40 };
                    break;
                case 'L':
                    query.size = { $gt: 40, $lte: 60 };
                    break;
                case 'J':
                    query.size = { $gt: 60 };
                    break;
            }
        }
        if(Price) {
            switch(Price.charAt(7)) {
                case '0':
                    query.price = { $lt : 10000000 };
                    break;
                case ' ':
                    if(Price.charAt(6) === '1') {
                    query.price = { $lt : 1000000 };
                    }
                    else {
                        query.price = { $lt : 5000000 };
                    }
                    break;
            }
        }
        (query === {}) ?
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
        :
        ProductServiceModel.getProductsByFilter(query)
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
        const { Type, Size, gender, price, range } = req.body;
        let newProduct = {
            Type,
            Size,
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
