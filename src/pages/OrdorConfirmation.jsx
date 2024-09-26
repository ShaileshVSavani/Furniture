// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { emptyCart } from '../redux/cartSlice';

// const OrderConfirmation = ({ orderId }) => { // Ensure you have the orderId available
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleOrderDetail = () => {
//         navigate(`/orderDetail/${orderId}`); // Use backticks for template literals
//         dispatch(emptyCart());
//     };

//     return (
//         <div className="w-10/12 m-auto mt-8">
//             <h1 className="text-3xl font-bold text-center">Order Confirmed</h1>
//             <p className="mt-4 text-center">Thank you for your purchase!</p>
//             <p className="mt-2 text-center">Your order has been placed successfully and will be processed soon.</p>
//             <div className="mt-6 text-center">
//                 <button className="btn btn-primary" onClick={handleOrderDetail}>Go to Order History</button>
//             </div>
//         </div>
//     );
// };

// export default OrderConfirmation;



//=========================


import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../redux/cartSlice';

const OrderConfirmation = ({ newOrder }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOrderDetail = () => {
      navigate("/orderDetail", { state: { orderId: newOrder.id } }); // Pass the orderId in state
      dispatch(emptyCart());
  };
  

    return (
        <div className="w-10/12 m-auto mt-8">
            <h1 className="text-3xl font-bold text-center">Order Confirmed</h1>
            <p className="mt-4 text-center">Thank you for your purchase!</p>
            <p className="mt-2 text-center">Your order has been placed successfully and will be processed soon.</p>
            <div className="mt-6 text-center">
                <button className="btn btn-primary" onClick={handleOrderDetail}>Go to Order History</button>
            </div>
        </div>
    );
};

export default OrderConfirmation;

