import express from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/validator';
import errorHandler from '../middlewares/validationErrorHandler';

const router = express.Router();


/* Create a new user */
router.post('/signup', validate.signUp, errorHandler, UserController.createUser);

/* Login user */
router.post('/login', validate.signIn, errorHandler, UserController.loginUser);

module.exports = router;