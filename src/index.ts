import express, { Express, Request, Response } from "express";
import multer, { Multer } from "multer";
import dotenv from 'dotenv';
import cors from "cors";
import { json, urlencoded } from "body-parser";
import https from "https"
import fs, { readFile, mkdirSync, existsSync } from "fs";
import path from "path";
import { createConnection, ConnectionOptions, Connection } from "mysql2";
import session from 'express-session';
const MySQLStore = require("express-mysql-session")(session);

// https 적용
const keyPath = path.join('C:', 'Windows', 'System32', 'key.pem');
const certPath = path.join('C:', 'Windows', 'System32', 'cert.pem');

var db_info: ConnectionOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "qwer",
  database: "stock_db",
};

const init = (): Connection => createConnection(db_info);

const connect = (conn: { connect: (arg0: (err: any) => void) => void }) => {
  conn.connect((err) => {
    if (err) {
      console.error("mysql connection error : " + err);
    } else {
      console.log("mysql is connected successfully!");
    }
  });
};
export const conn: Connection = init();
connect(conn);

const app: Express = express();

dotenv.config();

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

// 라우터 가져오기
const authRouter = require('./routes/auth');

app.set("port", process.env.PORT || 5000);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(json());

// session 사용 미들웨어
const sessionStore = new MySQLStore({
  host: db_info.host,
  port: db_info.port,
  user: db_info.user,
  password: db_info.password,
  database: db_info.database
});

app.use(session({
  name: 'KakaoToken',
  secret: 'KakaoToken',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: false }, // set secure: true if you're using https
  // express-mysql-session
  store: sessionStore,
}));

const whitelist: string[] = ["http://localhost:3000"]; // 접속 허용 주소

app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin(
      req: string | undefined,
      res: (err: Error | null, origin?: StaticOrigin | undefined) => void
    ) {
      console.log("접속된 주소: " + req),
        -1 == whitelist.indexOf(req || "") && req
          ? res(Error("허가되지 않은 주소입니다."))
          : res(null, !0);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
      success: true,
      data:{id: 0}
  })
});

// 라우터
app.use('/auth', authRouter);

// https 서버
https
  .createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app.use('/', (req, res) => {
      console.log('HTTPS server on port 443');
      res.send('HTTPS server on port 443)');
    }),
  )
  .listen(443);