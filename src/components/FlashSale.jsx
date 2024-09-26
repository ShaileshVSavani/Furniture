
import React, { useEffect, useState } from "react";
// import { products } from "../data/Data";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
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
    console.log("productId", productId);
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

  return (
    <div>
      <div className="w-11/12 m-auto">
        <Heading heading={"You are in Kitchen"} />
        <div className="grid grid-cols-4 gap-3">
          {products.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative group">
                <div className="image-container relative rounded-3xl">
                  <img
                    src={item.img}
                    alt="img"
                    className="rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Hover effects */}
                  <div className="opacity-0 absolute top-4 right-4 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex flex-col space-y-2">
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
        </div>
      </div>

      {/* Modal with overlay */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          ></div>

          {/* Modal content */}
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

export default FlashSale;




