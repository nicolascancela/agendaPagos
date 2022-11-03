const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUsuarioByUsername } = require('../config/dbUsersRepository');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('signup', new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('Entre');
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    done(null, user);
}));

passport.use('login', new LocalStrategy(function verify(username, password, done) {
    findUsuarioByUsername(username).then(user => {
        if (user.password === password) {
            const { id, username, password, nombre, apellido, email } = user;
            console.log('Logueado');
            done(null, { id, username, password, nombre, apellido, email });
        } else {
            console.log('El usuario y/o contraseña son incorrectos.');
            done(null, false, { message: 'El usuario y/o contraseña son incorrectos.' });
        }
    }).catch(error => {
        done(error);
    });
    done(null, false);
}));

