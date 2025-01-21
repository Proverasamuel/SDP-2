const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const corsConfig = require('./middleware/corsConfig'); // Importa o middleware
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(corsConfig);
// Rotas
app.use('/users', userRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('User Service: Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Finaliza o processo em caso de erro
  });

// Iniciando o servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`User Service rodando na porta ${PORT}`));
