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

export const handleSql = async (sqlWhere: string, value: (string | number | boolean | null)) => {
  const sql = sqlWhere;
  const values: (string | number | boolean | null)[] = [value];
  const result:any = await queryAsync(sql, values);

  return result;
}