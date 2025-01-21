const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');

// Rota para criar pedido
router.post('/', ordersController.createOrder);

// Rota para obter todos os pedidos
router.get('/', ordersController.getOrders);

// Rota para obter um pedido por ID
router.get('/:id', ordersController.getOrderById);

// Rota para atualizar o status de um pedido
router.put('/:id/status', ordersController.updateOrderStatus);

// Rota para obter todos os pedidos de um usuário específico
router.get('/user/:userId', ordersController.getOrdersByUserController);


module.exports = router;
