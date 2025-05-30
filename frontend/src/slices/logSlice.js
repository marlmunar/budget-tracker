import { createSlice } from "@reduxjs/toolkit";
const defaultCategories = [
  {
    name: "Food",
    color: "#82e0aa",
  },
  {
    name: "Savings",
    color: "#f7dc6f",
  },
  {
    name: "Health",
    color: "#A569BD",
  },
  {
    name: "Housing",
    color: "#5DADE2",
  },
  {
    name: "Bills",
    color: "#FF7F50",
  },
  {
    name: "Transportation",
    color: "#40E0D0",
  },
];

const initialState = {
  defaultCategories,
};

const userSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setDefaultCategories(state, action) {
      state.defaultCategories = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setDefaultCategories } = userSlice.actions;
