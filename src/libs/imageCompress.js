import sharp from "sharp";
import fs from 'fs';

const compressImage = (images) => {
  images.forEach((image) => {
    sharp(image.path)
      .resize(800, 800)
      .webp({ quality: 10 })
      .toFile(`${image.path}.webp`)
      .then(() => {
        fs.unlink(image.path, (err) => {
          if(err){
            console.log(err)
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default compressImage;
