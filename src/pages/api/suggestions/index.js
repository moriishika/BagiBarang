import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import isAuthorized from "../../../libs/isAuthorized";

const cors = Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.use(isAuthorized);

handler.post(async (req, res) => {
  try {
    const { user } = await getSession({ req });
    const { db } = await connectToDatabase();
    const { description } = req.body;

    const hasUserMadeSuggestion = await db
      .collection("suggestions")
      .find({
        user_id: ObjectId(user.id),
      })
      .count();

    if (hasUserMadeSuggestion) {
      return res.status(400).json({
        message: "Anda Telah Memberi Saran",
        status: "USER_HAS_MADE_SUGGESTIONS",
      });
    }

    db.collection("suggestions").insertOne({
      user_id: ObjectId(user.id),
      description,
    });

    return res.status(200).json({
      message: "Suggestion sended",
    });
  } catch (err) {
    res.status(200).json({
      message: "Failed To Send Suggestion",
    });
  }
});

export default handler;
