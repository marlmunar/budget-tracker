import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggingIn: false,
  grade: "Beginner",
  logPreferences: localStorage.getItem("logPreferences")
    ? JSON.parse(localStorage.getItem("logPreferences"))
    : null,
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
    setPreferences: (state, action) => {
      state.logPreferences = action.payload;
      localStorage.setItem("logPreferences", JSON.stringify(action.payload));
    },
  },
});

export default userSlice.reducer;
export const { setIsLoggingIn, setGrade, setPreferences } = userSlice.actions;
