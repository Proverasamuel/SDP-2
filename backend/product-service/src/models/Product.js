const mongoose = require('mongoose');

// Defina o esquema de produto
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  stock: { type: Number, required: true },
});

// Verifica se o modelo 'Product' já foi registrado, se não, registra o modelo.
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Exporte o modelo
module.exports = Product;