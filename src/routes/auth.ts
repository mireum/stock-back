import express from "express";

// import {Router} from "express";

const router = express.Router();
// export default (router:Router)=>{
    // router.use('/auth',router) // "/auth"가 기준이됨

router.post('/kakao',async (req,res,next)=>{
  try {
    const {code} = req.body;
    console.log(code);
    res.json({
      message: '성공!'
    })
  } catch (err) {
    console.log(err);
        
  }
 })

 module.exports = router;
