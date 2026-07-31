const mysql = require('mysql');
const request = require('request');

global.connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'serpro',
    password: 'S4rpro@mapi',
    database: 'serpro'
});


module.exports = {
    getData(req, res) {
        var documentNumber = req.body.documentNumber;
        connection.query("SELECT dados FROM consultas WHERE documento = " + documentNumber + ";", function (err, result, fields) {
            try {
                results.recordset.forEach(dados => {
                    retorno = JSON.parse(result[0].dados);
                    res.send(retorno);
                })
            } catch (err) { }
        })
    }
}