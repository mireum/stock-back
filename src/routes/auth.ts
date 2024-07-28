import axios from "axios";
import express, { query } from "express";
import { handleSql, queryAsync } from "../func";

interface Data {
  grant_type: string;
  client_id: string;
  code: string;
  [key: string]: string;
}

// 헤더 설정
const header = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  'Authorization': 'Bearer '
};

const router = express.Router();

router.post('/kakao', async (req,res,next)=>{
  try {
    const {code} = req.body;
    // console.log(`code::`, code);

    const getKakaoToken = async (code:string)=>{

      const data :Data={
        grant_type:'authorization_code',
        client_id: `${process.env.REST_API_KEY}`,
        code
      };

      const queryString = Object.keys(data)
        .map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k]))
        .join('&');

      // 카카오 토큰 요청
      const token = await axios.post("https://kauth.kakao.com/oauth/token", queryString, {headers: header})

      // 엑세스 토큰 발급
      return {accessToken:token.data.access_token}
    }

    const getUserInfo = async (accessToken:string)=>{
      // Authorization: 'Bearer access_token'
      // 엑세스 토큰 헤더에 담기
      header.Authorization = `Bearer `;
      header.Authorization +=accessToken
      
      // 카카오 사용자 정보 조회
      const getKakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {headers: header})
      const result = getKakaoUser.data;
      // console.log('카카오 사용자 정보 조회', result);
      
      // mysql에 id, nickname, thumbnail_image 저장
      const insertOrUpdateUser = async (result:any) => {
        const sqlUsers = "INSERT INTO user (id, nickname, thumbnail_image, accessToken) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE nickname=?, thumbnail_image=?, accessToken=?";
        const values = [result.id, result.properties.nickname, result.properties.thumbnail_image, accessToken, result.properties.nickname, result.properties.thumbnail_image, accessToken];
      
        try {
          const result = await queryAsync(sqlUsers, values);
        } catch (err) {
          console.error("Error executing query:", err);
        }
      };
      insertOrUpdateUser(result);

      // id, 닉네임, 썸네일 추출
      return {id:result.id, nickname:result.properties.nickname, thumbnail_image:result.properties.thumbnail_image}
    }
    
    const { accessToken } = await getKakaoToken(code);

    // // session에 토큰 저장
    // req.session.accessToken = accessToken;
    // req.session.save(err => {
    //   if (err) {
    //     console.error('Session save error:', err);
    //   } else {
    //     console.log('Session saved successfully:', req.session);
    //   }
    // });
    const response = await getUserInfo(accessToken);

    res.json({
      message: '카카오 사용자 정보 확인',
      response
    })
  } catch (err) {
    console.log(err);     
  }
});

router.post('/kakaoLogout', async (req,res,next)=>{
  const { kakaoId } = req.body;
  console.log(`kakaoID`, kakaoId);
  
  try {
    const sqlSesstions = "SELECT accessToken FROM user";
    const token = await handleSql(sqlSesstions, kakaoId);

    if (!token) {
      return res.status(400).send('세선에 토큰 없음');
    }

    const response = await axios(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token[0].accessToken}`
      },
    });

    // mysql에 accessToken 초기화
    const sql = "UPDATE user SET accessToken = NULL WHERE id = ?";
    const removeToken = await handleSql(sql, kakaoId);

    res.json({
      message: '로그아웃 성공',
    })
  } catch (err) {
    console.error(err);
  }
});

 module.exports = router;
