
import React, { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import { IoMdHeartEmpty } from "react-icons/io";
import ModalWishList from "../common/ModalWishList";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";

const FlashSale = () => {
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
  };

  const handleCloseWishList = () => {
    setIsModalOpenWishList(null);
  };

  return (
    <div className="w-11/12 mx-auto mt-4">
      <Heading heading={"You are in Kitchen"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {products.map((item, index) => (
          <div key={index} className="mt-8">
            <div className="overflow-hidden relative group">
              <div className="image-container relative rounded-3xl">
                <img
                  src={item.img}
                  alt="img"
                  className="rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105 w-full h-auto object-cover sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-full lg:h-auto" // Full size on large screens
                />

                {/* Hover effects */}
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
      </div>

      {/* Modal with overlay */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Modal
              data={products.find((item) => item.id === isModalOpen)}
              isModalOpen={isModalOpen}
              handleClose={handleClose}
            />
          </div>
        </>
      )}

      {/* Modal with overlay */}
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

export default FlashSale;
