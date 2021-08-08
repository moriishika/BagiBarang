import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import { ObjectId } from "mongodb";
import fs from "fs";

const cors = Cors({
  methods: ["GET", "PUT", "DELETE"],
});

const handler = nextConnect();

handler.use((req, res, next) => {
  req.uploadDir = "media/items";
  next();
});
handler.use(parseMultipartForm);
handler
  .put(async (req, res) => {
    try {
      console.log("masuk apted");

      let fullpath = req.body.fullpath.split(',');
      let imagesName = req.body.imageName.split(',');

      if (req.files.images) {
        console.log('masuk files')
        let path = req.files.images.map(
          (image) => `/api/items/image/${image.name}.webp`
        );
        console.log(fullpath)
        console.log('lewat fullpath')
        let imagename = req.files.images.map((image) => image.name);
        console.log(imagename)
        console.log('lewat imagesName')

        const imageIndex = req.body.imageIndex.split(',');
        await imageIndex.forEach((isUpdated, index) => {
            if(isUpdated === 'true'){
             fullpath[index] = path[0];
             imagesName[index] = imagename[0].toString();
             path.splice(0,1)
             imagename.splice(0,1)
            }
        })
      }

      const {name, email, phoneNumber, province, address, description} = req.body

      const { id } = req.query;
      const {db} = await connectToDatabase();
      db.collection('items').updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            email,
            images: fullpath,
            imagesName,
            phoneNumber,
            province,
            address,
            description
          },
        },
      );
      

    } catch (error) {
      res.status(400).json({ message: "Failed to Update Data" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("masuk delete");
      const { db } = await connectToDatabase();
      const { id } = req.query;

      const item = await db.collection("items").findOne({ _id: ObjectId(id) });

      item.imagesName.forEach((imageName) => {
        fs.unlinkSync(
          process.cwd() + "/" + "media/items" + "/" + imageName + ".webp"
        );
      });

      await db.collection("items").deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ message: "berhasil" });
    } catch (err) {
      res.status(400).json({ message: "unable to delete data" });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
