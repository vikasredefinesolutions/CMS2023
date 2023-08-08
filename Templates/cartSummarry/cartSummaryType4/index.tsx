import Price from '@appComponents/reUsable/Price';
import { _Store } from '@configs/page.config';
import { _Store_CODES, __LocalStorage } from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType4: FC<_props> = ({ selectedShippingModel }) => {
  const { update_CheckoutEmployeeLogin } = useActions_v2();
  const router = useRouter();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const thirdPartyLogin = useTypedSelector_v2(
    (state) => state.store.thirdPartyLogin,
  );
  const { showModal } = useActions_v2();
  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [textOrNumber, setTextOrNumber] = useState<'number' | 'text'>('text');
  // Functions
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    totalLogoCharges,
    totalLineCharges,
    sewOutTotal,
  } = GetCartTotals();
  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      try {
        ThirdpartyServices.map((service) => {
          if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.oktaLogin.toLocaleLowerCase()
          ) {
            localStorage.setItem(
              __LocalStorage.thirdPartyServiceName,
              service.thirdPartyServiceName,
            );
            service.url && router.push(service.url);
          } else if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.samlLogin.toLocaleLowerCase()
          ) {
            const jsonDate = new Date().toJSON();
            const datejson = jsonDate.split('.')[0] + 'Z';
            // console.log(datejson, 'datejson', jsonDate);
            return router.push(service.url + encodeURIComponent(datejson));
          }
        });
      } catch (error) {
        showModal({
          message: `something wents wrong`,
          title: 'Error',
        });
      }
    });
  };
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);
  const couponAmt = couponDetails?.amount || 0;
  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };
  const calculateCouponAmount = () => {
    const subTotal = calculateSubTotal();

    if (couponAmt > subTotal) {
      return subTotal;
    }

    return couponAmt;
  };
  const cost = {
    subTotal: calculateSubTotal(),
    couponDiscount: calculateCouponAmount(),

    totalToShow: function () {
      const toAdd = this.subTotal;
      const toSubtract = this.couponDiscount;

      const estimated = toAdd - toSubtract;
      return estimated > 0 ? estimated : 0;
    },
  };
  // const { cartQty } = useTypedSelector_v2((state) => state.cart);
  // const { fetchShipping } = CheckoutController();
  // useEffect(() => {
  //   if (cartQty) {
  //     fetchShipping(subTotal);
  //   }
  // }, [subTotal]);
  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  return (
    <div className='border border-gray-border bg-white p-[15px]'>
      <div
        className={`${
          storeCode !== _Store_CODES.USAAHEALTHYPOINTS && 'bg-light-gray'
        } w-full text-sub-text font-medium px-[15px] py-[15px]`}
      >
        {__pagesText.CheckoutPage.orderSummary.OrderSummary}
      </div>
      <div className='px-[15px] py-[15px]'>
        <dl className='space-y-2'>
          <div className='flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text'>Subtotal:</dt>
            <dd className='text-normal-text'>
              <Price value={subTotal + totalLogoCharges} />
            </dd>
          </div>
          {couponDetails?.amount != 0 && couponDetails?.amount != undefined && (
            <div className='flex items-center justify-between pt-[10px] pb-[20px]'>
              <dt className='text-base'>
                Promo{' '}
                <span
                  className='text-anchor cursor-pointer'
                  onClick={() => removeCouponCodeHandler()}
                >
                  (Remove)
                </span>
              </dt>
              <dd className='text-base font-medium text-gray-900 '>
                - <Price value={couponDetails?.amount} />
              </dd>
            </div>
          )}

          <div className='border-t border-t-gray-border pt-[10px] flex items-center justify-between'>
            <dt className='text-normal-text'>
              <span
                className={`${
                  storeCode === _Store_CODES.USAAHEALTHYPOINTS &&
                  '!font-semibold'
                }`}
              >
                Estimated Total
              </span>
            </dt>
            <dd className='text-normal-text font-medium'>
              <Price value={cost.totalToShow()} />
            </dd>
          </div>
        </dl>
      </div>
      {storeCode != _Store.type6 && storeCode !== _Store_CODES.UNITi && (
        <div
          className={`flex justify-between items-center ${
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS && 'bg-light-gray'
          } w-full text-sub-text font-bold px-[15px] py-[5px]`}
        >
          <div>Total:</div>
          <div>
            <Price
              value={
                totalPrice + getNewShippingCost(selectedShippingModel?.price)
              }
            />
          </div>
        </div>
      )}
      {!loggedIn && thirdPartyLogin ? (
        <div className='mt-[15px]'>
          <button
            className='btn btn-lg btn-secondary !flex items-center justify-center w-full'
            onClick={SamlloginHandler}
            type='button'
          >
            LOGIN VIA SAML
          </button>
        </div>
      ) : (
        <div className='mt-4'>
          <Link className='' href={paths.CHECKOUT}>
            <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
              <span className='material-icons text-lg mr-[2px]'>
                shopping_cart
              </span>
              CHECKOUT NOW
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummarryType4;
