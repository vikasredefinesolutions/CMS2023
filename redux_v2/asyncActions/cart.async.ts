import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartDetails } from '@services/cart.service';
import { FetchProductById } from '@services/product.service';

export const fetchCartDetails = createAsyncThunk(
  'cart/details',
  async (
    payload: {
      customerId: number | string;
      isEmployeeLoggedIn: boolean;
    },
    thunk,
  ) => {
    const state: any = thunk.getState();
    try {
      const cart = await getCartDetails(
        +payload.customerId,
        payload.isEmployeeLoggedIn,
      );
      //Adding missing key brandName and categoryName that is required for GTM event payload
      let productdetails: any = [];
      if (cart && cart?.length && state?.store?.id) {
        await Promise.all(
          cart?.map(async (item) => {
            const productResponse = await FetchProductById({
              productId: 0,
              seName: item.seName,
              storeId: state?.store?.id,
            });
            if (productResponse) productdetails.push(productResponse);
          }),
        );
      }
      return { cart, productdetails };
    } catch (error) {
      throw new Error('No Details found!!!');
    }
  },
);
