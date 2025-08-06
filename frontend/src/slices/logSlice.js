import { createSlice } from "@reduxjs/toolkit";
const defaultCategories = localStorage.getItem("logPreferences")
  ? JSON.parse(localStorage.getItem("logPreferences")).defaultCategories
  : [
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
    ];

const initialState = {
  defaultCategories,
  tempEntries: [],
  tempCategories: [],
  preferredCurrency: "",
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
    addDefaultCategory(state, action) {
      state.defaultCategories.push(action.payload);
    },
    setTempEntries(state, action) {
      state.tempEntries = action.payload;
    },
    addTempEntry(state, action) {
      state.tempEntries.push(action.payload);
    },
    setTempCategories(state, action) {
      state.tempCategories = action.payload;
    },
    addTempCategory(state, action) {
      state.tempCategories.push(action.payload);
    },
    setPreferredCurrency(state, action) {
      state.preferredCurrency = action.payload;
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
  addDefaultCategory,
  setTempEntries,
  addTempEntry,
  setTempCategories,
  addTempCategory,
  setPreferredCurrency,
  setIsNotSaved,
  setActiveLogTabs,
} = logSlice.actions;
