
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../redux/wishListSlice";

const Wishlist = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { data: wishlistProducts } = useSelector((state) => state.wishlist);

  const MoveToCart = (product) => {
    let totalPrice = qty * product.price;

    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(removeFromWishList({ id: product.id })); // Remove from wishlist after adding to cart
    dispatch(getCartTotal());
  };

  const removeFromWishlist = (itemId) => {
    dispatch(removeFromWishList({ id: itemId }));
    dispatch(getCartTotal());
  };

  return (
    <div>
      <PageHeading home={"home"} pagename={"Wishlist"} />
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {wishlistProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Wish List is Empty
            </div>
          ) : (
            <div className="w-full shadow-2xl rounded-2xl overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-blue-950 text-white font-semibold">
                  <tr>
                    <th className="px-4 py-3">Sr. No.</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistProducts.map((item, index) => (
                    <tr key={item.id} className="border-t">
                      <td className="text-center px-4 py-3">{index + 1}</td>
                      <td className="text-center px-4 py-3">
                        <div className="flex flex-col items-center">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="h-40 w-40 object-contain mb-2"
                          />
                          <p className="font-semibold text-gray-800">
                            {item.title}
                          </p>
                        </div>
                      </td>
                      <td className="text-center px-4 py-3">${item.price}</td>
                      <td className="text-center px-4 py-3">
                        <div className="flex flex-col space-y-2 items-center">
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-500 px-3 py-1 border border-red-500 rounded-md hover:bg-red-700 hover:text-white transition-colors duration-300 w-2/3"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => MoveToCart(item)}
                            className="text-green-600 px-4 py-2 rounded-md border border-green-500 hover:bg-green-700 hover:text-white transition-colors duration-300 w-2/3"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;



