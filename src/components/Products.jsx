

import React, { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoMdHeartEmpty,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ModalWishList from "../common/ModalWishList";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isModalOpenWishList, setIsModalOpenWishList] = useState(null);

  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };

  const handleOpenWishList = (productId) => {
    setIsModalOpenWishList(productId);
  };

  const handleCloseWishList = () => {
    setIsModalOpenWishList(null);
  };

  // Custom previous arrow component
  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-1/2 transform-translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white p-2 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundBack size={30} />
    </div>
  );

  // Custom next arrow component
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-1/2 transform-translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white p-2 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundForward size={30} />
    </div>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div>
      <div className="products w-11/12 m-auto">
        <Heading heading={"Top Sellers"} />
        <Slider {...settings}>
          {products.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative group">
                <div className="image-container relative rounded-3xl mx-4">
                  <img
                    src={item.img}
                    alt="img"
                    className="rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  <div className="opacity-0 absolute top-4 right-4 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex flex-col space-y-2">
                      <div className="bg-white p-2 rounded-full shadow">
                        <button
                          className="text-2xl"
                          onClick={() => handleOpenWishList(item.id)}
                        >
                          <IoMdHeartEmpty size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="opacity-0 absolute bottom-4 right-4 transform translate-y-6 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-full">
                      <button
                        className="text-2xl"
                        onClick={() => handleOpen(item.id)}
                      >
                        <BiCart />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details mt-2 text-center">
                  <p className="mb-2 font-semibold">{item.title}</p>
                  <p className="">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Modal
        data={products.find((item) => item.id === isModalOpen)}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />

      {isModalOpenWishList && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseWishList}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalWishList
              data={products.find((item) => item.id === isModalOpenWishList)}
              isModalOpenWishList={isModalOpenWishList}
              handleCloseWishList={handleCloseWishList}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BestSeller;
