import axios from "axios";
import express from "express";
import { queryAsync } from "../func";

const router = express.Router();

router.post(`/buy`, async (req,res,next)=>{
  try {
    const { kakaoId } = req.body;


  } catch (err) {
    console.error(err);
  }
})
module.exports = router;