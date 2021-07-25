// import Items from "../../../models/Items";
import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import Cors from "cors";
import { dbmiddleware } from "../../../libs/database";
import mongo from "mongodb";

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();
const ObjectId = mongo.ObjectId;

handler.use(parseMultipartForm);
handler.use(dbmiddleware);

// this api needs auth, so no one will able to save data without login
handler
  .post(async (req, res) => {
    const session = await getSession({ req });
    if (session) {
      const files = req.files.images.map((image) => image.name);
      //contains inputs value from uploadItem form
      const body = req.body;
      //contains the logged in user data
      console.log(body);

      // creating new instance of Items and save it to the database
      body.user_id = ObjectId(body.user_id);
      body.reports = [];
      req.db
        .collection("items")
        .insertOne({ ...body, images: files }, (err, data) => {
          if (err) return console.log(err);
          res.status(200).json(data);
        });
    } else {
      res.status(401).json({ message: "Please Log In" });
    }
    // const user = session.user;
    // const session = await getSession({ req });
    // if (session) {
    //   try {
    //     console.log("masuk post");
    //     //contains image name
    //     const files = req.files.images.map((image) => image.name);
    //     //contains inputs value from uploadItem form
    //     const body = req.body;
    //     //contains the logged in user data
    //     console.log(body);

    //     // creating new instance of Items and save it to the database
    //     const item = new Items({ ...body, images: files });

    //     await item.save();

    //     //if success it's gonna send a json with the item data
    //     res.status(200).json(item);
    //     console.log("masuk");
    //   } catch (err) {
    //     console.log(err);
    //     res.status(400).json({ message: err });
    //   }
    // } else {
    //   res.status(401).json({ message: "Please Log In" });
    // }

    //to get all items
  })
  .get((req, res) => {
    req.db
      .collection("items")
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
    // const items = Items.find()
    //   .populate("users")
    //   .exec((err, items) => {
    //     if (err) return console.log(err);
    //     console.log(items)
    //     return items;
    //   });
    // res.status(200).json(items);
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
