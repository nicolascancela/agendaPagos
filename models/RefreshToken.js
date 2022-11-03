const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    id_user: String,
    token: String
});

module.exports = mongoose.model('refreshToken', refreshTokenSchema);