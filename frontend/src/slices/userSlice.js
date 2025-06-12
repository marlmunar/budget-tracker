import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggingIn: false,
  grade: "Beginner",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },
    setGrade(state, action) {
      state.grade = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setIsLoggingIn, setGrade } = userSlice.actions;
