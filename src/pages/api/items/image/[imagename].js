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
export default handler;
