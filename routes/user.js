const express = require('express');
const loginUser = require('../services/loginService');
const { generarToken, guardarRefreshToken } = require('../services/tokenService');
const { crearNuevoUsuario } = require('../services/userService');
const router = express.Router();

router.post('/signup', async function (req, res, next) {
    const newUser = req.body?.user;
    if (newUser) {
        try {
            const result = await crearNuevoUsuario(newUser);
            res.send(result);
        } catch (error) {
            next(error)
        }
    }
    else {
        next(new Error('El usuario esta vacio.'));
    }
});

router.post('/login', async function (req, res, next) {
    const user = req.body?.user;
    try {
        if (user) {
            const { id, email } = await loginUser(user);
            const token = await generarToken({ id, email });
            const refreshToken = await guardarRefreshToken({ id, email });
            res.header('auth-token', token).header('refresh-token', refreshToken).status(200).json({ _id: id }).send();
        } else {
            throw new Error('El usuario esta vacio.');
        }
    }
    catch (error) {
        next(error);
    }

});



module.exports = router;