var mysql = require('promise-mysql');

pool = mysql.createPool({
  host: '23.94.181.5',
  user: 'astrodharsan_admin',
  password: 'S@ravanan@123',
  database: 'astrodharsan_astrology',
  connectionLimit: 10,
  port: 3306,

});

function getSqlConnection() {
  return pool.getConnection().disposer(function (connection) {
    pool.releaseConnection(connection);
  });
}

module.exports = getSqlConnection;
