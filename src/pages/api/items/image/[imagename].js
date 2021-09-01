import nextConnect from "next-connect";
import Cors from "cors";
import fs from "fs";
import path from "path";

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler
  .get(async (req, res) => {
    const filePath = path.resolve(".", "media/items/" + req.query.imagename);
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/webp");
    res.send(imageBuffer);
  })
  // .put(async (req, res) => {
  //   //ambil path dari api
  //   // terus setiap call update name dulu
  //   //abis unlink data sebelum 
  //   const filePath = path.resolve(".", "media/items/" + req.query.imagename);
  //   fs.unlinkSync(filePath);
  //   const imageBuffer = fs.readFileSync(filePath);
  //   res.setHeader("Content-Type", "image/webp");
  //   res.send(imageBuffer);
  // });

export default handler;