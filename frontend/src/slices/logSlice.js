import { createSlice } from "@reduxjs/toolkit";
const defaultCategories = [
  {
    name: "Food",
    color: "#82E0AA",
  },
  {
    name: "Savings",
    color: "#F7DC6F",
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
  tempEntries: [],
  isNotSaved: false,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setDefaultCategories(state, action) {
      state.defaultCategories = action.payload;
    },
    setTempEntries(state, action) {
      state.tempEntries = action.payload;
    },
    addTempEntry(state, action) {
      state.tempEntries.push(action.payload);
    },
    setIsNotSaved(state, action) {
      state.isNotSaved = action.payload;
    },
  },
});

export default logSlice.reducer;
export const {
  setDefaultCategories,
  setTempEntries,
  addTempEntry,
  setIsNotSaved,
} = logSlice.actions;
