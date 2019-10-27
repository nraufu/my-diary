import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authToken = (data) => {
  const jwtSecret = process.env.SECRET_KEY;
  const options = { expiresIn: '1d' };
  return jwt.sign(data, jwtSecret, options);
};

module.exports = authToken;
