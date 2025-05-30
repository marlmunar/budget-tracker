import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import userReducer from "./slices/userSlice.js";
import logsReducer from "./slices/logSlice.js";
import appReducer from "./slices/appSlice.js";
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    logs: logsReducer,
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
