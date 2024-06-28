const mysql = require('mysql2');

const pool = mysql.createPool
({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'q142753',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getUsers = async ()=>
{
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('select * from users;');
    console.log(rows);
    return rows;
};

module.exports = 
{
    getUsers
};