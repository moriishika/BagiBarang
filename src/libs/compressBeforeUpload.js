import Resizer from 'react-image-file-resizer';

const resizeImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 800, 800, 'WEBP', 80, 0,
    uri => {
      resolve(uri);
    }, 'file' );
});

export default resizeImage;