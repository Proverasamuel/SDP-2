const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const corsConfig = require('./middleware/corsConfig'); // Importa o middleware
require('dotenv').config();

const app = express();

// Middlewares

// Configuração do middleware
app.use(corsConfig);
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Auth Service: Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar auth-service ao MongoDB:', err.message);
    process.exit(1); // Finaliza o processo em caso de erro
  });


// Iniciando o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth Service rodando na porta ${PORT}`));
