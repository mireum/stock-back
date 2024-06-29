// const mysql = require('mysql2');
// import mysql from 'mysql2';

// interface User {
//   userId: string;
//   userPassword: string;
//   userName: string;
//   userSignUpDate: string;
// }

// const pool = mysql.createPool
// ({
//   host: 'localhost',
//   user: 'root',
//   database: 'test',
//   password: 'q142753',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const getUsers = async ()=>
// {
//     const promisePool = pool.promise();
//     const [rows] = await promisePool.query('select * from users;');
//     console.log(rows);
//     return rows;
// };

//  module.exports = 
// {
//     getUsers
// };

// import { createPool, Pool } from 'mysql2/promise';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   // users 테이블의 다른 컬럼에 대한 타입을 추가하세요
// }

// // Create the connection pool. The pool-specific settings are the defaults
// const pool: Pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'test',
//   password: 'q142753',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const getUsers = async (): Promise<User[]> => {
//   const [rows] = await pool.query<User[]>('SELECT * FROM users;');
//   console.log(rows);
//   return rows;
// };

// export { getUsers };

import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

interface User {
  id: number;
  name: string;
  email: string;
  // users 테이블의 다른 컬럼에 대한 타입을 추가하세요
}

// Create the connection pool. The pool-specific settings are the defaults
const pool: Pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'q142753',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users;');
  console.log(rows);
  return rows as User[];
};

export { getUsers };