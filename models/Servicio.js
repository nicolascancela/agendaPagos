const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicioSchema = new Schema({
    id_user: String,
    nombre: String,
    descripcion: String,
    fechaVencimiento: Date,
    type: String,
    active: Boolean,
    periodicidad: Number
});

module.exports = mongoose.model('servicio', servicioSchema);