import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface _ModalState {
  showLoader: boolean;
}

// Define the initial state using that type
const initialState: _ModalState = {
  showLoader: true,
};

export const loaderSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.showLoader = true;
    },
    hideLoader: (state) => {
      state.showLoader = false;
    },
    setShowLoader: (
      state,
      action: {
        payload: boolean;
      },
    ) => {
      state.showLoader = action.payload;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice.reducer;
