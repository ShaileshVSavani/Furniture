
// import React, { useEffect } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
// import PageHeading from "../common/PageHeading";
// import { PiMinus, PiPlus } from "react-icons/pi";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { data: cartProducts, totalAmount } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(getCartTotal());
//   }, [cartProducts, dispatch]);

//   const removeFromCart = (itemId) => {
//     dispatch(removeItem({ id: itemId }));
//     dispatch(getCartTotal());
//   };

//   const increaseQuantity = (itemId, currentQuantity) => {
//     dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
//     dispatch(getCartTotal());
//   };

//   const decreaseQuantity = (itemId, currentQuantity) => {
//     if (currentQuantity > 1) {
//       dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
//       dispatch(getCartTotal());
//     }
//   };

//   return (
//     <div>
//       <PageHeading home={"home"} pagename={"Cart"} />
//       <div className="w-10/12 m-auto">
//         <div className="mt-8">
//           {cartProducts.length === 0 ? (
//             <div className="text-3xl font-bold uppercase">
//               Your Cart has No Product
//             </div>
//           ) : (
//             <div>
//               <table className="w-full shadow-2xl rounded-2xl">
//                 <thead className="bg-gray-800 text-white font-semibold">
//                   <tr>
//                     <th className="px-4 py-2">Sr. No.</th>
//                     <th className="px-4 py-2 w-1/3">Product</th>
//                     <th className="px-4 py-2">Price</th>
//                     <th className="px-4 py-2">Quantity</th>
//                     <th className="px-4 py-2">SubTotal</th>
//                     <th className="px-4 py-2">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartProducts.map((item, index) => (
//                     <tr key={item.id} className="border">
//                       <td className="text-center px-4 py-2">{index + 1}</td>
//                       <td className="text-center px-4 py-2 w-1/3">
//                         <div className="flex items-center justify-center flex-col">
//                           <img
//                             src={item.img}
//                             alt="Product"
//                             className="h-40 w-40 object-contain mb-2"
//                           />
//                           <p className="font-semibold">{item.title}</p>
//                         </div>
//                       </td>
//                       <td className="text-center px-4 py-2">${item.price}</td>
//                       <td className="text-center px-4 py-2">
//                         <div className="flex items-center justify-center">
//                           <button
//                             className="border py-3 px-6"
//                             onClick={() => decreaseQuantity(item.id, item.quantity)}
//                           >
//                             <PiMinus />
//                           </button>
//                           <span className="border py-3 px-6 mx-2">
//                             {item.quantity || 1}
//                           </span>
//                           <button
//                             className="border py-3 px-6"
//                             onClick={() => increaseQuantity(item.id, item.quantity)}
//                           >
//                             <PiPlus />
//                           </button>
//                         </div>
//                       </td>
//                       <td className="text-center px-4 py-2">
//                         ${item.price * item.quantity}
//                       </td>
//                       <td className="text-center px-4 py-2">
//                         <span
//                           className="text-red-500 cursor-pointer"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <MdDeleteForever size={30} />
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="p-6 w-2/3 rounded-2xl shadow-2xl bg-white font-bold mt-4">
//                 <h1 className="mb-4 text-center text-3xl">Cart Total</h1>
//                 <h2 className="flex justify-between mt-3">
//                   Sub Total : <span>${totalAmount}</span>
//                 </h2>

//                 <div className="flex justify-between mt-3">
//                   Shipping Charge : <span>$10</span>
//                 </div>

//                 <div className="flex justify-between mt-3">
//                   Grand Total : <span>${totalAmount + 10}</span>
//                 </div>

//                 <div className="whitespace-nowrap flex items-center justify-between mt-4">
//                   <div className="px-4 py-2 common-hover rounded-lg text-white bg-gray-800">
//                     <Link to="/checkout">Proceed To Checkout</Link>
//                   </div>

//                   <div className="px-4 py-2 bg-rose-800 rounded-lg text-white">
//                     <Link to="/shop">Continue Shopping</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



//======================================================





import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector((state) => state.cart);
  
  // State for coupon code and discount
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartProducts, dispatch]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
    dispatch(getCartTotal());
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
      dispatch(getCartTotal());
    }
  };

  const handleApplyCoupon = () => {
    // Dummy coupon logic - you can replace this with an API call if needed
    if (couponCode === "DISCOUNT10") {
      setDiscount(10); // Applying a $10 discount
      toast.success("Coupon applied successfully!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const grandTotal = totalAmount + 10 - discount;

  return (
    <div>
      <PageHeading home={"home"} pagename={"Cart"} />
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div>
              <table className="w-full shadow-2xl rounded-2xl">
                <thead className="bg-gray-800 text-white font-semibold">
                  <tr>
                    <th className="px-4 py-2">Sr. No.</th>
                    <th className="px-4 py-2 w-1/3">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">SubTotal</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((item, index) => (
                    <tr key={item.id} className="border">
                      <td className="text-center px-4 py-2">{index + 1}</td>
                      <td className="text-center px-4 py-2 w-1/3">
                        <div className="flex items-center justify-center flex-col">
                          <img
                            src={item.img}
                            alt="Product"
                            className="h-40 w-40 object-contain mb-2"
                          />
                          <p className="font-semibold">{item.title}</p>
                        </div>
                      </td>
                      <td className="text-center px-4 py-2">${item.price}</td>
                      <td className="text-center px-4 py-2">
                        <div className="flex items-center justify-center">
                          <button
                            className="border py-3 px-6"
                            onClick={() => decreaseQuantity(item.id, item.quantity)}
                          >
                            <PiMinus />
                          </button>
                          <span className="border py-3 px-6 mx-2">
                            {item.quantity || 1}
                          </span>
                          <button
                            className="border py-3 px-6"
                            onClick={() => increaseQuantity(item.id, item.quantity)}
                          >
                            <PiPlus />
                          </button>
                        </div>
                      </td>
                      <td className="text-center px-4 py-2">
                        ${item.price * item.quantity}
                      </td>
                      <td className="text-center px-4 py-2">
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <MdDeleteForever size={30} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-6 w-2/3 rounded-2xl shadow-2xl bg-white font-bold mt-4">
                <h1 className="mb-4 text-center text-3xl">Cart Total</h1>
                <h2 className="flex justify-between mt-3">
                  Sub Total : <span>${totalAmount}</span>
                </h2>

                <div className="flex justify-between mt-3">
                  Shipping Charge : <span>$10</span>
                </div>

                <div className="flex justify-between mt-3">
                  Discount: <span>${discount}</span>
                </div>

                <div className="flex justify-between mt-3">
                  Grand Total : <span>${grandTotal}</span>
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="btn btn-outline w-full mt-2"
                    onClick={handleApplyCoupon}
                  >
                    Apply Coupon
                  </button>
                </div>

                <div className="whitespace-nowrap flex items-center justify-between mt-4">
                  <div className="px-4 py-2 common-hover rounded-lg text-white bg-gray-800">
                    <Link to="/checkout">Proceed To Checkout</Link>
                  </div>

                  <div className="px-4 py-2 bg-rose-800 rounded-lg text-white">
                    <Link to="/shop">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
