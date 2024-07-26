## mysql 

// 게시글 목록 보기
app.get("/view", function (req, res) {
  var sql = "select * from board";
  conn.query(sql, function (err, result) {
    if (err) console.log("query is not excuted: " + err);
    else res.send(result);
  });
});

MySQL데이터베이스와 통신하는 방법은 query(sql, params, callback)의 형태로 사용되며 각각의 파라미터의 역할은 다음과 같다.


sql : 문자열 형태의 실행할 쿼리문. ?를 이용하여 서버에서 정의된 변수를 사용 가능.

params : 쿼리문에 서버에서 정의된 변수를 사용할 때 필요한 파라미터. 배열 형식으로 입력

callback : 쿼리문 실행이 완료되면 불러올 함수를 정의. SELECT문의 경우 콜백 함수의 파라미터 중 rows를 이용하여 조회된 데이터를 배열 형식으로 가져옴.

app.post("/insert", upload.single("img"), function (req, res) {
  var body = req.body;
  var sql = "SELECT count(*)+1 as bnum FROM board ";
  conn.query(sql, function (err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
      var sql =
        "insert into board (bnum,id,title,content,writedate) values(?,?,?,?,NOW())";
      var params = [result[0].bnum, body.id, body.title, body.content];
      conn.query(sql, params, function (err) {
        if (err) console.log("query is not excuted: " + err);
        else if (req.file != null) {
          // 만약 업로드 된 파일이 있다면
          var sql =
            "insert into file (bnum,savefile,filetype,writedate) values (?,?,?,now())";
          var params = [body.bnum, req.file.originalname, req.file.mimetype];
          conn.query(sql, params, function (err) {
            if (err) console.log("query is not excuted: " + err);
            else res.sendStatus(200);
          });
        } else res.sendStatus(200);
      });
    }
  });
});