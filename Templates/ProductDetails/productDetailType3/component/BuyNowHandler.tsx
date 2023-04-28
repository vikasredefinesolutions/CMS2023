import { __pagesText } from '@constants/pages.text';
import { getAddToCartObject } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { addToCart } from '@services/cart.service';

interface _Props {
  size: string;
}
const BuyNowHandler: React.FC<_Props> = (size) => {
  const { selected, toCheckout, product } = useTypedSelector_v2(
    (state) => state.product,
  );
  const { showModal, setShowLoader } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const loggedIN_userId = useTypedSelector_v2((state) => state.user.id);
  const { isSewOutEnable, sewOutCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );

  const buyNowAction = async () => {
    setShowLoader(true);

    const { sizeQtys, totalPrice, totalQty, logos } = toCheckout;

    const cartObject = await getAddToCartObject({
      userId: loggedIN_userId || 0,
      storeId: storeId || 0,
      isEmployeeLoggedIn,
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

    if (totalQty < toCheckout.minQty) {
      showModal({
        message: `The minimum order for this color is ${toCheckout.minQty} pieces. Please increase your quantity and try again.`,
        title: 'Required',
      });

      return;
    }

    if (cartObject) {
      await addToCart(cartObject)
        .then((res) => {
          if (res) {
            setShowLoader(false);
            showModal({
              message: __pagesText.cart.successMessage,
              title: 'Success',
            });
          }
        })
        .catch((err) => {
          setShowLoader(false);
        });
    }
  };

  return (
    <>
      <div className='w-full text-left flex justify-end mt-[20px]'>
        <button
          onClick={buyNowAction}
          className='btn btn-secondary w-full text-center'
        >
          BUY NOW
        </button>
      </div>
    </>
  );
};

export default BuyNowHandler;
