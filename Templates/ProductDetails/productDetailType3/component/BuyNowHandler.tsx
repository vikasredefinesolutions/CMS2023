import { _Store } from '@configs/page.config';
import {
  BOSTONBEAR,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  __Cookie,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import {
  GoogleAnalyticsTrackerForAllStore,
  getAddToCartObject,
  setCookie,
} from '@helpers/common.helper';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addToCart, checkAvailablityInCart } from '@services/cart.service';
import { useEffect, useState } from 'react';

interface _Props {
  size: string;
}

export interface _CheckSizePayload {
  checkProductAlredyInCartModel: {
    productId: number;
    customerId: number;
    storeId: number;
    attributeOptionFirstId: number;
    attributeOptionSecondId: number;
  };
}
const BuyNowHandler: React.FC<_Props> = (size) => {
  const { toCheckout, product } = useTypedSelector_v2((state) => state.product);
  const { showModal, setShowLoader, fetchCartDetails } = useActions_v2();

  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { productId } = useTypedSelector_v2((state) => state.product.selected);
  const { isSewOutEnable, sewOutCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [totalQtys, setTotalQtys] = useState<number>(0);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const productInventory = useTypedSelector_v2(
    (state) => state.product.product.inventory,
  );
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const [inventory, setInventory] = useState<number | null>(null);

  const { totalQty } = GetCartTotals();
  const customerId = GetCustomerId();
  const { sizeQtys } = toCheckout;

  const checkProductSizeAvailable = async () => {
    if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
      setShowLoader(false);

      showModal({
        message:
          storeCode === SIMPLI_SAFE_CODE ||
          storeCode === UCA ||
          storeCode === HEALTHYPOINTS
            ? 'Please select any one size.'
            : `Please Select One Size and Its Quantity.`,
        title:
          storeCode === SIMPLI_SAFE_CODE || storeCode === UCA
            ? 'Required Size'
            : 'Required Quantity',
      });
      return;
    }

    const payload = {
      checkProductAlredyInCartModel: {
        productId: productId,
        customerId: +customerId,
        storeId: storeId,
        attributeOptionFirstId: selectedProduct.color.attributeOptionId,
        attributeOptionSecondId: sizeQtys[0].attributeOptionId,
      },
    };
    await checkAvailablityInCart(payload)
      .then(async (res) => {
        console.log(res, 'this is res');
        if (!res) {
          await buyNowAction();
        } else {
          setShowLoader(false);
          showModal({
            message: __pagesText.cart.sizeAlreadyAddedIncart,
            title: 'Alert',
          });
        }
      })
      .catch((err) => {
        setShowLoader(false);
        showModal({
          message: __pagesText.cart.sizeAlreadyAddedIncart,
          title: 'Alert',
        });
      });
  };

  const buyNowAction = async () => {
    setShowLoader(true);

    const { sizeQtys, totalPrice, totalQty, logos } = toCheckout;

    if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
      setShowLoader(false);

      showModal({
        message:
          storeCode === SIMPLI_SAFE_CODE
            ? 'Please select any one size.'
            : `Please Select One Size and Its Quantity.`,
        title:
          storeCode === SIMPLI_SAFE_CODE
            ? 'Required Size'
            : 'Required Quantity',
      });
      return;
    }

    if (totalQty < toCheckout.minQty) {
      setShowLoader(false);
      showModal({
        message: `The minimum order for this color is ${toCheckout.minQty} pieces. Please increase your quantity and try again.`,
        title: 'Required',
      });

      return;
    }

    const cartObject = await getAddToCartObject({
      userId: customerId ? +customerId : 0,
      storeId: storeId || 0,
      isEmployeeLoggedIn,
      isForm: false,
      ipAddress: '192.168.1.1',
      note: '',
      sizeQtys: sizeQtys,
      productDetails: selectedProduct,
      logos: logos,
      isSewOutEnable: isSewOutEnable,
      sewOutCharges: sewOutCharges,
      total: {
        totalPrice,
        totalQty,
      },
      shoppingCartItemId: 0,
    });

    if (cartObject) {
      //GTM event for add-to-cart
      const payload = {
        storeId: storeId,
        customerId: customerId ? customerId : 0,
        value: toCheckout?.totalPrice,
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: product?.id,
            productName: product?.name,
            colorVariants: product?.colors?.length
              ? product?.colors?.find((clr) => clr.productId === product.id)
                  ?.attributeOptionId
              : '',
            price: toCheckout?.totalPrice,
            quantity: toCheckout.totalQty,
          },
        ],
      };
      GoogleAnalyticsTrackerForAllStore(
        'GoogleAddToCartScript',
        storeId,
        payload,
      );

      await addToCart(cartObject)
        .then(async (res) => {
          if (res) {
            setShowLoader(false);
            setCookie(__Cookie.tempCustomerId, '' + res, 'Session');

            showModal({
              message: __pagesText.cart.successMessage,
              title: 'Success',
            });
            // router.push(paths.CART);
            await fetchCartDetails({ customerId, isEmployeeLoggedIn });
          }
        })
        .catch((err) => {
          setShowLoader(false);
        });
    }
  };

  useEffect(() => {
    const prodArr = productInventory?.inventory.filter((prod) => {
      return (
        prod.colorAttributeOptionId === selectedProduct.color.attributeOptionId
      );
    });

    const inventoryCount = prodArr?.reduce(
      (acc, curr) => acc + curr.inventory,
      0,
    );

    setInventory(inventoryCount ? inventoryCount : 0);
  }, [selectedProduct, productInventory?.inventory]);

  useEffect(() => {
    setTotalQtys(totalQty);
  }, [totalQty]);
  const getBtnText = () => {
    if (inventory && inventory == 0) return __pagesText.productInfo.outOfStock;
    if (storeCode === _Store.type5 || storeCode == SIMPLI_SAFE_CODE)
      return __pagesText.productInfo.addTocart;
    return __pagesText.productInfo.buyNow;
  };
  return (
    <>
      <div className='w-full text-left flex justify-end mt-[20px] cursor-pointer '>
        <button
          onClick={() => {
            storeCode === UCA || storeCode == BOSTONBEAR
              ? checkProductSizeAvailable()
              : buyNowAction();
          }}
          disabled={inventory == 0 ? true : false}
          className='btn btn-secondary w-full text-center'
        >
          {getBtnText()}
        </button>
      </div>
    </>
  );
};

export default BuyNowHandler;
