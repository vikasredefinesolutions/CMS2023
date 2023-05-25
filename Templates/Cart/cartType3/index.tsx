import { SpinnerComponent } from '@appComponents/ui/spinner';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import CheckoutController from '@controllers/checkoutController';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import CartSummarry from '@templates/cartSummarry';
import CartItem from 'Templates/cartItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';
const CartType3: React.FC<_CartProps> = ({
  templateId,
  showLoaderOrEmptyText,
}) => {
  const router = useRouter();
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const thirdPartyLogin = useTypedSelector_v2(
    (state) => state.store.thirdPartyLogin,
  );
  const { showModal } = useActions_v2();
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const { fetchShipping, shippingAdress, selectedShipping, shippingMethod } =
    CheckoutController();
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
  return (
    <section id='' className=''>
      <div className='"container mx-auto'>
        <div className='bg-white p-[10px]'>
          <form className='flex flex-wrap -mx-[10px] -mt-[10px] cart-box'>
            <section
              aria-labelledby='cart-heading'
              className='w-full lg:w-9/12 px-[10px] mt-[15px]'
            >
              <div className='flex justify-between items-center bg-light-gray w-full px-[15px] py-[10px]'>
                <div className='text-2xl mr-[10px]'>
                  {__pagesText.cart.shoppingCart}
                </div>
                <div className='text-default-text'>
                  {cartData ? cartData.length : 0} Item(s)
                  <span> in cart</span>
                </div>
              </div>
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>
              <CartItem
                isRemovable={true}
                isEditable={true}
                availableFont={[]}
                availableLocation={[]}
                availableColor={[]}
                templateId={templateId}
              />
              <div className='my-[10px]'>
                <a href={`${paths.HOME}`} className='btn btn-primary'>
                  {__pagesText.cart.continueShopping}
                </a>
              </div>
            </section>
            <section
              aria-labelledby='summary-heading'
              className='w-full lg:w-3/12 px-[10px] mt-[15px]'
            >
              <CartSummarry selectedShippingModel={selectedShipping} />
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
            </section>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartType3;
