const Product = require('../models/Product');

exports.createProduct = (data) => new Product(data).save();
exports.getProducts = () => Product.find();
exports.getProductById = (id) => Product.findById(id);
exports.updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
exports.deleteProduct = (id) => Product.findByIdAndDelete(id);

// Método de inserção em massa
exports.bulkInsert = (products) => Product.insertMany(products);