import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showModal: true,
  activeModal: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setModalState: (state, action) => {
      state.showModal = action.payload.showModal;
      state.activeModal = action.payload.activeModal;
    },
  },
});

export const { startLoading, stopLoading, setModalState } = appSlice.actions;
export default appSlice.reducer;
