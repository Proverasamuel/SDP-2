const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      message: 'Pedido criado com sucesso!',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar pedido controller',
      error: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao recuperar pedidos',
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao recuperar o pedido',
      error: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({
      message: 'Status do pedido atualizado!',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao atualizar o status do pedido',
      error: error.message,
    });
  }
};

exports.getOrdersByUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
    }

    const orders = await orderService.getOrdersByUser(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'Nenhum pedido encontrado para este usuário.' });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error('Erro ao recuperar pedidos por usuário:', err.message);
    res.status(500).json({ error: err.message });
  }
};



