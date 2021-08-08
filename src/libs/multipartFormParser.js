import formidable from "formidable-serverless";
import compressImage from "./imageCompress";

export default async function parseMultipartForm(req, res, next) {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: req.uploadDir,
    keepExtensions: true,
  });

  form.on("fileBegin", async (className, file) => {
    file.name = Date.now();
    file.path = process.cwd() + "/" + form.uploadDir + "/" + file.name;
  });

  form.onPart = (part) => {
    console.log('masuk part')
    const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (validTypes.indexOf(part.mime) === -1) {
      // Here is the invalid file types will be handled.
      // You can listen on 'error' event
    }
    if (!part.filename || validTypes.indexOf(part.mime) !== -1) {
      form.handlePart(part);
    }
  };

  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields;

        if (!files.images) {
          console.log("masuk");
          next();
        }

        if (!files.images.length) {
          files.images = [files.images];
        }

        console.log("lewat");

        if (typeof files.images !== "string") {
          compressImage(files.images);
          req.files = files;
        }
      } else {
        console.log(err);
      }
      next();
    });
  } else {
    console.log('error type');
    next();
  }
}
