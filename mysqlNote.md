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

app.post('/topic/add', function(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;

  const sql= 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, result, field){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server  Error');
    }
    res.redirect('/topic/'+ result.insertId);
  });
});

PK = Primary Key: 기본키라고 불리며, 중복 되어 나타날 수 없는 단일 값이며 null값을 가질 수 없고 오직 하나만 설정 가능하다.
NN = Not Null: null값을 가질 수 없다.
BIN = Binary: 바이너리 데이터
UN = Unsigned: 정수 유형
UQ = Create/remove Unique Key: 기본키와 같은 성질을 같지만 차이점은 Unique Key는 하나의 테이블에 각각 컬럼마다 지정이 가능하고 여러개 설정이 가능하다.
ZF = zero-Filled: 0으로 채우기
AI = Auto Increment

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

## mysql workbench

콜룸 이름 바꾸기
alter table `user` change `profilePic` `thumbnail_image` varchar(120)
alter table `user` change `username` `nickname` varchar(30)