import axios from "axios";
import express from "express";
import { queryAsync } from "../func";

const router = express.Router();

router.post(`/buy`, async (req,res,next)=>{
  try {
    // const {token} = req.body;

    // console.log(`token::`, token);

    // if (!token) {
    //   return res.status(400).send('mysql에 토큰 없음');
    // }
    // const response = await axios.post("https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/trading/order-cash", {
    //   "CANO": "50112547",
    //   "ACNT_PRDT_CD": "01",
    //   "PDNO": "005930",
    //   "ORD_DVSN": "00",
    //   "ORD_QTY": "1",
    //   "ORD_UNPR": "0"
    // },{
    //   headers: {
    //     "authorization": `Bearer ${token}`,
    //     "appkey": process.env.APP_KEY,
    //     "appsecret": process.env.APP_SECRET_KEY,
    //     "tr_id": "VTTC0802U",
    //   },
    //   withCredentials:true
    // });
    // console.log('주식매수', response);

  } catch (err) {
    console.error(err);
  }
})
module.exports = router;