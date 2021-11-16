import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import {ObjectId} from 'mongodb';
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

    db.collection("bugs").insertOne({
      user_id: ObjectId(user.id),
      description,
    });
    return res.status(200).json({
      message: "Bug Report Success",
    });
  } catch (err) {
    res.status(200).json({
      message: "Failed To Report Bug",
    });
  }
});

export default handler;
