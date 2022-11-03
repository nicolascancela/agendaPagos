const { findUsuarioByEmail, createUsuario } = require("../repository/UsersRepository");
const { encriptarPassword } = require("./passwordManager");


async function crearNuevoUsuario(newUser) {
    const { email, password, username } = newUser;
    if (email && password && username) {
        const alreadyExists = await findUsuarioByEmail(email);
        if (alreadyExists) {
            throw new Error('El email ya está registrado.');
        } else {
            const passwordEncriptada = encriptarPassword(password);
            const user = { username, email, password: passwordEncriptada };
            return await createUsuario(user);
        }
    } else {
        throw new Error('Falta completar un campo.');
    }
}

module.exports = { crearNuevoUsuario }