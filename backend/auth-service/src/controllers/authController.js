const authService = require('../services/authService');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Adicione esta linha

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Chamando o service de login que já gera o token
    const token = await authService.login(req.body);
    
    // O token já contém o userId, mas se quiser, pode extrair e enviar separadamente
    const decodedToken = jwt.decode(token); // Decodifica o token JWT para acessar o userId
    const userId = decodedToken.id; // Aqui está o userId do payload do token

    res.status(200).json({ token, userId }); // Retorna tanto o token quanto o userId
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


exports.validateToken = async (req, res) => {
  try {
    const isValid = await authService.validateToken(req.body.token);
    res.status(200).json({ valid: isValid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para pegar o usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtém o ID do parâmetro da URL
    const user = await User.findById(userId); // Busca o usuário no banco de dados

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user); // Retorna o usuário encontrado
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};