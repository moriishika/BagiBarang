import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import { ObjectId } from "mongodb";
import slugify from "slugify";
import fs from "fs";

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.use((req, res, next) => {
  req.uploadDir = "media/items";
  next();
});
handler.use(parseMultipartForm);
// handler.use(dbmiddleware);

// this api needs auth, so no one will able to save data without login
handler
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (session) {
      const files = req.files.images.map(
        (image) => `/api/items/image/${image.name}.webp`
      );
      const imagesName = req.files.images.map((image) => image.name);

      //contains inputs value from uploadItem form
      const body = req.body;

      // creating new instance of Items and save it to the database
      body.user_id = ObjectId(body.user_id);
      body.reports = [];
      body.slug = slugify(`${body.name} ${Date.now()}`);

      const { db } = await connectToDatabase();

      db.collection("items").insertOne(
        { ...body, images: files, imagesName },
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
    const { db } = await connectToDatabase();
    const skip = parseInt(req.query.skip);
    const itemsTotal = await db.collection('items').estimatedDocumentCount({});
    console.log(itemsTotal);

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
        {
          $sort : {_id : -1}
        }
      ])
      .skip(skip)
      .limit(2)
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.status(200).json({ result , itemsTotal});
      });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
