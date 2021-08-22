import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../libs/database";
import Cors from "cors";

const handler = nextConnect();
const cors = Cors({
  methods: ["GET", "UPDATE", "DELETE"],
});

handler.get(async (req, res) => {
  const {skip, id} = req.query;

  try {
    const { db } = await connectToDatabase();

    const totalItems = await db.collection('items').find({user_id : ObjectId(id)}).count()

    const result = await db
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
        { $match: { user_id: ObjectId(id) } },
        {
          $sort : {_id : -1}
        }
      ])
      .skip(parseInt(skip))
      .limit(2)
      .toArray();

      console.log(totalItems);
    
      res.status(200).json({result, totalItems});
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "failed to get items" });
  }
});

export default handler;
