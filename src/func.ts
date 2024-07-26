import { conn } from ".";

// sessions에서 가져오기
export const queryAsync = (sql:string) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
