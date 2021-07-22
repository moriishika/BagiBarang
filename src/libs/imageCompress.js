import sharp from "sharp";
import fs from "fs";

const compressImage = (images) => {
  images.forEach((image) => {
    console.log('ini ' + image.path)
    sharp(image.path)
      .webp({ quality: 10 })
      .toFile(`${image.path}.webp`)
      .then(() => {
        fs.unlinkSync(image.path);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default compressImage;
// files.images.forEach((image) => {
//   sharp(image.path)
//     .webp({ quality: 10 })
//     .toFile(`${image.path}.webp`)
//     .then(() => {
//       fs.unlinkSync(image.path);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
