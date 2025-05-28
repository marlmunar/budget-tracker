import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import userReducer from "./slices/userSlice.js";
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
