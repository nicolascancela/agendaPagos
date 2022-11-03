const mongoose = require('mongoose');
const { Schema } = mongoose;

const pagosSchema = new Schema({
    id_user: String,
    id_servicio: String,
    fechaPago: Date,
});

module.exports = mongoose.model('pagos', pagosSchema);