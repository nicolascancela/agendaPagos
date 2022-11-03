const express = require('express');
const routes = require('./routes/index');
const routesUser = require('./routes/user');
const routesPago = require('./routes/pago');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const { db } = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();
const secret = 'MyAgendaPag0sSecret';
const Error = require('./middlewares/Error');
const verifyToken = require('./middlewares/VerifyToken');

app.use(express.json());
app.use(cookiesParser(secret));
app.use(session({ secret, resave: true, saveUninitialized: true }));

app.use('/others', routes);
app.use('/users', routesUser);
app.use('/pagos', verifyToken, routesPago);
app.get('/', (req, res) => { res.send(`AgendaPagosBE ejecutandose éxitosamente en el puerto: ${port}`) });
app.use('/', Error);
app.listen(port, () => { console.log(`AgendaPagosBE ejecutandose éxitosamente en el puerto: ${port}`) });