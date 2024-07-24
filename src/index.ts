import express, { Express, Request, Response } from "express";
import multer, { Multer } from "multer";
import dotenv from 'dotenv';
import cors from "cors";
import { json, urlencoded } from "body-parser";
import https from "https"
import fs, { readFile, mkdirSync, existsSync } from "fs";
import path from "path";
import {
  OkPacket,createConnection,
  QueryError,ConnectionOptions,
  Connection,
  RowDataPacket,
  ResultSetHeader,
} from "mysql2";
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
// db_info.ssl = {
//   sslmode: 'verify-full',
//   key: fs.readFileSync(keyPath),
//   cert: fs.readFileSync(certPath),
// }

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
const conn: Connection = init();
connect(conn);

const app: Express = express();

dotenv.config();

const whitelist: string[] = ["http://localhost:3000"]; // 접속 허용 주소
const upload: Multer = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      console.log(file),
        existsSync("./uploads/") || mkdirSync("./uploads/", { recursive: !0 }),
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
// type error = QueryError | null;
// type result =
//   | RowDataPacket[]
//   | RowDataPacket[][]
//   | OkPacket
//   | OkPacket[]
//   | ResultSetHeader;

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
  secret: 'KakaoToken',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: "lax" }, // set secure: true if you're using https
  // express-mysql-session
  store: sessionStore,
}));

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
    credentials: !0,
    optionsSuccessStatus: 200,
  })
);

interface Data{
  id:number;
  name:string;
}

const Send:Data = {
  id:0,
  name:'test'
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
      success: true,
      data:Send
  })
});

// 라우터
app.use('/auth', authRouter);

// // 게시글 목록 보기
// app.get("/view", (req: Request, res: Response) => {
//   // board가 테이블 이름
//   var sql: string = "select * from board";
//   conn.query(sql, (err: error, result: result) => {
//     if (err) console.log("query is not excuted: " + err);
//     else res.send(result);
//   });
// });

// // 게시글 쓰기
// app.post("/insert", upload.single("img"), (req: Request, res: Response) => {
//   var body: any = req.body;
//   var sql: string = "SELECT count(*)+1 as bnum FROM board ";
//   conn.query(sql, (err: error, result: any) => {
//     if (err) console.log("query is not excuted: " + err);
//     else {
//       var sql: string =
//         "insert into board (bnum,id,title,content,writedate) values(?,?,?,?,NOW())";
//       var params: any[] = [result[0].bnum, body.id, body.title, body.content];
//       conn.query(sql, params, (err: error) => {
//         if (err) console.log("query is not excuted: " + err);
//         else if (req.file != null) {
//           // 만약 업로드 된 파일이 있다면
//           var sql: string =
//             "insert into file (bnum,savefile,filetype,writedate) values (?,?,?,now())";
//           var params: any[] = [
//             result[0].bnum,
//             req.file.originalname,
//             req.file.mimetype,
//           ];
//           conn.query(sql, params, (err: error) => {
//             if (err) console.log("query is not excuted: " + err);
//             else res.sendStatus(200);
//           });
//         } else res.sendStatus(200);
//       });
//     }
//   });
// });

// // 게시글 보기
// app.get("/read/:bnum", (req: Request, res: Response) => {
//   var sql: string = "select * from board where bnum=" + req.params.bnum;
//   conn.query(sql, (err: error, result: result) => {
//     if (err) console.log("query is not excuted: " + err);
//     else res.send(result);
//   });
// });

// // 게시글 수정
// app.post("/update/:bnum", (req: Request, res: Response) => {
//   var body: any = req.body;
//   var sql: string =
//     "update board set id=?, title=?, content=? where bnum=" + req.params.bnum;
//   var params: any[] = [body.id, body.title, body.content];
//   conn.query(sql, params, (err: error) => {
//     if (err) console.log("query is not excuted: " + err);
//     else res.sendStatus(200);
//   });
// });

// // 게시글 삭제
// app.get("/delete/:bnum", (req: Request, res: Response) => {
//   var sql: string = "delete from board where bnum=" + req.params.bnum;
//   conn.query(sql, (err: error) => {
//     if (err) console.log("query is not excuted: " + err);
//     else res.sendStatus(200);
//   });
// });

// // 이미지 파일 불러오기
// app.get("/img/:bnum", (req: Request, res: Response) => {
//   var sql: string = "select * from file where bnum=" + req.params.bnum;
//   conn.query(sql, (err: error, result: any) => {
//     if (err) console.log("query is not excuted: " + err);
//     else if (result.length != 0) {
//       readFile(
//         "uploads/" + result[0].savefile,
//         (err: NodeJS.ErrnoException | null, data: Buffer) => {
//           res.writeHead(200, { "Context-Type": "text/html" });
//           res.end(data);
//         }
//       );
//     } else res.sendStatus(200);
//   });
// });

// app.listen(app.get("port"), app.get("host"), () =>
//   console.log(
//     "Server is running on : " + app.get("host") + ":" + app.get("port")
//   )
// );

// https 서버
https
  .createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app.use('/', (req, res) => {
      console.log('HTTPS server on port 3001');
      res.send('HTTPS server on port 3001)');
    }),
  )
  .listen(3001);