const UserServiceModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    static async register(req, res) {
        const { username, email, address, phone, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            email,
            address,
            phone,
            password: hashPassword
        }
        const user = await UserServiceModel.findUserByUsername(username);
        const userEmail = await UserServiceModel.findUserByEmail(email);
        if (user) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }
        else if (userEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        else {
            UserServiceModel.registerUser(newUser)
            .then(() => {
                res.status(201).json({
                    message: 'User created'
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        }
    }
    static async login(req, res) {
        const { usernameEmail, password } = req.body;
        let user = await UserServiceModel.findUserByUsername(usernameEmail);
        (!user) ? user = await UserServiceModel.findUserByEmail(usernameEmail) : null;
        (!user) ? res.status(400).json({message: 'Username or Email did not exist'}) :
        bcrypt.compare(password, user.password , (err, result) => {
            if (err) {
                res.status(500).json({
                    message: err
                });
            }
            else if (result) {
                const token = jwt.sign({
                    username: user.username,
                    phone: user.phone
                }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({
                    message: 'Login Success!',
                    token: token
                });
            }
            else {
                res.status(400).json({
                    message: 'Password incorrect'
                });
            }
        }
        );
    }
    static async changePassword(req, res) {
        const { oldPassword, newPassword } = req.body;
        const username = req.params.username;
        const user = await UserServiceModel.findUserByUsername(username);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        if (!user) {
            return res.status(400).json({
                message: 'Username did not exist'
            });
        }
        bcrypt.compare(oldPassword, user.password, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: err
                });
            }
            else if (result) {
                UserServiceModel.changePassword(username, hashPassword)
                .then(() => {
                    res.status(200).json({
                        message: 'Password changed'
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: err
                    });
                }
                );
            }
            else {
                res.status(400).json({
                    message: 'Wrong Password'
                });
            }
        }
        );
    }
}

module.exports = UserController;