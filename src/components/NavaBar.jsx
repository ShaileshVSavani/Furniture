
import React, { useEffect, useState } from "react";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import SidebarWishList from "../common/SidebarWishList";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { logoutUser } from "../redux/userSlice";

const NavaBar = () => {
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isWishListSidebarOpen, setIsWishListSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.users);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCartSidebar = () => {
    setIsCartSidebarOpen(!isCartSidebarOpen);
  };

  const toggleWishListSidebar = () => {
    setIsWishListSidebarOpen(!isWishListSidebarOpen);
  };

  const { totalItems } = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.wishlist);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu
  };

  return (
    <>
      <header
        className={`bg-white ${
          sticky ? "sticky top-0 z-50 shadow-lg" : ""
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/images/logo.jpg" alt="Logo" className="h-16 sm:h-20 w-auto" />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 text-3xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Links for larger screens */}
          <nav className="hidden sm:flex space-x-6 text-gray-700 text-lg font-medium">
            <Link to="/" className="hover:text-gray-900 transition-colors duration-300">
              Home
            </Link>
            <Link to="/shop" className="hover:text-gray-900 transition-colors duration-300">
              Shop
            </Link>
            <Link to="/blog" className="hover:text-gray-900 transition-colors duration-300">
              Blog
            </Link>
            <Link to="/about" className="hover:text-gray-900 transition-colors duration-300">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-gray-900 transition-colors duration-300">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="absolute top-16 left-0 w-full bg-white sm:hidden z-50 shadow-lg flex flex-col items-center space-y-6 text-gray-700 text-lg font-medium py-4"
            >
              <Link onClick={toggleMenu} to="/" className="hover:text-gray-900">
                Home
              </Link>
              <Link onClick={toggleMenu} to="/shop" className="hover:text-gray-900">
                Shop
              </Link>
              <Link onClick={toggleMenu} to="/blog" className="hover:text-gray-900">
                Blog
              </Link>
              <Link onClick={toggleMenu} to="/about" className="hover:text-gray-900">
                About Us
              </Link>
              <Link onClick={toggleMenu} to="/contact" className="hover:text-gray-900">
                Contact Us
              </Link>
            </motion.nav>
          )}

          {/* Icons Section */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Wishlist Icon */}
            <button
              onClick={toggleWishListSidebar}
              className="relative text-gray-700 hover:text-gray-900 text-2xl"
            >
              <HiOutlineHeart />
              {data.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {data.length}
                </div>
              )}
            </button>

            {/* User Icon */}
            <div onClick={() => setShowUser(!showUser)} className="relative flex items-center cursor-pointer">
              <HiOutlineUser className="text-gray-700 hover:text-gray-900 text-2xl" />
              {isLoggedIn && <span className="ml-2 hidden sm:block">{user?.userName}</span>}
              <FaCaretDown className="ml-1 hidden sm:block" />
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-10 -right-16 sm:top-16 z-50 bg-gray-800 w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  <Link onClick={() => setShowUser(false)} to="/login">
                    {isLoggedIn ? (
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        <button onClick={handleLogOut}>Log Out</button>
                      </li>
                    ) : (
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    )}
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Sign Up
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/product">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Add Product
                    </li>
                  </Link>
                </motion.ul>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCartSidebar}
              className="relative text-gray-700 hover:text-gray-900 text-2xl"
            >
              <MdOutlineShoppingBag />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* WishList Sidebar */}
      <SidebarWishList
        isSidebarOpen={isWishListSidebarOpen}
        closeSidebar={toggleWishListSidebar}
      />

      {/* Cart Sidebar */}
      <Sidebar
        isSidebarOpen={isCartSidebarOpen}
        closeSidebar={toggleCartSidebar}
      />
    </>
  );
};

export default NavaBar;

