const mysql = require('mysql');
global.connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'serpro',
    password: 'S4rpro@mapi',
    database: 'serpro'
});