import { createSlice } from "@reduxjs/toolkit";





const initialState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      //   state.user = action.payload.data;
      state.email = action.payload.data.email;
    },
    logoutRedux: (state, action) => {
      state.email = "";
    },
  },
});

export const { loginRedux ,logoutRedux,} = userSlice.actions;

export default userSlice.reducer;