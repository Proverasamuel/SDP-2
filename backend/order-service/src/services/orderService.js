const Order = require('../models/Order');  // Modelo de pedido
const axios = require('axios');

// Função para criar um novo pedido
exports.createOrder = async (data) => {
  try {
    const { productId, userId, quantity } = data;

    // Verificar o produto no serviço de produtos
    const productResponse = await axios.get(`http://localhost:5003/products/${productId}`);
    if (!productResponse.data) {
      throw new Error('Produto não encontrado');
    }
    const product = productResponse.data;

    // Verificar o usuário no serviço de auth
    const userResponse = await axios.get(`http://localhost:5001/auth/users/${userId}`);
    if (!userResponse.data) {
      throw new Error('Usuário não encontrado');
    }
    const user = userResponse.data;

    // Criar o pedido
    const totalPrice = product.price * quantity;
    const newOrder = new Order({ productId, userId, quantity, totalPrice, status: 'pending' });
    await newOrder.save();
    return newOrder;
  } catch (err) {
    console.error('Erro ao criar pedido:', err.message);
    throw err;
  }
};

// Função para recuperar todos os pedidos
exports.getOrders = async () => {
  return await Order.find();
};

// Função para recuperar um pedido por ID
exports.getOrderById = async (id) => {
  return await Order.findById(id);
};

// Função para atualizar o status de um pedido
exports.updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

// Função para recuperar todos os pedidos de um determinado usuário
exports.getOrdersByUser = async (userId) => {
  try {
    return await Order.find({ userId });
  } catch (err) {
    console.error('Erro ao recuperar pedidos por usuário:', err.message);
    throw err;
  }
};
