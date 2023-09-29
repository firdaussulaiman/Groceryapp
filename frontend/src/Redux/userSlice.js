import { createSlice } from "@reduxjs/toolkit";

const tokenLocalStorage = localStorage.getItem("token")

const initialState = {
  token : localStorage.getItem("token"),
  data: {
  name: "", // Add any other fields you need
  email: "",
  password: "",
  isAdmin: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.data = action.payload;
      state.data.email = action.payload.email;  // Access the entire payload
    },
    logoutRedux: (state, action) => {
      state.data = {};
      state.token = ""
      localStorage.clear()
    },
  },
});


export const { loginRedux, logoutRedux, setToken, } = userSlice.actions;

export default userSlice.reducer;
