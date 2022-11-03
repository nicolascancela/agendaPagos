const { findUsuarioByEmail } = require("../repository/UsersRepository");
const { Log } = require("../utils/Logger");
const { compararPasswords } = require("./passwordManager");

async function loginUser(userToLogIn) {
    validateUser(userToLogIn);
    const existingUser = await findUsuarioByEmail(userToLogIn.email);
    if (existingUser !== null) {
        chequearPassword(userToLogIn.password, existingUser.password);
        return existingUser;
    }
    else {
        throw new Error('El usuario no existe, asegurate de haber ingresado correctamente el correo electrónico.');
    }
}

function chequearPassword(userToLogInPassword, existingUserPassword) {
    if (compararPasswords(userToLogInPassword, existingUserPassword)) {
        Log('Usuario logueado exitosamente.')
        return true;
    } else {
        throw new Error('La contraseña ingresada es incorrecta.');
    }
}

function validateUser(userToLogIn) {
    const { email, password } = userToLogIn;
    if (email && password) {
        return true;
    } else {
        throw new Error('Faltan datos para loguear al usuario.');
    }
}

module.exports = loginUser;