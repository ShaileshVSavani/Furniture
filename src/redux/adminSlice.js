// redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk('user/loginAdmin', async (credentials) => {
  // Implement your login logic here
  // For example:
  const response = await axios.post('/api/admin/login', credentials);
  return response.data;
});

export const signupAdmin = createAsyncThunk('user/signupAdmin', async (credentials) => {
  // Implement your signup logic here
  const response = await axios.post('/api/admin/signup', credentials);
  return response.data;
});

const adminSlice = createSlice({
  name: 'user',
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Handle signup success
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = adminSlice.actions;

// export default adminSlice.reducer;

export const adminReducer = adminSlice.reducer
