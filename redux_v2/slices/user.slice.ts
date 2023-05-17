import { UserType } from '@definations/APIs/user.res';
import { getStoreCustomer } from '@redux/asyncActions/user.async';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface _UserState {
  id: number | null;
  customer: UserType | null;
  loggedIn: boolean;
}

// Define the initial state using that type
const initialState: _UserState = {
  id: null,
  customer: null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    logInUser: (
      state,
      action: {
        payload:
          | {
              id: number | null;
            }
          | 'CLEAN_UP';
      },
    ) => {
      if (action.payload === 'CLEAN_UP') {
        state.id = null;
        state.customer = null;
        state.loggedIn = false;
        return;
      }

      state.id = action.payload.id;
    },
    updateCustomer: (
      state,
      action: {
        payload: {
          customer: UserType;
        };
      },
    ) => {
      state.customer = action.payload.customer;
    },
    updateCustomerV2: (
      state,
      action: {
        payload: {
          customer: UserType;
          id: number;
        };
      },
    ) => {
      state.customer = action.payload.customer;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStoreCustomer.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
