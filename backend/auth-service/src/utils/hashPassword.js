const bcrypt = require('bcrypt');

exports.hashPassword = (password) => bcrypt.hash(password, 10);
