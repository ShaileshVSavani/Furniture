

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Thunk to fetch initial cart data from the db.json
// const API_BASE_URL = "https://json-server-react-project.onrender.com";
// export const fetchCartData = createAsyncThunk("cart/fetchCartData", async () => {
//   const response = await fetch(`${API_BASE_URL}/cart`); // Assuming 'cart' is the key in db.json
//   const data = await response.json();
//   return data;
// });

// // Utility functions for localStorage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : [];
// };

// const saveCartToLocalStorage = (cart) => {
//   localStorage.setItem('cart', JSON.stringify(cart));
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     data: loadCartFromLocalStorage(), // Load initial data from localStorage
//     totalAmount: 0,
//     totalItems: 0,
//     status: 'idle',  // New state to track loading
//     error: null,     // New state to track errors
//   },

//   reducers: {
//     addToCart(state, action) {
//       const existingProduct = state.data.find(
//         (product) => product.id === action.payload.id
//       );

//       if (existingProduct) {
//         const tempCart = state.data.map((product) => {
//           if (product.id === action.payload.id) {
//             let newQty = product.quantity + action.payload.quantity;
//             let newTotalPrice = newQty * product.price;

//             return {
//               ...product,
//               quantity: newQty,
//               totalPrice: newTotalPrice,
//             };
//           } else {
//             return product;
//           }
//         });
//         state.data = tempCart;
//       } else {
//         state.data.push(action.payload);
//       }

//       // Save updated cart to localStorage
//       saveCartToLocalStorage(state.data);
//     },

//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;

//       const productIndex = state.data.findIndex((product) => product.id === id);
//       if (productIndex !== -1) {
//         const updateProduct = {
//           ...state.data[productIndex],
//           quantity: Math.max(quantity || 1, 1),
//         };
//         updateProduct.totalPrice = updateProduct.price * updateProduct.quantity;

//         state.data[productIndex] = updateProduct;
        
//         // Save updated cart to localStorage
//         saveCartToLocalStorage(state.data);
//       }
//     },

//     removeItem(state, action) {
//       const tempCart = state.data.filter(
//         (product) => product.id !== action.payload.id
//       );
//       state.data = tempCart;

//       // Save updated cart to localStorage
//       saveCartToLocalStorage(state.data);
//     },

//     getCartTotal(state) {
//       state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
//         return (cartTotal += cartItem.totalPrice);
//       }, 0);

//       state.totalItems = state.data.length;
//     },
//     emptyCart: (state) => {
//       // state.data = [];
//       state.data = localStorage.removeItem('cart');
//       state.totalAmount = 0;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartData.pending, (state) => {
//         state.status = "loading"; // When fetching starts
//       })
//       .addCase(fetchCartData.fulfilled, (state, action) => {
//         state.status = "succeeded"; // When data is successfully fetched
//         state.data = action.payload; // Set data from json-server

//         // Also update localStorage with the fetched data
//         saveCartToLocalStorage(state.data);
//       })
//       .addCase(fetchCartData.rejected, (state, action) => {
//         state.status = "failed"; // In case of error
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addToCart, updateQuantity, removeItem, getCartTotal , emptyCart } = cartSlice.actions;

// export const cartReducer = cartSlice.reducer;


//================================



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch initial cart data from the db.json
const API_BASE_URL = "https://json-server-react-project.onrender.com";
export const fetchCartData = createAsyncThunk("cart/fetchCartData", async () => {
  const response = await fetch(`${API_BASE_URL}/cart`); // Assuming 'cart' is the key in db.json
  const data = await response.json();
  return data;
});

// Utility functions for localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: loadCartFromLocalStorage(), // Load initial data from localStorage
    totalAmount: 0,
    totalItems: 0,
    status: 'idle',  // New state to track loading
    error: null,     // New state to track errors
  },

  reducers: {
    addToCart(state, action) {
      const existingProduct = state.data.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        const tempCart = state.data.map((product) => {
          if (product.id === action.payload.id) {
            let newQty = product.quantity + action.payload.quantity;
            let newTotalPrice = newQty * product.price;

            return {
              ...product,
              quantity: newQty,
              totalPrice: newTotalPrice,
            };
          } else {
            return product;
          }
        });
        state.data = tempCart;
      } else {
        state.data.push(action.payload);
      }

      // Save updated cart to localStorage
      saveCartToLocalStorage(state.data);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const productIndex = state.data.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const updateProduct = {
          ...state.data[productIndex],
          quantity: Math.max(quantity || 1, 1),
        };
        updateProduct.totalPrice = updateProduct.price * updateProduct.quantity;

        state.data[productIndex] = updateProduct;
        
        // Save updated cart to localStorage
        saveCartToLocalStorage(state.data);
      }
    },

    removeItem(state, action) {
      const tempCart = state.data.filter(
        (product) => product.id !== action.payload.id
      );
      state.data = tempCart;

      // Save updated cart to localStorage
      saveCartToLocalStorage(state.data);
    },

    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.totalItems = state.data.length;
    },
    emptyCart: (state) => {
      // Clear cart data and localStorage
      state.data = [];
      localStorage.removeItem('cart');
      state.totalAmount = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading"; // When fetching starts
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "succeeded"; // When data is successfully fetched
        state.data = action.payload; // Set data from json-server

        // Also update localStorage with the fetched data
        saveCartToLocalStorage(state.data);
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed"; // In case of error
        state.error = action.error.message;
      });
  },
});

export const { addToCart, updateQuantity, removeItem, getCartTotal, emptyCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
