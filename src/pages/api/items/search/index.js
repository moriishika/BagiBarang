import nextConnect from "next-connect";
import Cors from "cors";
import { connectToDatabase } from "../../../../libs/database";

Cors({
  methods: ["POST"],
});

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const { q, province, skip } = req.query;

    console.table([q, province, skip]);

    if (!q && !province) {
      return res.status(400).json({ message: "Needs item name or province" });
    }

    const { db } = await connectToDatabase();

    const matchQuery = {};

    if (q) {
      matchQuery.$text = {
        $search: q,
      };
    }

    if (province) {
      matchQuery.province = province;
    }

    const totalSearchedItems = await db
      .collection("items")
      .find(matchQuery)
      .count();

    const searchedItems = await db
      .collection("items")
      .aggregate([
        {
          $match: matchQuery,
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "uploader",
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $skip: parseInt(skip),
        },
        {
          $limit: 2,
        },
      ])
      .toArray();

    console.log(searchedItems);

    res
      .status(200)
      .json({ result: searchedItems, itemsTotal: totalSearchedItems });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to get searched data" });
  }
});

export default handler;
