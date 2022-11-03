const express = require('express');
const pagosService = require('../services/pagoService');
const router = express.Router();

router.post('/pago', async function (req, res, next) {
    const nuevoPago = req.body?.pago;
    try {
        if (nuevoPago) {
            const pago = await pagosService.crearPago(nuevoPago);
            res.send(pago).status(200);
        }
        else {
            throw new Error('El pago no existe.');
        }
    } catch (error) {
        next(error);
    }
});

router.get('/pagos', async function (req, res, next) {
    const id_user = req.query?.id_user;
    try {
        if (id_user) {
            const pagos = await pagosService.obtenerTodosPorUsuario(id_user);
            res.send(pagos).status(200);
        } else {
            throw new Error('Se requiere el id_user para obtener los pagos del usuario.');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;