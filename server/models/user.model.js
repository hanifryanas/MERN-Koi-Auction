const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    email: String,
    address : String,
    phone : String,
    password: String
});
const userModel = mongoose.model('user', userSchema);

class UserServiceModel {
    static async findUserByUsername(username) {
        return await userModel.findOne({ username : username });
    }
    static async findUserByEmail(email) {
        return await userModel.findOne({ email : email });
    }
    static async registerUser(user) {
        return await userModel.create(user);
    }
    static async changePassword(username, password) {
        return await userModel.findOneAndUpdate({ username : username }, { password : password });
    }
    static async deleteUser(username) {
        return await userModel.deleteOne({ username : username });
    }
}

module.exports = UserServiceModel

