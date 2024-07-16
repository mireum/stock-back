import {Router} from "express";

export default (router:Router)=>{
    // router.use('/auth',router) // "/auth"가 기준이됨

    router.post('/kakao',async (req,res,next)=>{  //라우터 구현
      const {code} = req.body  // 프런트에서 인가코드 body에 담아서 보낸거 받기
      console.log(code);
      
    })
}