import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartDetails } from '@services/cart.service';

export const fetchCartDetails = createAsyncThunk(
  'cart/details',
  async (payload: {
    customerId: number | string;
    isEmployeeLoggedIn: boolean;
  }) => {
    try {
      const cart = await getCartDetails(
        +payload.customerId,
        payload.isEmployeeLoggedIn,
      );
      return cart;
    } catch (error) {
      throw new Error('No Details found!!!');
    }
  },
);
