import '@babel/polyfill';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authToken from '../middlewares/authToken';
import user from '../models/userModel';

dotenv.config();

export const users = [/* {
    userId: 1,
    firstName: 'pappy',
    lastName: 'carter',
    email: 'nraufu@gmail.com',
    password: "12453"
} */];

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

            const newUser = new user(userId, firstName, lastName, email, passwordHash);

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
                userId: user.userId,
                email: user.email,
                password: user.passwordHash
            });

        } catch (error) {
            next(error)
        };
    }

    static loginUser(req, res, next) {
        try {
            // get email and password in request body
            const {
                email,
                password
            } = req.body;

            // fetch user
            const user = users.find((userx) => userx.email === email);

            const passwordIsValid = bcrypt.compare(password, user.passwordHash);

            // if error in fetch, user does not exist - 422 || check password

            if (!user || !passwordIsValid) {
                res.status(422).json({
                    error: {
                        message: 'Email or Password is incorrect'
                    }
                });
            }

            // create token
            const data = {
                userId: user.userId,
                email: user.email
            };
            const token = authToken(data);
            res.status(200).json({
                token
            });

        } catch (error) {
            next(error);
        }
    }
}


module.exports = UserController;