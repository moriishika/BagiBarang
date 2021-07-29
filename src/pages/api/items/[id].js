import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import { ObjectId } from "mongodb";
const cors = Cors({
  methods: ["GET", "UPDATE", "DELETE"],
});

const handler = nextConnect();

handler.use(parseMultipartForm);
// handler.use(dbmiddleware);
// Jangan lupa buat middleware untuk login ato belum user nya
handler
  .get((req, res) => {})
  .put((req, res) => {
  })
  .delete(async (req, res) => {
    try {
      console.log("masuk delete");
      const { db } = await connectToDatabase();
      const { id } = req.query;
      await db.collection("items").deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ message: "berhasil" });
    } catch (err) {
      res.status(400).json({ message: "unable to delete data" });
    }
  });

export default handler;
