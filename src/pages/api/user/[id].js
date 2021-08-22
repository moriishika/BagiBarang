import nextConnect from "next-connect";
import parseMultipartForm from "../../../libs/multipartFormParser";
import { connectToDatabase } from "../../../libs/database";
import Cors from "cors";
import { getSession } from "next-auth/client";
import { ObjectID, ObjectId } from "mongodb";
import slugify from "slugify";

const handler = nextConnect();
Cors({
  methods: ["PUT"],
});

handler.use((req, res, next) => {
  req.uploadDir = "media/user";
  next();
});
handler.use(parseMultipartForm);

handler.put(async (req, res) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const { db } = await connectToDatabase();

      delete req.body["uploadDir"];

      const { name, email, images, phoneNumber, province, address } = req.body;
      console.log("INI ISI FILENYA " + req.files);

      db.collection("users").updateOne(
        { _id: ObjectId(session.user.id) },
        {
          $set: {
            name,
            email,
            image: req.files
              ? "/api/user/image/" + req.files.images[0].name + ".webp"
              : images,
            phoneNumber,
            province,
            address,
            slug: slugify(name),
            isVerified: phoneNumber && province && address ? true : false,
          },
        },
        { upsert: true }
      );
      return res.status(200).json({ message: "Berhasil update" });
    } else {
      res.status(401).json({ message: "please log in" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
