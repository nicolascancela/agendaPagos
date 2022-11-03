const Servicio = require("./servicioService");
const { createNewPago, findPagoByIdServicioAndByIdUser, findPagoByIdUser } = require("../repository/PagosRepository");
const { Log } = require("../utils/Logger");

async function crearPago({ id_user, id_servicio, fechaPago, }) {
    try {
        validatePago(id_user, id_servicio, fechaPago);
        await validateExistingPago(id_user, id_servicio);
        const nuevoPago = { id_user, id_servicio, fechaPago };
        await createNewPago(nuevoPago).then(pago => { Log('Pago creado'); return (pago) }).catch(error => { throw error });
    } catch (error) {
        throw error;
    }

}

const validatePago = (id_user, id_servicio, fechaPago) => {
    if (!id_user || !id_servicio || !fechaPago) {
        throw new Error('Falta completar detalles del pago.');
    }
}

const validateExistingPago = async (id_user, id_servicio) => {
    const pagoExistente = await findPagoByIdServicioAndByIdUser(id_servicio, id_user);
    if (pagoExistente) {
        throw new Error('El pago ya existía.')
    }
    return;
}

async function obtenerTodosPorUsuario(id_user) {
    return await findPagoByIdUser(id_user);
}

async function obtenerTodosConDetalles(id_user){
    const servicios = await Servicio.obtenerTodosPorUsuario(id_user);
    const pagos = await obtenerTodosPorUsuario(id_user);
    const pagosConDetalle = pagos.map(pago => {
        return({
            id_pago : pago.id,
            descripcion: obtenerDescripcion(servicios, pago.id_servicio),
            fechaPago: pago.fechaPago,
        });
    });
    return pagosConDetalle;
}

const obtenerDescripcion = (servicios, id_servicio) => {
    const serviciosFiltrados = servicios.filter(servicio => servicio.id === id_servicio);
    const nombreServicio = serviciosFiltrados.at(0)?.nombre || 'Sin descripción';
    return nombreServicio;
}

module.exports = { crearPago, obtenerTodosPorUsuario, obtenerTodosConDetalles }