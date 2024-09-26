

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch initial wishlist data from db.json
const API_BASE_URL = "https://json-server-react-project.onrender.com";
export const fetchWishListData = createAsyncThunk("wishlist/fetchWishListData", async () => {
  const response = await fetch(`${API_BASE_URL}/wishlist`); // Assuming 'wishlist' is the key in db.json
  const data = await response.json();
  return data;
});

// Utility functions for localStorage
const loadWishListFromLocalStorage = () => {
  const savedWishList = localStorage.getItem('wishlist');
  return savedWishList ? JSON.parse(savedWishList) : [];
};

const saveWishListToLocalStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    data: loadWishListFromLocalStorage(), // Load initial data from localStorage
    wishlistTotalItems: 0,
    status: 'idle',  // To track loading
    error: null,     // To track errors
  },
  reducers: {
    addToWishList: (state, action) => {
      const existingProduct = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.data.push(action.payload);
      }
      state.wishlistTotalItems = state.data.length; // Update total count
      saveWishListToLocalStorage(state.data); // Save updated wishlist to localStorage
    },
    removeFromWishList: (state, action) => {
      state.data = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      state.wishlistTotalItems = state.data.length; // Update total count
      saveWishListToLocalStorage(state.data); // Save updated wishlist to localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishListData.pending, (state) => {
        state.status = "loading"; // When fetching starts
      })
      .addCase(fetchWishListData.fulfilled, (state, action) => {
        state.status = "succeeded"; // When data is successfully fetched
        state.data = action.payload; // Set data from json-server
        state.wishlistTotalItems = state.data.length; // Update total count

        // Update localStorage with the fetched data
        saveWishListToLocalStorage(state.data);
      })
      .addCase(fetchWishListData.rejected, (state, action) => {
        state.status = "failed"; // In case of error
        state.error = action.error.message;
      });
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export const wishListReducer = wishListSlice.reducer;
