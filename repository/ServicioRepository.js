const Servicio = require('./../models/Servicio');

async function getAll(){
    return await Servicio.find();
}

async function getAllByUser(id_user){
    return await Servicio.find({id_user});
}

async function create(nuevoServicio){
    return await Servicio.create(nuevoServicio);
}

module.exports = {getAll, getAllByUser, create};