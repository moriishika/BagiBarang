import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../libs/database";
import Cors from "cors";
import isAuthorized from '../../../../libs/isAuthorized';

const handler = nextConnect();

Cors({
  methods: ["GET", "UPDATE", "DELETE"],
});

handler.use(isAuthorized);

handler.get(async (req, res) => {
  const {skip, id} = req.query;

  try {
    const { db } = await connectToDatabase();

    const itemsTotal = await db.collection('items').find({user_id : ObjectId(id)}).count()

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
    
    res.status(200).json({result, itemsTotal});
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "failed to get items" });
  }
});

export default handler;
