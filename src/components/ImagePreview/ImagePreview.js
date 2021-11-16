import { useEffect, useState } from "react";

const ImagePreview = ({
  images,
  setPreviewImageStatus,
  isPreviewImageClicked,
}) => {
  const [blobImages, setBlobImages] = useState([]);

  useEffect(() => {
    Array.from(images).map((image) => {
      setBlobImages((prevBlobs) => [...prevBlobs, URL.createObjectURL(image)]);
    });

    return () => {
      blobImages.forEach((image) => {
        URL.revokeObjectURL(image);
      });
    };
  }, []);

  return (
    <div className="z-10 bg-black bg-opacity-10  absolute  w-full h-full  flex justify-center items-center border border-black">
      <div
        className=" w-full h-full absolute bg-black bg-opacity-10"
        onClick={() =>
          setPreviewImageStatus(isPreviewImageClicked ? false : true)
        }
      ></div>
      <div className=" z-20 p-5 absolute shadow-xl bg-white rounded-lg flex flex-wrap justify-center items-center">
        {blobImages?.map((image, index) => {
          return <img key={index} src={image} className="w-40 h-40 m-5"></img>;
        })}
      </div>
    </div>
  );
};

export default ImagePreview;
