import axios from "axios";
import express from "express";
import { queryAsync } from "../func";

const router = express.Router();

router.post(``, async (req,res,next)=>{
  try {
    const sql = "select * from sessions";
    const result:any = await queryAsync(sql);
    const token = JSON.parse(result[0].data).accessToken;

    console.log(`token::`, token);

    if (!token) {
      return res.status(400).send('mysql에 토큰 없음');
    }
    const response = await axios.post("https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/trading/order-cash", {
      headers: {
        "authorization": `Bearer ${token}`,
        "appkey": process.env.REACT_APP_APP_KEY,
        "appsecret": process.env.REACT_APP_APP_SECRET_KEY,
        "tr_id": "VTTC0802U",
      },
      body: {
        "CANO": "64387084",
        "ACNT_PRDT_CD": "01",
        "PDNO": "005930",
        "ORD_DVSN": "00",
        "ORD_QTY": "1",
        "ORD_UNPR": "73000"
      }
    }, {withCredentials:true});
    console.log('주식매수', response);
    // navigate('/');
    // window.location.reload();

  } catch (err) {
    console.error(err);
  }
})
module.exports = router;