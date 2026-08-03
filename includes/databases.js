const mysql = require('mysql');
const request = require('request')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'serpro',
    password: 'S4rpro@mapi',
    database: 'serpro'
});

function getData(req, res, documentNumber) {
    //const documentNumber = req.body.documentNumber;
    connection.query("SELECT dados FROM consultas WHERE documento = " + documentNumber + ";", function (err, result, fields) {
        try {
            result.recordset.forEach(dados => {
                let retorno = JSON.parse(result[0].dados);
                res.send(retorno);
            })
        } catch (err) {
            console.log("Erro na query:")
            if (err.response) {
                console.dir(err.response.data, { depth: null });
            } else {
                console.log(err.message);
            }
        }
    })
}

module.exports = {
    getData
}