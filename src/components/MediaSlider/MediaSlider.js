import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSlider = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    lazyLoad : true,
    arrows : false,
    customPaging: i => (
      <div className="w-3.5 border-2 h-3.5  bg-white border-black rounded-full"></div>
    )
  };

  return (
    <div>
      <Slider {...settings}>
        {props.images.map((image) => {
          return (
            <div>
              <img
                src={`/assets/images/items/${image}`}
                className="rounded-xl m-auto"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MediaSlider;
