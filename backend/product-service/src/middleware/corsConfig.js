const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // Permitir requisições do frontend Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

};

module.exports = cors(corsOptions);
