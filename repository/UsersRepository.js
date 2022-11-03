const Usuario = require('../models/Usuario');

async function findAllUsuarios() {
    return await Usuario.find();
}

async function createUsuario(newUsuario) {
    return await Usuario.create(newUsuario);
}

async function findUsuario(idUsuario) {
    return await Usuario.find({ _id: idUsuario });
}

async function findUsuarioByEmail(emailUsuario) {
    return await Usuario.findOne({ email: emailUsuario });

}

async function findByIdAndDelete(idUsuario) {
    return await Usuario.findByIdAndRemove(idUsuario).exec();
}

module.exports = { findAllUsuarios, findUsuario, findByIdAndDelete, findUsuarioByEmail, createUsuario };