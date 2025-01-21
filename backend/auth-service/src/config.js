module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service',
  };
  