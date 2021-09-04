import nextConnect from "next-connect";
import parseMultipartForm from "../../../libs/multipartFormParser";
import isAuthorized from '../../../libs/isAuthorized';
import { connectToDatabase } from "../../../libs/database";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import slugify from "slugify";
import Cors from 'cors';

const handler = nextConnect();

Cors({
  methods: ["PUT"],
});

handler.use(isAuthorized);

handler.use((req, res, next) => {
  req.uploadDir = "media/user";
  next();
});

handler.use(parseMultipartForm);

handler.put(async (req, res) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const { db } = await connectToDatabase();

      delete req.body["uploadDir"];

      const { name, email, images, phoneNumber, province, address } = req.body;

      const isDuplicateName = await db.collection("users").find({_id : {$nin : [ObjectId(session.user.id)] }, name : name}).count();

      if(isDuplicateName){
        return res.status(400).json({message : 'Nama telah di gunakan', status : 'DUPLICATE_NAME'});
      }


      db.collection("users").updateOne(
        { _id: ObjectId(session.user.id) },
        {
          $set: {
            name,
            email,
            image: req.files
              ? "/api/user/image/" + req.files.images[0].name + ".webp"
              : images,
            phoneNumber,
            province,
            address,
            slug: slugify(name),
            isVerified : province ? true : false
          }
        },
        { upsert: true }
      );
      return res.status(200).json({ message: "Berhasil update", status : 'success' });
    } else {
      res.status(401).json({ message: "please log in", status : 'fail' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
