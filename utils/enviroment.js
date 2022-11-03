require('dotenv').config();
const Enviroment = {
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_NAME: process.env.DB_NAME || '',
    TOKEN_SECRET: process.env.TOKEN_SECRET || '',
    JWT_EXPIRY_SECONDS: process.env.JWT_EXPIRY_SECONDS || '10000000000',
    JWT_REFRESH_EXPIRY_SECONDS: process.env.JWT_REFRESH_EXPIRY_SECONDS || '999999999999999999'
}
module.exports = Enviroment;