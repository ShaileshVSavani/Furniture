
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [], // Fetching from localStorage
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.orders)); // Update localStorage
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export const orderReducer = ordersSlice.reducer;
