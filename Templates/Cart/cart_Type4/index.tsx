import { SpinnerComponent } from '@appComponents/ui/spinner';
import { _Store } from '@configs/page.config';
import {
  CYXTERA_CODE,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import CheckoutController from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
} from '@services/cart';
import {
  getPersonalizationColor,
  getPersonalizationFont,
  getPersonalizationLocation,
} from '@services/cart.service';
import CartItem from '@templates/cartItem';
import CartSummarryType2 from '@templates/cartSummarry/cartSummaryType2';
import CartSummarryType4 from '@templates/cartSummarry/cartSummaryType4';
import React, { useEffect, useState } from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';

const CartType4: React.FC<_CartProps> = ({
  showLoaderOrEmptyText,
  templateId,
}) => {
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const [availableFont, setAvailableFont] = useState<
    PersonalizationFont[] | []
  >([]);
  const [availableLocation, setAvailableLocation] = useState<
    PersonalizationLocation[] | []
  >([]);
  const [availableColor, setAvailableColor] = useState<
    PersonalizationColor[] | []
  >([]);
  useEffect(() => {
    if (storeId) {
      getPersonalizationFont(storeId).then((res) => {
        setAvailableFont(res);
      });
      getPersonalizationColor(storeId).then((res) => {
        setAvailableColor(res);
      });
      getPersonalizationLocation(storeId).then((res) => {
        setAvailableLocation(res);
      });
    }
  }, [storeId]);

  const { totalPrice } = GetCartTotals();
  const { fetchShipping, shippingAdress, selectedShipping, shippingMethod } =
    CheckoutController();
  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice);
    }
  }, [totalPrice, shippingAdress]);

  if (showLoaderOrEmptyText === 'loader') {
    return (
      <div className=''>
        <section className='container mx-auto text-center'>
          <div className='py-[12%]'>
            <div className='text-2xl-text'>
              <SpinnerComponent />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (showLoaderOrEmptyText === 'emptyCart' || !cartData) {
    return <EmptyCart />;
  }
  // const SamlloginHandler = () => {
  //   fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
  //     try {
  //       ThirdpartyServices.map((service) => {
  //         if (service.thirdPartyServiceName.toLocaleLowerCase() == 'okta') {
  //           localStorage.setItem(
  //             __LocalStorage.thirdPartyServiceName,
  //             service.thirdPartyServiceName,
  //           );
  //           service.url && router.push(service.url);
  //         } else if (
  //           service.thirdPartyServiceName.toLocaleLowerCase() == 'saml'
  //         ) {
  //           const jsonDate = new Date().toJSON();
  //           const datejson = jsonDate.split('.')[0] + 'Z';
  //           // console.log(datejson, 'datejson', jsonDate);
  //           service.url &&
  //             router.push(service.url + encodeURIComponent(datejson));
  //         }
  //       });
  //     } catch (error) {
  //       showModal({
  //         message: `something wents wrong`,
  //         title: 'Error',
  //       });
  //     }
  //   });
  // };
  return (
    <>
      <section id='' className=''>
        <div className='container mx-auto'>
          <div className='bg-white p-[10px]'>
            {storeCode == _Store.type6 && (
              <>
                {' '}
                <div className='p-[10px] text-center text-red-500'>
                  This site can only take orders via procurement. Please make
                  sure you are logging into the site from your internal portal.
                </div>
                <div className='p-[10px] text-center text-secondary max-w-5xl m-auto'>
                  Our product is ordered and decorated on demand.Orders may take
                  up to 10 days to ship due to availability from our vendors and
                  order size. Please contact Customer Service at (866)-602-8398
                  if you have questions, or need an order sooner.We accept
                  returns on unused accessories and unworn/unwashed apparel
                  pieces within 30 days of purchase.
                </div>
              </>
            )}

            {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
              <div className='text-center pt-[30px] pb-[10px] text-center text-[16px] text-[#ff0000] !font-bold'>
                Employees may redeem only 1 piece of apparel.
              </div>
            )}
            <div className='flex flex-wrap -mx-[10px] -mt-[10px] cart-box'>
              <section
                aria-labelledby='cart-heading'
                className={`w-full ${
                  storeCode === _Store_CODES.USAAHEALTHYPOINTS
                    ? 'lg:w-8/12'
                    : 'lg:w-9/12'
                }  px-[10px] mt-[15px]`}
              >
                <CartItem
                  isRemovable={true}
                  isEditable={true}
                  availableFont={availableFont}
                  availableLocation={availableLocation}
                  availableColor={availableColor}
                  templateId={4}
                />
              </section>
              <section
                aria-labelledby='summary-heading'
                className={`w-full ${
                  storeCode === _Store_CODES.USAAHEALTHYPOINTS
                    ? 'lg:w-4/12'
                    : 'lg:w-3/12'
                } px-[10px] mt-[15px]`}
              >
                {storeCode !== _Store.type6 &&
                storeCode !== CYXTERA_CODE &&
                storeCode !== UNITI_CODE &&
                storeCode !== _Store_CODES.USAAHEALTHYPOINTS ? (
                  <CartSummarryType2 selectedShippingModel={selectedShipping} />
                ) : (
                  <>
                    <CartSummarryType4
                      selectedShippingModel={selectedShipping}
                    />

                    {/* {!loggedIn && thirdPartyLogin ? (
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
                      <Link className='' href={paths.CHECKOUT}>
                        <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                          <i
                            className='fa fa-shopping-cart mr-[10px]'
                            aria-hidden='true'
                          ></i>
                          {__pagesText.cart.checkOutNow}789878787\78
                        </a>
                      </Link>
                    )} */}
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
        {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
          <div className='footer' id='MainFooter'>
            <div>
              <div className='container mx-auto white-link'>
                <div className='bg-primary'>
                  <div className='border-t border-gray-border py-[25px]'>
                    <div>
                      <div className='text-center text-xs text-white'>
                        © 2023 ParsonsKellogg Store. All Rights Reserved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CartType4;
