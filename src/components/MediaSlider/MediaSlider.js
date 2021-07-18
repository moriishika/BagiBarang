import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const MediaSlider = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  return (
    <div>
      <div ref={sliderRef} className="keen-slider rounded-xl">
        {props.images.map((image, index) => {
          return (
            <div
              className={`keen-slider__slide number-slide${index} rounded-xl flex justify-center items-center`}
            >
              <div className="h-auto">
                <img
                  src={`/assets/images/items/${image}`}
                  className="rounded-xl"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full h-6 justify-center items-center">
        {slider && (
          <div className="dots">
            {[...Array(slider.details().size).keys()].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider.moveToSlideRelative(idx);
                  }}
                  className={
                    "w-3.5 border-2 h-3.5 mx-1 mt-1 rounded-full" +
                    (currentSlide === idx
                      ? " bg-white border-black"
                      : " bg-black")
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSlider;
