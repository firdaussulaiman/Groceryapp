import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import Redux Thunk middleware
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productSlide";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSlideReducer,
  },

  // Add Redux Thunk middleware to the getDefaultMiddleware
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],

  devTools: process.env.NODE_ENV !== "production", // Enable DevTools in development only
});
