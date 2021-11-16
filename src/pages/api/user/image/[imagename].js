import nextConnect from "next-connect";
import Cors from "cors";
import fs from "fs";
import path from "path";
import isAuthorized from '../../../../libs/isAuthorized';

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.use(isAuthorized);

handler.get(async (req, res) => {
  const filePath = path.resolve(".", "media/user/" + req.query.imagename);
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  res.send(imageBuffer);
});

export default handler;
