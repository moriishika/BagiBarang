import Cors from "cors";
import { connectToDatabase } from "../../../../libs/database";
import { ObjectId } from "mongodb";

Cors({
  methods: ["POST"],
});

const handler = async (req, res) => {
  try {
    console.log(req.query);
    const { id } = req.query;
    console.log(id);
    const { db } = await connectToDatabase();
    db.collection("items").updateOne(
      { _id: ObjectId(id) },
      {
        $push: { reports: req.body },
      }
    );
    res.status(200).json({message : "Berhasil Melaporkan Barang"})
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unable to report item" });
  }
};

export default handler;
