import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload?.name;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
