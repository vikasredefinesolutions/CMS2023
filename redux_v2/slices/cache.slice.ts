import { GetlAllProductList } from '@definations/productList.type';
import { createSlice } from '@reduxjs/toolkit';

export interface _CacheDataState {
  cacheData: { [x: string]: GetlAllProductList[] | [] };
}

const initialState: _CacheDataState = {
  cacheData: { i: [] },
};

const cacheSlice = createSlice({
  name: 'cacheSlice',
  initialState,
  reducers: {
    storeData: (
      state,
      action: {
        payload: { [x: string]: GetlAllProductList[] };
      },
    ) => {
      state.cacheData = { ...state.cacheData, ...action.payload };
    },
  },
});

export const cacheActions = cacheSlice.actions;

export default cacheSlice.reducer;
