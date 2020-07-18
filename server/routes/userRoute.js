import express from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/validator';

const router = express.Router();


router.post('/signup', validate.signUp, UserController.createUser);
router.post('/signin', validate.signIn, UserController.loginUser);

export default router;