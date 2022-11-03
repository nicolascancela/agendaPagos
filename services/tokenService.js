const ENV = require('../utils/enviroment');
const jwt = require('jsonwebtoken');
const { saveNewRefreshToken, FindRefreshTokenByUserId } = require('../repository/RefreshTokensRepository');
const TOKEN_SECRET = ENV.TOKEN_SECRET;
const JWT_EXPIRY_SECONDS = ENV.JWT_EXPIRY_SECONDS;
const JWT_REFRESH_EXPIRY_SECONDS = ENV.JWT_REFRESH_EXPIRY_SECONDS;


async function generarToken(usuarioLogueado) {
    return jwt.sign({ email: usuarioLogueado.email, id: usuarioLogueado.id }, TOKEN_SECRET, { expiresIn: JWT_EXPIRY_SECONDS, algorithm: "HS256", });
}

async function guardarRefreshToken(usuarioLogueado) {
    const existingRefreshToken = await FindRefreshTokenByUserId(usuarioLogueado.id);
    if (!existingRefreshToken) {
        console.log('El token no existía, creo uno nuevo');
        const refreshToken = jwt.sign({ email: usuarioLogueado.email, id: usuarioLogueado.id }, TOKEN_SECRET, { expiresIn: JWT_EXPIRY_SECONDS + 800000, algorithm: "HS256", });
        const newRefresh = { id_user: usuarioLogueado.id, token: refreshToken }
        await saveNewRefreshToken(newRefresh);
        return refreshToken;
    } else {
        console.log('El token ya existía es: ' + existingRefreshToken.token);
        return existingRefreshToken.token;
    }

}

function checkearToken(userToken) {
    return jwt.verify(userToken, TOKEN_SECRET);
}

module.exports = { generarToken, checkearToken, guardarRefreshToken };