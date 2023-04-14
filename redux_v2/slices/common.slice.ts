import { createSlice } from '@reduxjs/toolkit';

export interface _Common_Initials {
  loader: false;
}

const initialState: _Common_Initials = {
  loader: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleLoader: (state, action) => {},
  },
});

export const CartActions = commonSlice.actions;

export default commonSlice.reducer;
