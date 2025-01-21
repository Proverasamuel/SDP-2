const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // Registro
router.post('/login', authController.login);       // Login
router.post('/validate', authController.validateToken); // Validação de Token
// Rota para pegar um usuário pelo ID
router.get('/users/:id', authController.getUserById); // Adiciona a rota para pegar o usuário pelo ID

module.exports = router;
