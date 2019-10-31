import '@babel/polyfill';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authToken from '../middlewares/authToken';
import users from '../models/users';


dotenv.config();


class UserController {

    static async createUser(req, res, next) {
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
            const emailExists = await users.find((user) => user.email === req.body.email);
            if (emailExists) {
                res.status(409).json({
                    "status": "409",
                    "error": "User Already Exists"
                });
            }

            // hash the password
            const passwordhash = await bcrypt.hash(password, 5);

            // create newUser

            const newUser = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: passwordhash
            };

            users.push(newUser);

            //creating a new token 
            const data = {
                userId,
                email
            };
            const token = authToken(data);


            // signed token - 201
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
            // get email and password in request body
            const {
                email,
                password
            } = req.body;

            const passwordIsValid = (pwd, userpwd) => bcrypt.compareSync(pwd, userpwd);
            // fetch user
            const user = await users.find((userx) => userx.email === email && passwordIsValid(password, userx.password));


            // if error in fetch, user does not exist - 422 || check password

            if (!user || !passwordIsValid) {
                res.status(422).json({
                    status: "422",
                    message: "Username or Password is Incorrect"
                });
            }

            // create token
            const data = {
                userID: user.userId,
                email: user.email
            };

            const token = authToken(data);

            res.status(200).json({
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