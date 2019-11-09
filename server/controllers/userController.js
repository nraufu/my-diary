import '@babel/polyfill';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { query } from '../models/index';
import queries from '../models/queries';
import authToken from '../helpers/authToken';

dotenv.config();

class UserController {
    static async createUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await query(queries.getUser, [email]);
            if (user.rows.length) return res.status(409).json({"status": "409", "error": "User Already Exists"});
            const passwordHash = await bcrypt.hash(password, 5);
            const newUser = await query(queries.insertUser, [email, passwordHash]);

            const userInfo = newUser.rows[0];
            const data = { email: userInfo.email };
            const token = authToken(data);
            res.status(201).json({ "status": "201", "message": "User Created Successfully",
                "data": {
                    token
                }
            });
        } catch (error) {
            next(error)
        };
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await query(queries.getUser, [email]);
            if (!user.rows.length) return res.status(400).json({ status: "400", error: "Username Doesn't Exist" });
            const passwordIsValid = await bcrypt.compareSync(password, user.rows[0].password);
            if (!passwordIsValid) return res.status(400).json({ status: "400", error: "Password is Incorrect" });

            const data = { email: user.rows[0].email };
            const token = authToken(data);
            return res.status(200).json({ "status": "200", "message": "Logged In Successfully With",
                "data": {
                    email: `${user.rows[0].email}`,
                    token
                }
            });

        } catch (error) {
            next(error);
        }
    }
}


export default UserController;