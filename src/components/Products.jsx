import React, { useEffect, useState } from "react";
// import { products } from "../data/Data";
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
  IoMdSearch,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ModalWishList from "../common/ModalWishList";

const BestSeller = () => {

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isModalOpenWishList, setIsModalOpenWishList] = useState(null);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    console.log("productId", productId);
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
    dots: false, // Enable dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <div>
      <div className="products w-11/12 m-auto">
        <Heading heading={"Top Sellers"} />
        <Slider {...settings}>
          {/* {products.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative ml-4">
                <div className="image-container relative">
                  <div className="rounded-3xl">
                    <img src={item.img} alt="img" className="rounded-3xl" />
                  </div>

                  <div className="opacity-0 absolute top-0 right-0 m-4">
                    <div>
                      <div className="bg-white p-4 rounded-full mb-2">
                        <IoMdHeartEmpty />
                      </div>
                      <div className="bg-white p-4 rounded-full">
                        <IoMdSearch />
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
                    <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                      <button
                        className="text-2xl"
                        onClick={() => handleOpen(item.id)}
                      >
                        <BiCart />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details mt-2">
                  <p className="mb-2">{item.title}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          ))} */}
           {products.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative group">
                <div className="image-container relative rounded-3xl mx-4">
                  <img
                    src={item.img}
                    alt="img"
                    className="rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Hover effects */}
                  <div className="opacity-0 absolute top-4 right-4 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex flex-col space-y-2">
                      {/* <div className="bg-white p-2 rounded-full shadow">
                        <IoMdHeartEmpty size={20} />
                      </div> */}
                       <div className="bg-white p-2 rounded-full shadow">
                            {/* <IoMdHeartEmpty size={20} /> */}
                            <button
                              className="text-2xl"
                              onClick={() => handleOpenWishList(item.id)}
                            >
                              <IoMdHeartEmpty size={20} />
                            </button>
                          </div>
                      {/* <div className="bg-white p-2 rounded-full shadow">
                        <IoMdSearch size={20} />
                      </div> */}
                    </div>
                  </div>

                  {/* Cart icon sliding from the bottom */}
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

      {/* Modal with overlay */}
      {isModalOpenWishList && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCloseWishList}
            ></div>

            {/* Modal content */}
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




