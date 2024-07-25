import express from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { Multer } from "multer";

const router = express.Router();

router.post(``, async (req,res,next)=>{
    try {


      
    } catch (err) {
      console.error(err);
    }
  })

  const upload: Multer = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        console.log(file),
          existsSync("./uploads/") || mkdirSync("./uploads/", { recursive: !0 }),
          callback(null, "./uploads/");
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    }),
  });
// type error = QueryError | null;
// type result =
//   | RowDataPacket[]
//   | RowDataPacket[][]
//   | OkPacket
//   | OkPacket[]
//   | ResultSetHeader;
module.exports = router;