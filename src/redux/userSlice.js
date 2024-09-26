
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.email === credentials.email && user.password === credentials.password
    );

    if (user) {
      // Save the login state in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return { user, token: "dummy-token" }; // Replace "dummy-token" with actual token logic if needed
    } else {
      return rejectWithValue("Invalid email or password. Sign up first.");
    }
  }
);

// Thunk for user signup
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, { rejectWithValue }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
      return rejectWithValue("User already exists");
    }

    users.push({ ...userData });
    localStorage.setItem("users", JSON.stringify(users));
    return { user: userData, token: "dummy-token" };
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null, // Get user from localStorage
  token: null,
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("loggedInUser"), // Check if user is logged in based on localStorage
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;

      // Remove the logged-in user from localStorage
      localStorage.removeItem("loggedInUser");
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.users = action.payload.user;
  //       state.token = action.payload.token;
  //       state.isLoggedIn = true;
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload || "Login failed";
  //       state.isLoggedIn = false;
  //     })
  //     .addCase(signupUser.fulfilled, (state, action) => {
  //       state.users = action.payload.user;
  //       state.token = action.payload.token;
  //       state.isLoggedIn = true;
  //     });
  // },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isLoggedIn = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.users = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null; // Clear any existing errors on successful signup
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed"; // Store the error in Redux state
      });
  },
  
});

// Export the logout action
export const { logoutUser } = userSlice.actions;

// Export the reducer
export const userReducer = userSlice.reducer;


