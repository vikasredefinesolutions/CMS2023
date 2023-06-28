import { _Store } from '@configs/page.config';
import { SIMPLI_SAFE_CODE, __Cookie } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import {
  GoogleAnalyticsTrackerForAllStore,
  getAddToCartObject,
  setCookie,
} from '@helpers/common.helper';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { addToCart } from '@services/cart.service';
import { useRouter } from 'next/router';

interface _Props {
  size: string;
}
const BuyNowHandlerType8: React.FC<_Props> = (size) => {
  const { toCheckout, product } = useTypedSelector_v2((state) => state.product);
  const { showModal, setShowLoader, clearToCheckout } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = GetCustomerId();
  const { isSewOutEnable, sewOutCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );

  const router = useRouter();

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  const buyNowAction = async () => {
    setShowLoader(true);

    const { sizeQtys, totalPrice, totalQty, logos } = toCheckout;
    if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
      setShowLoader(false);

      showModal({
        message:
          storeCode === SIMPLI_SAFE_CODE
            ? 'Please select any one size.'
            : `Please Select One Size.`,
        title:
          storeCode === SIMPLI_SAFE_CODE ? 'Required Size' : 'Required Size',
      });
      return;
    }
    if (totalQty > 1 && storeCode === SIMPLI_SAFE_CODE) {
      setShowLoader(false);
      showModal({
        message: `Employees may redeem only 1 piece of apparel.`,
        title: 'Information',
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
      userId: +customerId || 0,
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
        customerId: customerId,
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
        .then((res) => {
          if (res) {
            setCookie(__Cookie.tempCustomerId, '' + res, 'Session');
            setShowLoader(false);
            showModal({
              message: __pagesText.cart.successMessage,
              title: 'Success',
            });
            clearToCheckout();
            router.push(paths.CART);
          }
        })
        .catch((err) => {
          setShowLoader(false);
        });
    }
  };

  return (
    <>
      <div className='w-full text-left flex justify-end  cursor-pointer '>
        <button
          onClick={buyNowAction}
          className='btn btn-xl btn-secondary w-full text-center'
        >
          {storeCode === _Store.type5
            ? __pagesText.productInfo.addTocart
            : __pagesText.productInfo.buyNow}
        </button>
      </div>
    </>
  );
};

export default BuyNowHandlerType8;
