import express from "express";
import { handleSql } from "../func";

const router = express.Router();

router.post(`/myStock`, async (req,res,next)=>{
  const { kakaoId } = req.body;
  try {
    const sql = "SELECT ownedstock FROM user WHERE id = ?";
    const data = await handleSql(sql, kakaoId);
    console.log(data[0].ownedstock);
    if (data[0].ownedstock) {
      res.json({
        flag: true,
        data: data[0].ownedstock
      });
    } else {
      res.json({
        flag: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post(`/deleteStock`, async (req,res,next)=>{
  const { kakaoId, stockname } = req.body;
  try {
    const selectSql = "SELECT ownedstock FROM user WHERE id = ?";
    const userData = await handleSql(selectSql, [kakaoId]);
    let ownedstock = userData[0].ownedstock;
    ownedstock = ownedstock.filter((stock:any) => stock.stockname !== stockname);
    const updateSql = "UPDATE user SET ownedstock = ? WHERE id = ?";
    const data = await handleSql(updateSql, [JSON.stringify(ownedstock), kakaoId]);
    
    if (data) {
      res.json({
        flag: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;