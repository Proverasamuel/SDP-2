const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const corsConfig = require('./middleware/corsConfig'); // Importa o middleware
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(corsConfig);
// Rotas
app.use('/products', productRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Product Service: Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar product-service ao MongoDB:', err.message);
    process.exit(1); // Finaliza o processo em caso de erro
  });

// Iniciando o servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Product Service rodando na porta ${PORT}`));
