import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/orderSlice';
import { emptyCart } from '../redux/cartSlice';

const Checkout = () => {
  const { totalAmount, data } = useSelector((state) => state.cart); // Cart total from redux
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [discount, setDiscount] = useState(10); // Assuming a discount for demonstration
  const shippingCharge = 10;
  const grandTotal = totalAmount + shippingCharge - discount;

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // dispatch(addOrder())

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

//   const handlePlaceOrder = () => {
//     // Validate form
//     if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.phone) {
//       toast.error('Please fill in all the shipping details!');
//       return;
//     }

//     // Process order (in a real app, you'd send the data to the backend here)
//     toast.success('Order placed successfully!');
//     setTimeout(() => {
//       navigate('/OrderConfirmation'); // Redirect to order confirmation page
//     }, 2000);
//     };
    
    
    const handlePlaceOrder = () => {
  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    items: data,
    totalAmount: totalAmount + 10, // Include shipping cost
    status: "Processing",
  };

  dispatch(addOrder(newOrder));
  dispatch(emptyCart()); // Clear cart after order
  navigate("/orderconfirmation");
};

    

  return (
    <div className="w-10/12 m-auto mt-8">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>

      {/* Order Summary */}
      <div className="shadow-2xl p-6 mt-6 rounded-2xl bg-white font-bold">
        <h2 className="text-2xl mb-4">Order Summary</h2>
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span>${totalAmount}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Shipping Charge:</span>
          <span>${shippingCharge}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Discount:</span>
          <span>${discount}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Grand Total:</span>
          <span>${grandTotal}</span>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="shadow-2xl p-6 mt-6 rounded-2xl bg-white font-bold">
        <h2 className="text-2xl mb-4">Shipping Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleInputChange}
          className="input input-bordered w-full mt-4"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="shadow-2xl p-6 mt-6 rounded-2xl bg-white font-bold">
        <h2 className="text-2xl mb-4">Payment Method</h2>
        <div className="flex flex-col space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={() => setPaymentMethod('credit-card')}
              className="radio mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="radio mr-2"
            />
            PayPal
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="radio mr-2"
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8 text-center">
        <button className="btn btn-primary w-1/3" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
