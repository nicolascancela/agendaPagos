const express = require('express');
const dbServices = require('../repository/PagosRepository');
const dbUsers = require('../repository/UsersRepository');
const { crearPago, obtenerTodosConDetalles } = require('../services/pagoService');
const router = express.Router();
const Servicios = require('../services/servicioService');

router.get('/services', async function (req, res) {
    const filter = req.query.name || '';
    const result = filter ? await dbServices.findPago(filter) : await Servicios.obtenerTodos();
    res.send(result);
});

router.get('/details/:id_user', async function(req, res){
    const id_user = req.params?.id_user;
    const response = await obtenerTodosConDetalles(id_user);
    res.send(response);
});

router.get('/service', async function (req, res) {
    const id = req.query.idPago;
    const result = await dbServices.findPago(id);
    res.send(result);
});

router.post('/service', async function (req, res) {
    const newService = req.body?.service;
    if (newService) {
        const result = await dbServices.createNewPago(newService);
        res.send(result);
    } else {
        res.send({});
    }
});

router.delete('/service', async function (req, res) {
    if (!req.query)
        return res.send("No se envio el id del servicio a eliminar").status(400);

    if (!req.query.idPago)
        return res.send("No se envio el id del servicio a eliminar")

    if (req.query.idPago === "" || req.query.idPago === " ") {
        res.send("ID del servicio vacio")
    } else {
        const idPago = req.query.idPago;
        const result = await dbServices.findByIdAndDelete(idPago);
        const resStatus = result !== null ? 200 : 400;
        res.status(resStatus).send(result);
    }
});

router.get('/user', async function (req, res) {
    const id = req.query.idUsuario;
    const result = await dbUsers.findUsuario(id);
    res.send(result);
});

router.get('/users', async function (req, res) {
    const result = await dbUsers.findAllUsuarios();
    res.send(result);
});

router.post('/pago', async function (req, res, next) {
    const nuevoPago = req.body?.pago;
    try {
        if (nuevoPago) {
            const pago = await crearPago(nuevoPago);
            res.send(pago).status(200);
        }
        else {
            throw new Error('El pago no existe.');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;