
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../common/PageHeading";
import Modal from "../common/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import { getProducts } from "../redux/productSlice";
import ModalWishList from "../common/ModalWishList";
// import { getProducts } from "../redux/slices/productSlice"; // Adjust the import path as needed

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [isModalOpenWishList, setIsModalOpenWishList] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1500],
  });

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

  const categoryList = Array.from(
    new Set(products.map((product) => product.category))
  );
  const brandList = Array.from(
    new Set(products.map((product) => product.brand))
  );

  const filteredProducts = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    )
      return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand))
      return false;

    const price = parseFloat(product.price);

    if (price < filters.priceRange[0] || price > filters.priceRange[1])
      return false;

     // Search filter
     if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;

    return true;
  });

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = [...filters[filterType]];
    const index = updatedFilters.indexOf(value);
    if (index === -1) {
      updatedFilters.push(value);
    } else {
      updatedFilters.splice(index, 1);
    }
    setFilters({ ...filters, [filterType]: updatedFilters });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PageHeading home={"home"} pagename={"Shop"} />
      <div>
        <div className="w-11/12 m-auto flex gap-3 items-start mt-8">
          <div className="filterproduct w-1/4 bg-white shadow-lg p-4">
            <div>
              <div className="my-4">
                <h1 className="text-4xl font-semibold">Filter</h1>
                <hr />
              </div>

              <div className="my-4">
                <h1 className="mb-3 text-3xl font-semibold">By Price</h1>
                <div>
                  <Slider
                    min={0}
                    max={1500}
                    range
                    defaultValue={filters.priceRange}
                    onChange={handlePriceChange}
                  />
                  <div className="flex justify-between">
                    <span>Min Price: ${filters.priceRange[0]}</span>
                    <span>Max Price: ${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <h1 className="mb-3 text-3xl font-semibold">By Category</h1>
                <div>
                  {categoryList.map((category, key) => (
                    <div className="flex items-center" key={key}>
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() =>
                          handleCheckboxChange("categories", category)
                        }
                      />
                      <div className="mx-2">{category}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-4">
                <h1 className="mb-3 text-3xl font-semibold">By Brand</h1>
                <div>
                  {brandList.map((brand, key) => (
                    <div className="flex items-center" key={key}>
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleCheckboxChange("brands", brand)}
                      />
                      <div className="mx-2">{brand}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mb-4 flex-col">
              <h1 className="text-3xl font-semibold mb-2">By Search</h1>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="border p-2 rounded-lg w-full"
              />
            </div>
            </div>
          </div>

          <div className="w-8/12">
            <div className="grid grid-cols-3 gap-3">
              {filteredProducts.map((item) => (
                <div key={item.id}>
                  <div className="overflow-hidden relative ml-4">
                    <div className="image-container relative">
                      <div className="rounded-3xl">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="rounded-3xl hover:scale-105 duration-500"
                        />
                      </div>
                      <div className="opacity-0 absolute top-0 right-0 m-4">
                        <div>
                          {/* <div className="bg-white p-4 rounded-full mb-2">
                            <IoMdHeartEmpty />
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
                          {/* <div className="bg-white p-4 rounded-full">
                            <IoMdSearch />
                          </div> */}
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
              ))}
            </div>
          </div>
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
    </div>
  );
};

export default Shop;








