

// import React, { useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartTotal, removeItem } from "../redux/cartSlice";
// import { Link } from "react-router-dom";

// const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
//   const dispatch = useDispatch();
//   const { data: cartProducts, totalAmount } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(getCartTotal());
//   }, [dispatch, cartProducts]);

//   const removeFromCart = (itemId) => {
//     dispatch(removeItem({ id: itemId }));
//     dispatch(getCartTotal());
//   };

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
//     >
//       <div className="border-b mb-4 relative">
//         <button
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
//           onClick={closeSidebar}
//         >
//           <FaTimes size={24} />
//         </button>
//         <h1 className="text-3xl p-4 text-center">Your Cart</h1>
//       </div>

//       <div className="p-4">
//         {cartProducts. === 0 ? (
//           <div className="text-xl font-semibold uppercase text-center mt-12">
//             Your Cart is Empty
//           </div>
//         ) : (
//           <div>
//             {cartProducts.map((item) => (
//               <div className="flex justify-between items-center mb-4" key={item.id}>
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     <img src={item.img} alt={item.title} className="w-16 h-16 object-cover" />
//                     <button
//                       className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <FaTimes size={16} />
//                     </button>
//                   </div>
//                   <div>
//                     <p className="text-lg font-medium">{item.title}</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-lg font-medium">${item.price}</p>
//                   <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-between items-center p-6 bg-gray-900 text-white font-bold">
//               <h2 className="text-lg">
//                 Sub Total: <span className="ml-1">${totalAmount.toFixed(2)}</span>
//               </h2>
//               <Link to="/cart" className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded">
//                  <button onClick={() =>closeSidebar()}>View Cartt</button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




//==============



import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch, cartProducts]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="border-b mb-4 relative">
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
          onClick={closeSidebar}
        >
          <FaTimes size={24} />
        </button>
        <h1 className="text-3xl p-4 text-center">Your Cart</h1>
      </div>

      <div className="p-4">
        {cartProducts.length === 0 ? (
          <div className="text-xl font-semibold uppercase text-center mt-12">
            Your Cart is Empty
          </div>
        ) : (
          <div>
            {cartProducts.map((item) => (
              <div className="flex justify-between items-center mb-4" key={item.id}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img src={item.img} alt={item.title} className="w-16 h-16 object-cover" />
                    <button
                      className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-medium">{item.title}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium">${item.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-6 bg-gray-900 text-white font-bold">
              <h2 className="text-lg">
                Sub Total: <span className="ml-1">${totalAmount.toFixed(2)}</span>
              </h2>
              <Link to="/cart" className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded">
                <button onClick={() => closeSidebar()}>View Cart</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
