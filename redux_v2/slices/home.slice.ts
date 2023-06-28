import { _FeaturedMoreImages } from '@definations/APIs/storeDetails.res';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface _HomeState {
  selected: {
    image: _FeaturedMoreImages[] | null;
    uImgIndex: string[];
  };
  isCMS_page: boolean;
  redirectPath: string;
}

// Define the initial state using that type
const initialState: _HomeState = {
  selected: {
    image: null,
    uImgIndex: ['0-0-0'],
  },
  isCMS_page: false,
  redirectPath: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    showFeaturedImage: (
      state,
      action: {
        payload: {
          imageDetails: _FeaturedMoreImages;
          productIndex: number;
          uImgIndex: string;
        };
      },
    ) => {
      const productIndex = action.payload.productIndex;
      if (state.selected.image === null) {
        state.selected.image = [action.payload.imageDetails];
        state.selected.uImgIndex = [action.payload.uImgIndex];
        return;
      }
      state.selected.image[productIndex] = action.payload.imageDetails;
      state.selected.uImgIndex[productIndex] = action.payload.uImgIndex;
    },

    topic_set_isCMS: (state, action: { payload: boolean }) => {
      state.isCMS_page = action.payload;
    },

    setRedirectPagePath: (state, action: { payload: string }) => {
      state.redirectPath = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
