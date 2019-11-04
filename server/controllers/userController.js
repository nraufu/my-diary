import '@babel/polyfill';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { query } from '../models/index';
import queries from '../models/queries';
import authToken from '../middlewares/authToken';
import users from '../models/users';

dotenv.config();

class UserController {
    static async createUser(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await query(queries.getUser, [email]);
            if (user.rows.length) {
                return res.status(409).json({
                    "status": "409",
                    "error": "User Already Exists"
                });
            }
            const passwordHash = await bcrypt.hash(password, 5);
            const newUser = await query(queries.insertUser, [email, passwordHash]);

            const userInfo = newUser.rows[0];
            const data = { email: userInfo.email};
            const token = authToken(data);
            res.status(201).json({
                "status": "201",
                "message": "User Created Successfully",
                "data": {
                    token,
                }
            });
        } catch (error) {
            next(error)
        };
    }

    static async loginUser(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;

            const passwordIsValid = (pwd, userpwd) => bcrypt.compareSync(pwd, userpwd);
            const user = await users.find((userx) => userx.email === email && passwordIsValid(password, userx.password));

            if (!user || !passwordIsValid) return res.status(422).json({
                status: "422",
                message: "Username or Password is Incorrect"
            });

            const data = {
                userID: user.userId,
                email: user.email
            };
            const token = authToken(data);
            return res.status(200).json({
                "status": "201",
                "data": {
                    token
                }
            });

        } catch (error) {
            next(error);
        }
    }
}


export default UserController;