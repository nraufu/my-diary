import '@babel/polyfill';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authToken from '../middlewares/authToken';
import User from '../models/userModel';

dotenv.config();

export const users = [
    /* {
        userId: 1,
        firstName: 'pappy',
        lastName: 'carter',
        email: 'nraufu@gmail.com',
        password: "12453"
    } */
];

class UserController {
    static users = [];

    static createUser(req, res, next) {
        try {
            //increase user id 
            const userId = users.length + 1;

            // get email and password in request body
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            // check if user already exists - 409
            const emailExists = users.find((user) => user.email === req.body.email);
            if (emailExists) {
                res.status(409).json({
                    error: {
                        message: 'User already exists. Please login.'
                    }
                });
            }

            // hash the password
            const passwordHash = bcrypt.hash(password, 5);

            // create newUser

            const newUser = new User(userId, firstName, lastName, email, passwordHash);

            //creating a new token 
            const data = {
                userId,
                email: newUser.email
            };
            const token = authToken(data);
            users.push(newUser);

            // signed token - 201
            res.status(201).json({
                token,
                userId: newUser.userId,
                email: newUser.email,
                password: newUser.passwordHash
            });

        } catch (error) {
            next(error)
        };
    }

   
}


module.exports = UserController;