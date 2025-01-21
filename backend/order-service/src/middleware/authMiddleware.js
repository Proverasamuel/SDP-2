const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Substitua pela sua chave secreta
    req.userId = decoded.id; // Associa o userId decodificado ao objeto da requisição
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token order' });
  }
};

module.exports = authMiddleware;
