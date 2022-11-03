const Token = require('../models/RefreshToken');

async function FindRefreshTokenByUserId(idServicio) { return await Token.findOne({ idServicio }) }
async function saveNewRefreshToken(newRefreshToken) { return await Token.create(newRefreshToken) }

module.exports = { FindRefreshTokenByUserId, saveNewRefreshToken }