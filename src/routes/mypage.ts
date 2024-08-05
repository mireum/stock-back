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

// const sql = "DELETE ownedstock FROM user WHERE id = ?";

module.exports = router;