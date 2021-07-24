import sharp from "sharp";
import fs from "fs";

const compressImage = (images) => {
  images.forEach((image) => {
    sharp(image.path)
      .resize(800, 800)
      .webp({ quality: 70 })
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
