import Cors from "cors";
import { connectToDatabase } from "../../../../libs/database";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client";
import isAuthorized from "../../../../libs/isAuthorized";
import nextConnect from "next-connect";

Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.use(isAuthorized);

handler.put(async (req, res) => {
  try {
    const { id } = req.query;
    const { db } = await connectToDatabase();

    const session = await getSession({ req });

    const hasUserReported = await db
      .collection("items")
      .find({
        _id: ObjectId(id),
        reports: {
          $exists: true,
          $elemMatch: { userid: session.user.id() },
        },
      })
      .count();

    console.table(["User Reprt COunt", hasUserReported]);

    if (hasUserReported) {
      return res.status(400).json({
        message: "Anda telah melaporkan barang ini",
        status: "USER_HAS_REPORTED_ITEM",
      });
    }

    db.collection("items").updateOne(
      { _id: ObjectId(id) },
      {
        $push: { reports: req.body },
      }
    );

    res.status(200).json({
      message: "Berhasil Melaporkan Barang",
      status: "REPORT_ITEM_SUCCESS",
    });

  } catch (err) {
    res.status(400).json({
      message: "Unable to report item",
      status: "FAILED_TO_REPORT_ITEM",
    });
  }
});

export default handler;
