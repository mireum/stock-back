console.log('시작!!');
import express from 'express';
// import morgan from 'morgan';

// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');

const app = express();

// dotenv.config();

// 데이터베이스


// 포트
const port = 3000;
app.get('/', (req:any, res:any):any=>
  {
      res.send(`<h2>welcome to server</h2>`);
  });
  
  app.listen(port, ()=>
  {
     console.log(`SERVER 실행됨 ${port}`); 
  });