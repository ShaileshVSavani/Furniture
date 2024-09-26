import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  // const isAdmin = JSON.parse(localStorage.getItem('admin'));
  // const isLoggedIn = JSON.parse(localStorage.getItem('admin'))?.isAdmin;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
