import sharp from "sharp";
import fs from "fs";

//this option disable sharp to cache images, unlink cant remove the image because sharp still accessing the image
sharp.cache(false);

const compressImage = (images) => {
  images.forEach((image) => {
    sharp(image.path)
      .resize(800, 800, { fit: "contain", gravity: "center",  background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 100 })
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
