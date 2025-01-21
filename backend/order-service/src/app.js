const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const corsConfig = require('./middleware/corsConfig'); // Importa o middleware
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(corsConfig);
// Rotas
app.use('/orders', orderRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Order Service: Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar order-service ao MongoDB:', err.message);
    process.exit(1); // Finaliza o processo em caso de erro
  });
// Iniciando o servidor
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Order Service rodando na porta ${PORT}`));
