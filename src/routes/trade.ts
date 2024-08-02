import express from "express";
import { handleSql, queryAsync } from "../func";

const router = express.Router();

router.post(`/buystock`, async (req,res,next)=>{
  try {
    const { form, kakaoId } = req.body;
    const { Stockname, price, stockNumber } = form;
    const stockInfo = JSON.stringify({ Stockname, price, stockNumber });
    console.log(form);
    console.log(stockInfo);
    console.log(kakaoId);
    
    
    // mysql에 구매한 주식 정보 저장
    const nullsql = `UPDATE user SET ownedStock = IFNULL(ownedStock, JSON_ARRAY()) WHERE id = ?`;
    const nullresult = await handleSql(nullsql, kakaoId);
    const sql = `UPDATE user SET ownedStock = JSON_ARRAY_APPEND(ownedStock, '$', CAST(? AS JSON)) WHERE id = ?`;
    const result = await handleSql(sql, [stockInfo, kakaoId]);
    console.log(`주식세이브`, result);
    

    res.json({
      message: '주식 구매 성공',
    });

  } catch (err) {
    console.error(err);
  }
})
module.exports = router;