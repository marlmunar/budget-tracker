import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  setTempEntries,
  addTempEntry,
  setTempCategories,
  addTempCategory,
  setPreferredCurrency,
  setIsNotSaved,
  setActiveLogTabs,
} = logSlice.actions;
