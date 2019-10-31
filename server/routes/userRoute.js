import express from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/validator';

const router = express.Router();


/* Create a new user */
router.post('/signup', validate.signUp, UserController.createUser);

/* Login user */
router.post('/signin', validate.signIn, UserController.loginUser);

export default router;