import { __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { AddItemsToTheCart } from '@services/cart.service';
import { FetchCategoryByproductId } from '@services/product.service';
import {
  logoCartItems_Generator,
  singleColor_addToCart_PayloadGenerator,
} from '@services/product.service.helper';
import MsgContainer from 'appComponents_v2/modals/msgContainer/MsgContainer';
import {
  KlaviyoScriptTag,
  extractCookies,
  setCookie,
} from 'helpers_v2/common.helper';
import { highLightError } from 'helpers_v2/console.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';
import { _SOMActionHandlerProps } from './productDetailsComponents';

const SomActionsHandler: React.FC<_SOMActionHandlerProps> = ({
  closeStartOrderModal,
  note,
  cartItemId,
  isUpdate,
}) => {
  const { showModal, fetchCartDetails } = useActions_v2();
  const [showRequiredModal, setShowRequiredModal] = useState<
    'quantity' | 'logo' | null
  >(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const loggedIN_userId = useTypedSelector_v2((state) => state.user.id);
  const { selected, toCheckout, som_logos, product } = useTypedSelector_v2(
    (state) => state.product,
  );
  const store = useTypedSelector_v2((state) => state.store);

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const getCategoriesArr = async (productId: number): Promise<string[]> => {
    let categoriesArr: string[] = [];
    const categories = await FetchCategoryByproductId(productId, storeId);
    if (categories.length > 0) {
      categoriesArr = categories[0].name.split(' > ');
    }
    return categoriesArr;
  };

  const tempCustId = extractCookies(
    __Cookie.tempCustomerId,
    'browserCookie',
  ).tempCustomerId;

  const requiredMessage = (
    issue: 'quantity' | 'logo',
    minQty: null | number = 1,
    logoIndex: null | string,
  ) => {
    let message = __pagesText.productInfo.someThingWentWrong;
    if (issue === 'logo' && logoIndex) {
      message = `${__pagesText.productInfo.pleaseUploadLogoLater} ${som_logos.choosedLogoCompletionPending} ${__pagesText.productInfo.logo}`;
    }

    if (issue === 'quantity') {
      message = `${__pagesText.productInfo.minimumOrderForThisColor} ${minQty} ${__pagesText.productInfo.pleaseIncreaseYourQuantityAndTryAgain}`;
    }

    return message;
  };

  const addItemToKlaviyo = async (productId: number) => {
    const categories = await getCategoriesArr(productId);
    const item = {
      $value: toCheckout.totalPrice,
      AddedItemProductName: product.name,
      AddedItemColorName: selected.color.name,
      AddedItemProductID: product.id,
      AddedItemSKU: product.sku,
      AddedItemCategories: categories,
      AddedItemImageURL: `${store.mediaBaseUrl}${selected.color.imageUrl}`,
      AddedItemURL: window.location.href,
      AddedItemPrice: toCheckout.price,
      AddedItemQuantity: toCheckout.totalQty,
      ItemNames: [product.name],
      CheckoutURL: paths.CHECKOUT,
      Items: {
        ProductID: product.id,
        SKU: product.sku,
        ProductName: product.name,
        Quantity: toCheckout.totalQty,
        ItemPrice: toCheckout.price,
        RowTotal: toCheckout.totalPrice,
        ProductURL: window.location.href,
        ImageURL: selected.color.imageUrl,
        ProductCategories: categories,
        ColorName: selected.color.name,
        Sizes: toCheckout.sizeQtys,
      },
    };

    KlaviyoScriptTag(['track', 'Added to Cart', item]);
  };

  const addToCartHandler = async () => {
    if (!toCheckout.allowAddToCart && !isEmployeeLoggedIn) {
      setShowRequiredModal('quantity');
      return;
    }

    if (som_logos.choosedLogoCompletionPending) {
      setShowRequiredModal('logo');
      return;
    }

    if (!toCheckout.sizeQtys) return;

    let lineCartItems: [] = [];

    const logoCartItems = logoCartItems_Generator(
      som_logos.details,
      selected,
      toCheckout.sizeQtys,
    );

    const cartPayload = await singleColor_addToCart_PayloadGenerator({
      cartItemId,
      storeId: storeId,
      userId:
        loggedIN_userId && loggedIN_userId > 0
          ? loggedIN_userId
          : tempCustId
          ? parseInt(tempCustId)
          : 0,
      isEmployeeLoggedIn,
      cartItems: [
        {
          attributeOptionName: 'Color',
          attributeOptionValue: selected.color.name,
          attributeOptionId: selected.color.attributeOptionId,
        },
      ],
      personalization: {
        logoCartItems: logoCartItems,
        lineCartItems: lineCartItems,
      },
      product: {
        id: selected.productId,
        price: toCheckout.price,
        total: {
          price: toCheckout.totalPrice,
          qty: toCheckout.totalQty,
          discountPrice: 0,
        },
        color: {
          altTag: selected.color.altTag,
          imageUrl: selected.color.imageUrl,
        },
        status: 2,
        note: note,
      },
    });

    try {
      const guestId: number = await AddItemsToTheCart(cartPayload);
      await addItemToKlaviyo(selected.productId);

      let guest_OR_loggedIN_userID: number = loggedIN_userId
        ? loggedIN_userId
        : 0;

      if (!loggedIN_userId) {
        guest_OR_loggedIN_userID = guestId;
        setCookie(__Cookie.tempCustomerId, '' + guestId, 'Session');
      }

      if (!guest_OR_loggedIN_userID) return;

      fetchCartDetails({
        customerId: guestId,
        isEmployeeLoggedIn,
      });
      showModal({
        message: `${isUpdate ? 'Update' : 'Add to'} cart Successfully`,
        title: 'Success',
      });
    } catch (error) {
      showModal({
        message: 'Something went wrong. Try Again!!!',
        title: 'Error',
      });
      highLightError({ error, component: 'StartOrderModal' });
    }
    closeStartOrderModal();
  };

  return (
    <div className='p-[25px] pt-0 text-center'>
      <button
        onClick={addToCartHandler}
        type='button'
        className='btn btn-xl btn-secondary w-full uppercase mb-2'
      >
        <span className='material-icons mr-[5px]'>shopping_cart</span>{' '}
        {isUpdate ? 'Update' : 'Add to'} Cart
      </button>
      <button
        onClick={() => closeStartOrderModal()}
        type='button'
        className='font-[600] underline text-medium-text text-anchor'
      >
        {
          __pagesText.productInfo.startOrderModal.sizePriceQty.selectOrInput
            .cancel
        }
      </button>

      {showRequiredModal && (
        <MsgContainer
          modalHandler={() => setShowRequiredModal(null)}
          message={requiredMessage(
            showRequiredModal,
            toCheckout.minQty,
            som_logos.choosedLogoCompletionPending,
          )}
          title={'Required'}
        />
      )}
    </div>
  );
};

export default SomActionsHandler;
