import formidable from "formidable-serverless";
import compressImage from "./imageCompress";

export default async function parseMultipartForm(req, res, next) {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: `public/assets/images/items`,
    keepExtensions: false,
  });
  //ini ga bisa cuma untuk item, harus di perbaiki untuk profile image, ads, sama video
  //ato ga coba bikin middleware nya dinamis lah intinya biar untuk ads nya nanti juga lancar
  // form.multiples = true;
  // form.uploadDir = `public/assets/images/items`;
  // form.keepExtensions = false;

  form.on("fileBegin", async (fields, file) => {
    file.name = Date.now();
    console.log(file.name);
    file.path = form.uploadDir + "/" + file.name;
  });

  form.onPart = (part) => {
    const validTypes = ["image/png", "image/jpg", "image/jpeg", "webp"];
    if (validTypes.indexOf(part.mime) === -1) {
      // Here is the invalid file types will be handled.
      // You can listen on 'error' event
      console.log("file not supported");
    }
    if (!part.filename || validTypes.indexOf(part.mime) !== -1) {
      // Let formidable handle the non file-pars and valid file types
      form.handlePart(part);
    }
  };

  //check kalo file nya cuma bisa image doang
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    console.log("masuk");
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields;

        if (!files.images.length) {
          files.images = [files.images];
        }

        compressImage(files.images);

        req.files = files;
      } else {
        console.log("error");
        console.log(err);
      }
      next();
    });
  } else {
    console.log("errors bet");
    next();
  }
}
