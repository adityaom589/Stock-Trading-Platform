const jwt = require('jsonwebtoken');
const createSecretToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing');
  }
  return jwt.sign({ id }, secret, { expiresIn: '1h' });
};
module.exports = { createSecretToken };
