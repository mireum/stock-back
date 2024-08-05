import express from "express";
import { handleSql } from "../func";

const router = express.Router();

router.post(`/buystock`, async (req,res,next)=>{
  try {
    const { form, kakaoId } = req.body;
    const { Stockname, price, stockNumber } = form;
    const stockInfo = JSON.stringify({ Stockname, price, stockNumber });
    
    // mysql에 구매한 주식 정보 저장
    // ownedstock이 null이면 빈 배열로 초기화
    const nullsql = `UPDATE user SET ownedstock = IFNULL(ownedstock, JSON_ARRAY()) WHERE id = ?`;
    const nullresult = await handleSql(nullsql, kakaoId);
    const sql = `UPDATE user SET ownedstock = JSON_ARRAY_APPEND(ownedstock, '$', CAST(? AS JSON)) WHERE id = ?`;
    const result = await handleSql(sql, [stockInfo, kakaoId]);    

    res.json({
      message: '주식 구매 성공',
      flag: true,
    });

  } catch (err) {
    console.error(err);
  }
})
module.exports = router;