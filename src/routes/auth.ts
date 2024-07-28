import axios from "axios";
import express from "express";
import { handleSql } from "../func";

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

    // 카카오 토큰 요청
    const getKakaoToken = async (code:string)=>{
      const data :Data={
        grant_type:'authorization_code',
        client_id: `${process.env.REST_API_KEY}`,
        code
      };
      const queryString = Object.keys(data)
        .map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k])).join('&');

      const token = await axios.post("https://kauth.kakao.com/oauth/token", queryString, {headers: header})
      return {accessToken:token.data.access_token}
    }

    // 토큰으로 카카오 유저 정보
    const getUserInfo = async (accessToken:string)=>{
      header.Authorization = `Bearer `;
      header.Authorization +=accessToken
      
      const getKakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {headers: header});
      const result = getKakaoUser.data;
      
      // mysql에 id, nickname, thumbnail_image 저장
      const sqlUsers = "INSERT INTO user (id, nickname, thumbnail_image, accessToken) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE nickname=?, thumbnail_image=?, accessToken=?";
      const values:any = [result.id, result.properties.nickname, result.properties.thumbnail_image, accessToken, result.properties.nickname, result.properties.thumbnail_image, accessToken];
      const saveSql = await handleSql(sqlUsers, values);

      // id, 닉네임, 썸네일 추출
      return {id:result.id, nickname:result.properties.nickname, thumbnail_image:result.properties.thumbnail_image}
    }
    
    const { accessToken } = await getKakaoToken(code);
    const response = await getUserInfo(accessToken);

    // // session에 토큰 저장
    // req.session.accessToken = accessToken;
    // req.session.save(err => {
    //   if (err) {
    //     console.error('Session save error:', err);
    //   } else {
    //     console.log('Session saved successfully:', req.session);
    //   }
    // });

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
