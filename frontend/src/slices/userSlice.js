import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggingIn: false,
  logPreferences: localStorage.getItem("logPreferences")
    ? JSON.parse(localStorage.getItem("logPreferences"))
    : {
        currency: "PHP",
        defaultCategories: [
          {
            name: "Food",
            color: "#82E0AA",
            type: "Expense",
          },
          {
            name: "Savings",
            color: "#F7DC6F",
            type: "Income",
          },
          {
            name: "Health",
            color: "#A569BD",
            type: "Expense",
          },
          {
            name: "Housing",
            color: "#5DADE2",
            type: "Expense",
          },
          {
            name: "Bills",
            color: "#FF7F50",
            type: "Expense",
          },
          {
            name: "Transportation",
            color: "#40E0D0",
            type: "Expense",
          },
        ],
      },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },

    setPreferences: (state, action) => {
      state.logPreferences = action.payload;
      localStorage.setItem("logPreferences", JSON.stringify(action.payload));
    },
    clearPreferences: (state, action) => {
      state.logPreferences = null;
      localStorage.removeItem("logPreferences");
    },
  },
});

export default userSlice.reducer;
export const { setIsLoggingIn, setPreferences, clearPreferences } =
  userSlice.actions;
