const Pago = require('../models/Pago');

async function findAllPagos() { return await Pago.find() }
async function createNewPago(newPago) { return await Pago.create(newPago) }
async function findPago(idPago) { return await Pago.find({ _id: idPago }) }
async function findPagoByIdUser(id_user) { return await Pago.find({ id_user }) }
async function findPagoByIdServicio(idServicio) { return await Pago.find({ idServicio }) }
async function findPagoByIdServicioAndByIdUser(id_user, idServicio) { return await Pago.find({ $and: [{ id_user }, { idServicio }] }) }
async function findByIdAndDelete(idPago) { return await Pago.findByIdAndRemove(idPago).exec() }

module.exports = { findAllPagos, findPago, findByIdAndDelete, findPagoByIdUser, findPagoByIdServicio, findPagoByIdServicioAndByIdUser, createNewPago };