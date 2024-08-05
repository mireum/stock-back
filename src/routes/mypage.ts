import express from "express";
import { handleSql } from "../func";

const router = express.Router();

router.post(`/myStock`, async (req,res,next)=>{
  const { kakaoId } = req.body;
  try {
    const sql = "SELECT ownedStock FROM user WHERE id = ?";
    const data = await handleSql(sql, kakaoId);
    console.log(data[0].ownedStock);
    res.json({
      flag: true,
      data: data[0].ownedStock
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;