const path = require('path');
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//crear el servidor
const app = express();

//conexion a la base de datos
dbConnection();

//directorio publico donde se accede a la app
app.use(express.static('public'));

//parseo body
app.use(express.json()); 

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
//app.use('/api/detail_payment', require('./routes/details_payment'));
//app.use('/api/user', require('./routes/user'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//escuchar las peticiones
const port = process.env.PORT;;
app.listen(port, () => {
    console.log(`SERVIDOR ONLINE EN EL PUERTO: ${port}`);
})
