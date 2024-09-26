
import React from "react";
import { banners } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Banner = () => {
  // Custom previous arrow component
  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-4 top-1/2 transform-translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white p-2 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundBack size={30} />
    </div>
  );

  // Custom next arrow component
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-4 top-1/2 transform-translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white p-2 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundForward size={30} />
    </div>
  );

  var settings = {
    dots: true, // Enable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time between slides (3000ms = 3 seconds)
    prevArrow: <PrevArrow />, // Use custom prev arrow
    nextArrow: <NextArrow />, // Use custom next arrow
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    ),
    dotsClass: "slick-dots custom-dots", // Custom class for dots
  };

  return (
    <div className="banner mt-2">
      <div className="w-11/12 m-auto">
        <div className="w-full relative">
          <Slider {...settings}>
            {banners.map((data, key) => (
              <div className="banner-slider rounded-3xl" key={key}>
                <img
                  src={data.banner}
                  alt="databannerinmg"
                  className="rounded-3xl ov"
                  width={"100%"}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Banner;




