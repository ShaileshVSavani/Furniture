import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  isAdmin: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    checkLogin: (state) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        state.user = storedUser.user;
        state.isAdmin = storedUser.isAdmin;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logout, checkLogin } = authSlice.actions;
// export default authSlice.reducer;
export const authReducer = authSlice.reducer
