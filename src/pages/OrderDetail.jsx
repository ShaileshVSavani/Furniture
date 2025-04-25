
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { orderId } = location.state || {}; // Access orderId from state

  // If orderId is not provided, show an error message
  if (!orderId) {
    return <div>Order ID not found!</div>;
  }

  // Access orders from the Redux store
  const orders = useSelector((state) => state.order.orders);
  console.log("Orders in Redux store:", orders);

  // Convert the orderId to a number for comparison
  const matchedOrder = orders.find((order) => order.id === Number(orderId));
  console.log("Matched Order based on orderId:", matchedOrder);

  if (!matchedOrder) {
    return <div>Order not found!</div>;
  }

  // Logging localStorage data
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log("Orders in LocalStorage:", storedOrders);

  return (
    <div className="w-10/12 m-auto mt-8">
      <h1 className="text-3xl font-bold text-center">Order Details</h1>
      <div className="mt-8 p-6 rounded-lg shadow-2xl bg-white">
        <p><strong>Order ID:</strong> {matchedOrder.id}</p>
        <p><strong>Date:</strong> {new Date(matchedOrder.date).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ${matchedOrder.totalAmount}</p>
        <p><strong>Status:</strong> {matchedOrder.status}</p>

        <h2 className="mt-6 text-2xl">Items Purchased</h2>
        {matchedOrder.items.map((item) => (
          <div key={item.id} className="mt-4">
            <p>{item.title} (x{item.quantity})</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
