// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Cart from "../pages/Cart";
// import Shop from "../pages/Shop";
// import Contact from "../pages/Contact";
// import AboutUs from "../pages/AboutUs";
// // import Blog from "../pages/Blog";
// import NotFoundPage from "../pages/NotFoundPage";
// import Wishlist from "../pages/WishList";
// import Login from "../pages/Login";
// import SignUp from "../pages/SignUp";
// import Profile from "../pages/Profile";
// import Users from "../pages/Users";
// import AddProduct from "../pages/Add Product";



// const AllRoutes = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<AboutUs />} />
//         {/* <Route path="/blog" element={<Blog />} /> */}
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/user" element={<Users />} />
//         <Route path="/product" element={<AddProduct />} />
//         <Route path="/*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default AllRoutes;
//================================================

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import NotFoundPage from "../pages/NotFoundPage";
import Wishlist from "../pages/WishList";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import AddProduct from "../pages/Add Product";
import PrivateRoute from "./privateRoute";
import Blog from "../pages/Blog";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrdorConfirmation";
import OrderDetails from "../pages/OrderDetail";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />
         <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
         <Route
          path="/orderconfirmation"
          element={
            <PrivateRoute>
              <OrderConfirmation />
            </PrivateRoute>
          }
        />
           <Route
          path="/orderDetail"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />
      {/* <Route path="/orderDetail/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} /> */}
        {/* Fallback for 404 Not Found */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;


//=======
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Cart from "../pages/Cart";
// import Shop from "../pages/Shop";
// import Contact from "../pages/Contact";
// import AboutUs from "../pages/AboutUs";
// import NotFoundPage from "../pages/NotFoundPage";
// import Wishlist from "../pages/WishList";
// import Login from "../pages/Login";
// import SignUp from "../pages/SignUp";
// import Profile from "../pages/Profile";
// import Users from "../pages/Users";
// import AddProduct from "../pages/Add Product";
// import PrivateRoute from "./privateRoute";
// import Blog from "../pages/Blog";
// import Checkout from "../pages/Checkout";
// import OrderConfirmation from "../pages/OrderConfirmation"; // Ensure correct import
// import OrderDetails from "../pages/OrderDetail";

// const AllRoutes = () => {
//   return (
//     <div>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* Private routes */}
//         <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
//         <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
//         <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
//         <Route path="/about" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
//         <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
//         <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//         <Route path="/user" element={<PrivateRoute><Users /></PrivateRoute>} />
//         <Route path="/product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
//         <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
//         <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        
//         <Route path="/orderconfirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />

//         {/* Single route for order details */}
//         <Route path="/orderDetail" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
        
//         {/* Fallback for 404 Not Found */}
//         <Route path="/*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default AllRoutes;
