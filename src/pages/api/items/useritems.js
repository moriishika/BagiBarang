import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../libs/database";
import { redirect } from "next/dist/next-server/server/api-utils";
import Cors from "cors";

const handler = nextConnect();
const cors = Cors({
  methods: ["GET", "UPDATE", "DELETE"],
});

handler.get(async (req, res) => {
  const session = await getSession({ req });
  try {
    const { db } = await connectToDatabase();
    const items = await db
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
        { $match: { user_id: ObjectId(session.user.id) } },
      ])
      .toArray();

    console.log(items);

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ message: "failed to get items" });
  }
});

export default handler;
