# 메모

npm i -D express ts-node nodemon @types/node @types/express
🙆‍♀️ cookie-parser cors dotenv express-session morgan
🙅‍♀️ bcrypt @aws-sdk/client-s3 aws-sdk ejs multer multer-s3 passport passport-local

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node dist/index.js",
    "build": "tsc -p .",
    "dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts"
  },

npm run dev로 실행

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