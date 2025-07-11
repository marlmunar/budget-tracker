import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showModal: false,
  activeModal: "",
  modalData: {},
  lastAction: null,
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

      if (action.payload.activeModal !== undefined) {
        state.activeModal = action.payload.activeModal;
      }

      if (action.payload.modalData !== undefined) {
        state.modalData = action.payload.modalData;
      }
    },
    setLastAction: (state, action) => {
      state.lastAction = action.payload;
    },
  },
});

export const { startLoading, stopLoading, setModalState, setLastAction } =
  appSlice.actions;
export default appSlice.reducer;
