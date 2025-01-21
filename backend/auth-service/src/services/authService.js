const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '16062002'; // Use um valor seguro em produção

exports.register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  return user.save();
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email não encontrado');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Senha incorreta');

  // Gerar token
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

exports.validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return !!decoded;
  } catch (error) {
    return false;
  }
};

