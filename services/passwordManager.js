const bcrypt = require('bcrypt');

function encriptarPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function compararPasswords(password, passwordEncriptada) {
    return bcrypt.compareSync(password, passwordEncriptada);
}

module.exports = { encriptarPassword, compararPasswords }