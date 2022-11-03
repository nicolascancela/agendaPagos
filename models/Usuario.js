const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
}, { versionKey: false })

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (anotherPassowrd) {
    return bcrypt.compareSync(this.password, anotherPassowrd);
};

module.exports = mongoose.model('usuario', userSchema);