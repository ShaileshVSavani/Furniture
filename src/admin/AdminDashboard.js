import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin } from '../../redux/slices/authSlice';
import AddProduct from './AddProduct';
import ProductList from '../User/ProductList';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <p>Please login to access the admin panel.</p>;
  }

  if (!isAdmin) {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddProduct />
      <ProductList /> {/* You might want to list products here for admin review */}
    </div>
  );
};

export default AdminDashboard;
