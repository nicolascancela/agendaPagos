const { checkearToken } = require("../services/tokenService");

function verifyToken(req, res, next) {
    const token = req.headers?.token;
    if (!token) {
        throw new Error('No se envió el token.')
    }
    if (checkearToken(token)) {
        next();
    } else {
        throw new Error('El token no es válido.');
    }
}

module.exports = verifyToken;