const mongoose = require('mongoose');
const ENV = require('../utils/enviroment');
const user = ENV.DB_USER;
const pass = ENV.DB_PASS;
const dbName = ENV.DB_NAME;
const url = `mongodb+srv://${user}:${pass}@database.atqszmi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Conexión establecida con la base de datos'))
    .catch(error => console.log('Se produjo un error al intentar conectarse a la base de datos: ' + error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Se produjo un error en la conexión de la base de datos:'));

module.exports = { db };