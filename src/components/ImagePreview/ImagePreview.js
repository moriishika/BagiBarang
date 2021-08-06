import { useEffect, useState } from "react";
import MediaSlider from "../MediaSlider";
import Slider from "react-slick";
import Image from "next/image";

const ImagePreview = ({
  images,
  setPreviewImageStatus,
  isPreviewImageClicked,
}) => {
  return (
    <div className="z-10 bg-black bg-opacity-10  absolute  w-full h-full  flex justify-center items-center border border-black">
      <div
        className=" w-full h-full absolute bg-red-300 bg-opacity-10"
        onClick={() =>
          setPreviewImageStatus(isPreviewImageClicked ? false : true)
        }
      ></div>
      <div className=" z-20 p-5 absolute shadow-xl bg-white rounded-lg flex flex-wrap justify-center items-center">
        
        {Array.from(images).map((image, index) => {
          return (
            <img key={index} src={URL.createObjectURL(image)} className="w-40 h-40 m-5"></img>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePreview;
