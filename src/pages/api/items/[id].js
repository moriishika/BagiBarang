import parseMultipartForm from "../../../libs/multipartFormParser";
import nextConnect from "next-connect";
import Cors from "cors";
import { connectToDatabase } from "../../../libs/database";
import { ObjectId } from "mongodb";
import fs from "fs";
import isAuthorized from '../../../libs/isAuthorized';

Cors({
  methods: ["GET", "PUT", "DELETE"],
});

const handler = nextConnect();

handler.use(isAuthorized);

handler.use((req, res, next) => {
  req.uploadDir = "media/items";
  next();
});

handler.use(parseMultipartForm);

handler
  .put(async (req, res) => {
    try {
      console.log(req.body)
      let fullpath = req.body.fullpath.split(",");
      let imagesName = req.body.imageName.split(",");
      // let images = req.body.images.split(',');
      let deletedImages = req.body.deletedImage.split(",");
    
      console.log(deletedImages);
      
      const deleted = [...deletedImages];
      
      await deletedImages.forEach((isDeleted) => {
        console.log(imagesName)
        if (isDeleted === "deleted") {
          fs.unlinkSync(
            process.cwd() +
              "/" +
              "media/items" +
              "/" +
              imagesName[deleted.indexOf(isDeleted)] +
              ".webp"
          );
          console.log(deleted.indexOf(isDeleted))
          fullpath.splice(deleted.indexOf(isDeleted), 1);
          imagesName.splice(deleted.indexOf(isDeleted), 1);
          deleted.splice(deleted.indexOf(isDeleted), 1)
        }
      });

      console.log(fullpath);

      if (req.files) {
        let path = req.files.images.map(
          (image) => `/api/items/image/${image.name}.webp`
        );

        let imagename = req.files.images.map((image) => image.name);

        const imageIndex = req.body.imageIndex.split(",");

        await imageIndex.forEach((isUpdated, index) => {
          console.log(imageIndex);
          if (isUpdated === "true") {
            if (imagesName[index]) {
              fs.unlinkSync(
                process.cwd() +
                  "/" +
                  "media/items" +
                  "/" +
                  imagesName[index] +
                  ".webp"
              );
            }

            fullpath[index] = path[0];
            imagesName[index] = imagename[0].toString();
            path.splice(0, 1);
            imagename.splice(0, 1);
          }
        });
      }

      const { name, email, phoneNumber, province, address, description } =
        req.body;

      const { id } = req.query;
      const { db } = await connectToDatabase();
      db.collection("items").updateOne(
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
            description,
          },
        }
      );
      res.status(200).json({message : 'Update Success'})
    } catch (error) {
      console.log(error);
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
