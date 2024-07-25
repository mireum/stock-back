import axios from "axios";
import express, { query } from "express";
import { conn } from "..";

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

router.post('/kakao',async (req,res,next)=>{
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

      // id, 닉네임, 썸네일 추출
      return {id:result.id, nickname:result.properties.nickname, thumbnail_image:result.properties.thumbnail_image}
    }
    
    const { accessToken } = await getKakaoToken(code);

    // session에 토큰 저장
    req.session.accessToken = accessToken;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
      } else {
        console.log('Session saved successfully:', req.session);
      }
    });
    const response = await getUserInfo(accessToken);

    res.json({
      message: '카카오 사용자 정보 확인',
      response
    })
  } catch (err) {
    console.log(err);     
  }
});

const queryAsync = (sql:string) => {
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

router.post('/kakaoLogout', async (req,res,next)=>{
  try {
    const sql = "select * from sessions";
    const result:any = await queryAsync(sql);
    // console.log('result안의 데이터::', JSON.parse(result[0].data));
    const token = JSON.parse(result[0].data).accessToken;

    console.log(`token::`, token);

    if (!token) {
      return res.status(400).send('세선에 토큰 없음');
    }

    const response = await axios(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`
      },
    });

    // 토큰 초기화
    // req.session.accessToken = null;
    req.session.destroy(() => {
      req.session
    });

    res.json({
      message: '로그아웃 성공',
    })
  } catch (err) {
    console.error(err);
  }
});

 module.exports = router;

//  login response 결과!
//  {
//   id: 3625128577,
//   connected_at: '2024-07-16T17:02:49Z',
//   properties: {
//     nickname: '최지우',
//     profile_image: 'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
//     thumbnail_image: 'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110'
//   },
//   kakao_account: {
//     profile_nickname_needs_agreement: false,
//     profile_image_needs_agreement: false,
//     profile: {
//       nickname: '최지우',
//       thumbnail_image_url: 'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110',  
//       profile_image_url: 'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',    
//       is_default_image: true,
//       is_default_nickname: false
//     },
//     has_email: true,
//     email_needs_agreement: false,
//     is_email_valid: true,
//     is_email_verified: true,
//     email: 'yljw225@kakao.com'
//   }
// }