import { createSlice } from "@reduxjs/toolkit";
const defaultCategories = [
  {
    name: "Food",
    color: "#82E0AA",
    subType: "Expense",
  },
  {
    name: "Savings",
    color: "#F7DC6F",
    subType: "Income",
  },
  {
    name: "Health",
    color: "#A569BD",
    subType: "Expense",
  },
  {
    name: "Housing",
    color: "#5DADE2",
    subType: "Expense",
  },
  {
    name: "Bills",
    color: "#FF7F50",
    subType: "Expense",
  },
  {
    name: "Transportation",
    color: "#40E0D0",
    subType: "Expense",
  },
];

const initialState = {
  defaultCategories,
  tempEntries: [],
  isNotSaved: false,
  activeLogTabs: localStorage.getItem("activeTabIds")
    ? JSON.parse(localStorage.getItem("activeTabIds"))
    : [],
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
    setActiveLogTabs(state, action) {
      state.activeLogTabs = action.payload;
    },
  },
});

export default logSlice.reducer;
export const {
  setDefaultCategories,
  setTempEntries,
  addTempEntry,
  setIsNotSaved,
  setActiveLogTabs,
} = logSlice.actions;
