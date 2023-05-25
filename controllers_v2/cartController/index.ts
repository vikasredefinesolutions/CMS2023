import { _CartItem } from '@services/cart';
import { CaptureGTMEvent } from 'helpers_v2/common.helper';

export const captureRemoveItemEvent = (
  cartItems: _CartItem[],
  itemId: number,
  isEmployeeLoggedIn: boolean,
) => {
  const removedProduct = cartItems.find(
    (item) => item.shoppingCartItemsId === itemId,
  );

  if (removedProduct) {
    const eventPayload = {
      pageTitle: document?.title || 'Cart',
      pageCategory: 'Remove From Cart',
      visitorType: isEmployeeLoggedIn ? 'high-value' : 'low-value',
      customProperty1: '',
      event: 'remove_from_cart',
      ecommerce: {
        value: removedProduct?.totalPrice,
        currency: 'USD', // USD
        items: [
          {
            item_name: removedProduct?.productName,
            item_id: removedProduct?.sku,
            item_brand: removedProduct?.brandName,
            item_category: '',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_variant: '',
            item_list_name: removedProduct?.productName,
            item_list_id: removedProduct?.productId,
            index: removedProduct?.productId,
            quantity: removedProduct?.totalQty,
            price: removedProduct?.totalPrice,
          },
        ],
      },
    };
    CaptureGTMEvent(eventPayload);
  }
};
