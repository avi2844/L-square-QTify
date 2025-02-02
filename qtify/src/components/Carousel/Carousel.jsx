import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ReactComponent as LeftIcon } from "../../assets/left-icon.svg";
import { ReactComponent as RightIcon } from "../../assets/right-icon.svg";

function NavigationButtons() {
  const swiper = useSwiper();

  return (
    <>
      <button style={{ ...buttonStyle, left: "-5px" }} onClick={() => swiper.slidePrev()}>
        <LeftIcon />
      </button>
      <button style={{ ...buttonStyle, right: "-5px" }} onClick={() => swiper.slideNext()}>
        <RightIcon />
      </button>
    </>
  );
}

function Carousel({ items }) {
  const swiper = useSwiper();

  return (
    <div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={2}
        slidesPerView={7}
      >
        {items.map((Component, index) => (
          <SwiperSlide key={index}>{Component}</SwiperSlide>
        ))}
        <NavigationButtons />
      </Swiper>
    </div>
  );
}

const buttonStyle = {
    position: "absolute",
    top: "30%",
    border: "none",
    background : "none",
    cursor: "pointer",
    zIndex: 50,
  };

export default Carousel;
