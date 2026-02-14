var mysql = require('promise-mysql');

pool = mysql.createPool({
    host: '63.141.243.98',
    user: 'nagoreto_astro_admin',
    password: 'S@ravanan@123',
    database: 'nagoreto_darshini_astrology',
    connectionLimit: 10,
    port: 3306,

});

function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;
