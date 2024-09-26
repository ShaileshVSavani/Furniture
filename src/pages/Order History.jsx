import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  // Fetch orders from Redux store or localStorage
  const orders = useSelector((state) => state.order.orders);
  
  const [formattedOrders, setFormattedOrders] = useState([]);

  useEffect(() => {
    // Format the orders data to include additional info if needed
    setFormattedOrders(orders);
  }, [orders]);

  return (
    <div className="w-10/12 m-auto mt-8">
      <h1 className="text-3xl font-bold text-center">Order History</h1>
      {formattedOrders.length === 0 ? (
        <div className="mt-8 text-center text-xl">You have no past orders.</div>
      ) : (
        <div className="mt-8">
          <table className="w-full shadow-2xl rounded-2xl">
            <thead className="bg-gray-800 text-white font-semibold">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {formattedOrders.map((order, index) => (
                <tr key={order.id} className="border">
                  <td className="text-center px-4 py-2">{order.id}</td>
                  <td className="text-center px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="text-center px-4 py-2">
                    {order.items.map((item) => (
                      <p key={item.id}>{item.title} (x{item.quantity})</p>
                    ))}
                  </td>
                  <td className="text-center px-4 py-2">${order.totalAmount}</td>
                  <td className="text-center px-4 py-2">{order.status}</td>
                  <td className="text-center px-4 py-2">
                    <Link
                      to={`/order/${order.id}`}
                      className="text-blue-600 underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
