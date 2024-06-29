import { createConnection, Connection, ConnectionOptions } from "mysql2";

var db_info: ConnectionOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "qwer",
  database: "react_node",
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

export { init, connect };