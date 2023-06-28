import { SpinnerComponent } from '@appComponents/ui/spinner';
import { _Store } from '@configs/page.config';
import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import CheckoutController from '@controllers/checkoutController';
import {
  GetCartTotals,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
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
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import CartItem from '@templates/cartItem';
import CartSummarryType2 from '@templates/cartSummarry/cartSummaryType2';
import CartSummarryType4 from '@templates/cartSummarry/cartSummaryType4';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const thirdPartyLogin = useTypedSelector_v2(
    (state) => state.store.thirdPartyLogin,
  );
  const { showModal } = useActions_v2();
  const router = useRouter();
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
  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      try {
        ThirdpartyServices.map((service) => {
          if (service.thirdPartyServiceName == 'Okta')
            service.url != '' && router.push(service.url);
        });
      } catch (error) {
        showModal({
          message: `something wents wrong`,
          title: 'Error',
        });
      }
    });
  };
  return (
    <>
      <section id='' className=''>
        <div className='container mx-auto'>
          <div className='bg-white p-[10px]'>
            <form className='flex flex-wrap -mx-[10px] -mt-[10px] cart-box'>
              <section
                aria-labelledby='cart-heading'
                className='w-full lg:w-9/12 px-[10px] mt-[15px]'
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
                className='w-full lg:w-3/12 px-[10px] mt-[15px]'
              >
                {storeCode !== _Store.type6 &&
                storeCode !== CYXTERA_CODE &&
                storeCode !== UNITI_CODE ? (
                  <CartSummarryType2 selectedShippingModel={selectedShipping} />
                ) : (
                  <>
                    <CartSummarryType4
                      selectedShippingModel={selectedShipping}
                    />

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
                      <Link className='' href={paths.CHECKOUT}>
                        <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                          {/* <i
                      className='fa fa-shopping-cart mr-[10px]'
                      aria-hidden='true'
                    ></i> */}
                          {__pagesText.cart.checkOutNow}
                        </a>
                      </Link>
                    )}
                  </>
                )}
              </section>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartType4;
