import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import { ObjectId } from "mongodb";
import slugify from "slugify";

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.use(parseMultipartForm);
// handler.use(dbmiddleware);

// this api needs auth, so no one will able to save data without login
handler
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (session) {
      const files = req.files.images.map((image) => image.name);

      //contains inputs value from uploadItem form
      const body = req.body;

      // creating new instance of Items and save it to the database
      body.user_id = ObjectId(body.user_id);
      body.reports = [];
      body.slug = slugify(`${body.name} ${Date.now()}`);

      const {db} = await connectToDatabase();

      db.collection("items").insertOne(
        { ...body, images: files },
        (err, data) => {
          if (err) return console.log(err);
          res.status(200).json(data);
        }
      );
    } else {
      res.status(401).json({ message: "Please Log In" });
    }
  })
  .get(async (req, res) => {
    const {db} = await connectToDatabase();
    db.collection("items")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ])
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.status(200).json(result);
      });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
