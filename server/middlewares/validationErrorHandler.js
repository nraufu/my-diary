import { validationResult } from 'express-validator';

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const messages = errors.array().map((error) => {
      const { param, msg: message } = error;
      return { param, message };
    });
    res.status(400).json({ error: messages });
  }
};

module.exports = errorHandler;