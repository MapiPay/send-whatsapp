const mysql = require('mysql');
const request = require('request');
const jsons = require('./jsons.js')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'serpro',
    password: 'S4rpro@mapi',
    database: 'serpro'
});

function getData(req, res, documentNumber) {
    //const documentNumber = req.body.documentNumber;
    sqlQuery = "SELECT dados FROM consultas WHERE documento = '" + documentNumber + "';"
    connection.query(sqlQuery, function (err, result, fields) {
        try {
			if(result.length >= 1){
                let retorno = JSON.parse(result[0].dados);
                try{
                }catch(err){
					console.log(err)
				}
            }
            return true;
        } catch (err) {
            console.log("Erro na query:",err,sqlQuery)
            if (err.response) {
                console.dir(err.response.data, { depth: null });
            } else {
                console.log(err.message);
            }
            return false;
        }
    })
}

module.exports = {
    getData
}