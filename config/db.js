const mysql = require('mysql2');
require('dotenv').config();
//acá está la conexion a la base de datos:
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ecduar',
    password: 'e29718294',
    database: 'time_management'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;