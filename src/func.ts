import { conn } from ".";

// sql에서 가져오기
export const queryAsync = (sql: string, values: (string | number | boolean | null)[]) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

