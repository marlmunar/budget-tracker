import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggingIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setIsLoggingIn } = userSlice.actions;
