// Husain - Added Static Values for now - 20-3-23
import NxtImage from '@appComponents/reUsable/Image';
import Price from '@appComponents/reUsable/Price';
import {
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
  __LocalStorage,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const MyCartIcon: React.FC = () => {
  const { cart_UpdateItems, setShowLoader } = useActions_v2();
  const [totalCartQty, setTotalCartQty] = useState(0);

  const cartData = useTypedSelector_v2((state) => state.cart.cart);

  //
  const { totalPrice, totalQty } = GetCartTotals();
  const [Focus, setFocus] = useState(false);
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const thirdPartyLogin = useTypedSelector_v2(
    (state) => state.store.thirdPartyLogin,
  );
  const router = useRouter();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  useEffect(() => {
    setTotalCartQty(totalQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQty]);
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);
  const couponAmt = 0;
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
  const OktaloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      ThirdpartyServices.map((service) => {
        if (service.thirdPartyServiceName == 'Okta')
          localStorage.setItem(
            __LocalStorage.thirdPartyServiceName,
            service.thirdPartyServiceName,
          );
        router.push(service.url);
      });
    });
  };
  return (
    <div
      onMouseOver={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      className='flow-root relative pl-[15px]'
      x-data='{ open: false }'
    >
      <Link href={paths.CART}>
        <a
          className={
            storeCode == SIMPLI_SAFE_CODE ||
            storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
            storeCode == UCA
              ? 'primary-link hover:primary-link group flex items-center relative pt-[8px] pb-[8px]'
              : 'text-primary hover:text-secondary group flex items-center relative pt-[8px] pb-[8px]'
          }
        >
          {/* <span className='inline-flex items-center justify-center w-[30px] h-[30px]'> */}
          {/*  img link  */}
          {/* <span className='material-icons'>
            {' '}
            {__pagesText.Headers.shoppingCartIcon}
          </span> */}
          <i className='fa-solid fa-cart-shopping text-[22px]'></i>
          {/* </span>{' '} */}
          <span className='absolute right-[-7px] top-[-4px] rounded-full flex items-center justify-center bg-[#dddddd] text-[9px] text-[#000000] pl-[6px] pr-[4px] pt-[2px] pb-[2px]'>
            {totalCartQty}
          </span>
        </a>
      </Link>
      {Focus && totalCartQty > 0 && (
        <div className='absolute top-full right-0 w-80 text-sm shadow-[0_0px_5px_rgb(0,0,0,0.5)] border border-[#f4ede6] tracking-[1px]'>
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          ></div>
          <div className='relative bg-white z-50 text-[12px] leading-normal p-[15px]'>
            <div className='border-t first:border-t-0 border-[#758592] pt-[15px] first:pt-[0px] '>
              <ul className=''>
                {cartData?.map((cartItem) => (
                  <li
                    key={cartItem.attributeOptionId}
                    className='border-t first:border-t-0 border-[#758592] py-2.5 first:pt-0'
                  >
                    <div className='flex flex-wrap'>
                      <div className='w-1/4 px-[5px]'>
                        <NxtImage
                          src={cartItem.colorImage}
                          alt='cartItem'
                          className=''
                        />
                      </div>
                      <div className='w-3/4 px-2.5'>
                        <div className=''>
                          <Link
                            className='inline-block'
                            href={`/${cartItem.seName}.html`}
                          >
                            <a className='inline-block text-[13px] text-[#000000] hover:text-anchor-hover'>
                              {cartItem.productName}
                            </a>
                          </Link>
                        </div>
                        <div className='flex flex-wrap mt-[5px] text-center leading-none'>
                          <div className=''>
                            <div className='text-gray-600'>
                              {__pagesText.Headers.qty}
                            </div>
                            <div className='mt-[3px]'>{cartItem.totalQty}</div>
                          </div>
                          <div className='pl-[15px]'>
                            <div className='text-gray-600'>
                              {__pagesText.Headers.subtotal}
                            </div>
                            <div className='mt-[3px]'>
                              <Price value={cartItem.totalPrice} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='border-t first:border-t-0 border-[#758592] pt-[15px] first:pt-[0px]'>
              <div className='mb-3 font-medium text-right'>
                <div className='text-gray-600'>
                  {totalCartQty} {__pagesText.Headers.totalItemInCartMessage}
                </div>
                <div className='text-[16px]'>
                  {__pagesText.Headers.total}{' '}
                  <Price value={cost.totalToShow()} />
                </div>
              </div>
              {thirdPartyLogin && !loggedIn ? (
                <div className=''>
                  <button
                    className='btn btn-secondary w-full text-center'
                    onClick={OktaloginHandler}
                    type='button'
                  >
                    {__pagesText.Headers.samllogin}
                  </button>
                </div>
              ) : (
                <div className=''>
                  <Link href={paths.CART} className=''>
                    <a className='btn btn-secondary w-full text-center'>
                      {__pagesText.Headers.checkoutNow}
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCartIcon;
