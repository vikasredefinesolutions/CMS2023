import { createSlice } from '@reduxjs/toolkit';

export interface _Listing_Initials {
  totalVisibleProducts: number;
  listingView: 'grid' | 'list';
}

const initialState: _Listing_Initials = {
  totalVisibleProducts: 0,
  listingView: 'grid',
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////                       SLICE
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    update_ListingProperties: (
      state,
      action: {
        payload:
          | {
              type: 'VISIBLE_PRODUCTS';
              total: number;
            }
          | {
              type: 'LISTING_VIEW';
              view: 'grid' | 'list';
            };
      },
    ) => {
      if (action.payload.type === 'VISIBLE_PRODUCTS') {
        state.totalVisibleProducts = action.payload.total;
      }
      if (action.payload.type === 'LISTING_VIEW') {
        state.listingView = action.payload.view;
      }
    },
  },
});

export const listingActions = listingSlice.actions;

export default listingSlice.reducer;

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////                       TYPES
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
