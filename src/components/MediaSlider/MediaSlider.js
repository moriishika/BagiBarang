import Slider from "react-slick";
import { useState } from "react";

const NextArrow = ({ className, onClick }) => {
  return <div className={className} onClick={onClick}></div>;
};

const PrevArrow = ({ className, onClick }) => {
  return <div className={className} onClick={onClick}></div>;
};

const MediaImage = ({ imageUrl, itemName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div>
      {!isLoaded && <div className="bg-gray-400 w-full" style={{height : '100vh'}}></div>}
      <img src={imageUrl} alt={`Gambar dari barang ${itemName}`} onLoad={() => setIsLoaded(true)}></img>
    </div>
  );
};

const MediaSlider = ({images, itemName}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    arrows: true,
    customPaging: (i) => (
      <div className="w-3.5 border-2 h-3.5  bg-white border-black rounded-full"></div>
    ),
    nextArrow: <NextArrow className=""></NextArrow>,
    prevArrow: <PrevArrow className=""></PrevArrow>,
    responsive: [
      {
        breakpoint: 790,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      {images && (
        <Slider {...settings}>
          {images.map((image, index) => {
            return <MediaImage key={index} imageUrl={image} itemName={itemName}></MediaImage>;
          })}
        </Slider>
      )}
    </div>
  );
};

export default MediaSlider;
