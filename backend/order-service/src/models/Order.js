const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  totalPrice: Number,
  status: { type: String, default: 'pending' },
}, { timestamps: true });


// Middleware para calcular o totalPrice antes de salvar o pedido
/* orderSchema.pre('save', async function (next) {
  const product = await mongoose.model('Product').findById(this.productId);
  if (product) {
    this.totalPrice = product.price * this.quantity;
  }
  next();
}); */
module.exports = mongoose.model('Order', orderSchema);
