import axios from "axios";
import express from "express";

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
// export default (router:Router)=>{
    // router.use('/auth',router) // "/auth"가 기준이됨

router.post('/kakao',async (req,res,next)=>{
  try {
    const {code} = req.body;
    console.log(`code::`, code);

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
      header.Authorization +=accessToken
      
      // 카카오 사용자 정보 조회
      const getKakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {headers: header})
      const result = getKakaoUser.data;

      // id, email 추출
      // return {id:result.id,email:result.kakao_account.email}
      return result;
    }
    
    const {accessToken}=await getKakaoToken(code);

    const response = await getUserInfo(accessToken);

    // console.log(`id, email`, id, email);
    console.log(`response`, response);

  } catch (err) {
    console.log(err);     
  }
 })

 module.exports = router;

//  response 결과!
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