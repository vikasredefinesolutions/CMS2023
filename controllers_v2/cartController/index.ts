import { _CartItem } from '@services/cart';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from 'helpers_v2/common.helper';

export const captureRemoveItemEvent = (
  cartItems: _CartItem[] | null,
  itemId: number,
  customerId: number | string,
  storeId: number,
) => {
  const removedProduct = cartItems?.find(
    (item) => item.shoppingCartItemsId === itemId,
  );

  if (removedProduct) {
    const payload = {
      storeId: storeId,
      customerId: customerId || 0,
      shoppingCartItemsModel: [
        {
          productId: removedProduct?.productId,
          productName: removedProduct?.productName,
          colorVariants: removedProduct?.attributeOptionValue,
          price: removedProduct?.totalPrice,
          quantity: removedProduct?.totalQty,
        },
      ],
    };
    GoogleAnalyticsTrackerForCG('GoogleRemoveFromCartScript', storeId, payload);
    GoogleAnalyticsTrackerForAllStore(
      'GoogleRemoveFromCartScript',
      storeId,
      payload,
    );
  }
};
