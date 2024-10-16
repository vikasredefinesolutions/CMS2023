import { SpinnerComponent } from '@appComponents/ui/spinner';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import CheckoutController from '@controllers/checkoutController';
import {
  GetCartTotals,
  GetCustomerId,
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
import { punchoutCheckout } from '@services/checkout.service';
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';
import CT1_EmployeeLoginCart from './Components/CT1_EL_Cart';

const CartType1: React.FC<_CartProps> = ({
  templateId,
  showLoaderOrEmptyText,
}) => {
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [showCheckoutButton, setShowCheckoutButton] = useState(true);
  const customerId = GetCustomerId();
  // Local States
  const [availableFont, setAvailableFont] = useState<
    PersonalizationFont[] | []
  >([]);
  const [availableLocation, setAvailableLocation] = useState<
    PersonalizationLocation[] | []
  >([]);
  const [availableColor, setAvailableColor] = useState<
    PersonalizationColor[] | []
  >([]);

  // All useEffects
  useEffect(() => {
    if (storeId && !isEmployeeLoggedIn) {
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

  useEffect(() => {
    const service = localStorage.getItem('thirdPartyServices');
    if (service === thirdPartyLoginService.punchoutLogin) {
      setShowCheckoutButton(false);
    }
  }, []);

  const { totalPrice } = GetCartTotals();
  const { fetchShipping, shippingAdress, selectedShipping } =
    CheckoutController();

  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice, null);
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

  if (isEmployeeLoggedIn) {
    return <CT1_EmployeeLoginCart cartItems={cartData} />;
  }

  // console.log('shipping all', shippingMethod);
  // console.log('slected', selectedShipping);

  const postData = (path: string, params: { [key: string]: string }) => {
    const hidden_form = document.createElement('form');
    hidden_form.method = 'POST';
    hidden_form.action =
      'https://portal.punchout2go.com/parsonskellogg/console/tools/punchout/session/950806/act/order?buyercookie=pI64e3281d099d5&i=284e03d79190c1a18c91da4843bfd3b8';

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hidden_input = document.createElement('input');
        hidden_input.type = 'hidden';
        hidden_input.name = key;
        hidden_input.value = params[key];

        hidden_form.appendChild(hidden_input);
      }
    }

    document.body.appendChild(hidden_form);
    hidden_form.submit();
  };

  const punchoutHandler = async () => {
    const SID = localStorage.getItem('P_SID');
    if (SID) {
      const sessionId = atob(SID);
      const punchoutResponse = await punchoutCheckout({
        sessionId,
        customerId,
      });
      console.log(punchoutResponse);
      postData(punchoutResponse.actionUrl, {
        'cxml-urlencoded': punchoutResponse.cartXml,
        Aribauser: 'AribaUser',
      });
    }
  };

  return (
    <>
      <div className='flex-grow-0'>
        <section id='' className='mt-[10px]'>
          <div className='bg-[#ffffff]'>
            <div className='container mx-auto'>
              <div className='flex flex-wrap mt-[-12px] relative mx-[-15px]'>
                <div
                  aria-labelledby='cart-heading'
                  className='w-full lg:w-8/12 pl-[15px] pr-[15px] mt-[12px]'
                >
                  <div className='flex justify-between items-center w-full pl-[16px] pr-[16px] pt-[16px] pb-[16px] mb-[20px] bg-light-gray'>
                    <div className='text-title-text mr-[12px] font-bold'>
                      Shopping Cart
                    </div>
                    <div className='text-default-text'>
                      {cartData ? cartData.length : 0} Item(s)
                      <span> in cart</span>
                    </div>
                  </div>
                  <CartItem
                    isRemovable={true}
                    isEditable={true}
                    availableFont={availableFont}
                    availableLocation={availableLocation}
                    availableColor={availableColor}
                    templateId={templateId}
                  />
                </div>
                <div
                  aria-labelledby='summary-heading'
                  className='w-full lg:w-4/12 pl-[12px] pr-[12px] mt-3'
                >
                  <div className='sticky top-32'>
                    <CartSummarry selectedShippingModel={selectedShipping} />
                    <div className='mt-4'>
                      {showCheckoutButton ? (
                        <Link className='' href={paths.CHECKOUT}>
                          <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
                            <span className='material-icons text-lg mr-[2px]'>
                              shopping_cart
                            </span>
                            CHECKOUT NOW
                          </a>
                        </Link>
                      ) : (
                        <button
                          onClick={punchoutHandler}
                          className='btn btn-lg btn-secondary !flex items-center justify-center w-full'
                        >
                          <span className='material-icons text-lg mr-[2px]'>
                            shopping_cart
                          </span>
                          PUNCHOUT CHECKOUT
                        </button>
                      )}
                    </div>
                    <div className='mt-[20px] bg-light-gray px-4 py-4'>
                      <div className='flex items-center justify-center mb-[15px]'>
                        <img
                          src='/assets/images/order-risk-free-icon.jpg'
                          alt=''
                          className='mr-2 w-5 h-5'
                        />
                        <span className='text-title-text font-semibold'>
                          Order Risk-Free!
                        </span>
                      </div>
                      <div className='flex items-center justify-center text-medium-text font-[600] leading-normal text-center mb-[10px]'>
                        Cancel your order without penalty anytime before your
                        proof is approved.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CartType1;
