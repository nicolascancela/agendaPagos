const ServicioRepository = require('../repository/ServicioRepository');

async function obtenerTodos(){
    return await ServicioRepository.getAll();
}

async function obtenerTodosPorUsuario(id_user){
    return await ServicioRepository.getAllByUser(id_user); 
}

module.exports = {obtenerTodos, obtenerTodosPorUsuario};