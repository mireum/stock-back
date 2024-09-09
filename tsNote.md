# 메모

npm i -D express ts-node nodemon @types/node @types/express
🙆‍♀️ cookie-parser cors dotenv express-session morgan
🙅‍♀️ bcrypt @aws-sdk/client-s3 aws-sdk ejs multer multer-s3 passport passport-local

"devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.9",
    "express": "^4.19.2",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2"
  },
  "dependencies": {
    "@types/cors": "^2.8.17",
    "@types/express-mysql-session": "^3.0.6",
    "@types/express-session": "^1.18.0",
    "@types/multer": "^1.4.11",
    "axios": "^1.7.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express-mysql-session": "^3.0.3",
    "express-session": "^1.18.0",
    "fs": "^0.0.1-security",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.10.1",
    "typescript": "^5.5.2"
  }
  
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