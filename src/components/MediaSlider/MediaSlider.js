import Slider from "react-slick";


const NextArrow = ({className, onClick}) => {
  return (
    <div className={className} onClick={onClick}></div>
  )
}

const PrevArrow = ({className, onClick}) => {
  return (
    <div className={className} onClick={onClick}></div>
  )
}

const MediaSlider = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad : true,
    arrows : true,
    customPaging: i => (
      <div className="w-3.5 border-2 h-3.5  bg-white border-black rounded-full"></div>
    ),
    nextArrow : <NextArrow className=""></NextArrow>,
    prevArrow : <PrevArrow className=""></PrevArrow>,
    responsive : [{
      breakpoint : 790,
      settings : {
        arrows : false
      }
    }]
  };

  return (
    <div>
      <Slider {...settings}>
        {props.images.map((image, index) => {
          return (
              <img src={image} className="rounded-xl m-auto"></img>
          );
        })}
      </Slider>
    </div>
  );
};

export default MediaSlider;