import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      //   state.user = action.payload.data;
 
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;

    },
    logoutRedux: (state, action) => {
      state.name = "";
      state.email = "";
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;