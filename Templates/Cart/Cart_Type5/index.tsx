import { SpinnerComponent } from '@appComponents/ui/spinner';
import { paths } from '@constants/paths.constant';
import CheckoutController from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  BrandPolicyViewModel,
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
} from '@services/cart';
import CartSummarryType5 from '@templates/cartSummarry/cartSummaryType5';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CartItem from 'Templates/cartItem';
import { _CartProps } from '../Cart';
import EmptyCart from '../components/emptyCart';

const CartType5: React.FC<_CartProps> = ({
  templateId,
  showLoaderOrEmptyText,
}) => {
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  const user = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const router = useRouter();

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
  // useEffect(() => {
  //   if (storeId) {
  //     getPersonalizationFont(storeId).then((res) => {
  //       setAvailableFont(res);
  //     });
  //     getPersonalizationColor(storeId).then((res) => {
  //       setAvailableColor(res);
  //     });
  //     getPersonalizationLocation(storeId).then((res) => {
  //       setAvailableLocation(res);
  //     });
  //   }
  // }, [storeId]);

  const { totalPrice } = GetCartTotals();
  const {
    fetchShipping,
    shippingAdress,
    selectedShipping,
    getPolicyDetails,
    productPolicy,
    endUserDisplay,
    setEndUserName,
    endUserNameS,
    getEnduser,
    setEndUserDisplay,
  } = CheckoutController();
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    getPolicyDetails(cartData || []);
  }, [cartData]);

  useEffect(() => {
    const data = getEnduser(productPolicy || []);
    setEndUserDisplay(data);
  }, [productPolicy]);

  useEffect(() => {
    if (totalPrice) {
      fetchShipping(totalPrice, null);
    }
  }, [totalPrice, shippingAdress]);

  let uniquePolicybrand: string[] = [];

  productPolicy &&
    productPolicy?.map((item: BrandPolicyViewModel) => {
      if (item.policyWithCheckBox && item.name) {
        uniquePolicybrand.push(item.name);
      }
    });

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
  const handlecheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    var updateCheckedList = [...checked];
    if (event.target.checked) {
      updateCheckedList = [...checked, event.target.value];
    } else {
      updateCheckedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updateCheckedList);
  };

  const buttonDisabed =
    checked.length == uniquePolicybrand.length
      ? endUserDisplay
        ? endUserNameS.length > 0
          ? true
          : false
        : true
      : false;

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
                    <CartSummarryType5
                      selectedShippingModel={selectedShipping}
                    />
                    {productPolicy &&
                      productPolicy?.map((policy: BrandPolicyViewModel) => {
                        return policy.policyWithCheckBox ? (
                          <div className='mt-[20px] ' key={policy.name}>
                            <input
                              className='w-4 h-4 rounded mr-2'
                              type='checkbox'
                              id={policy.name || ''}
                              value={policy.name || ''}
                              onChange={(event) => handlecheck(event)}
                            />
                            <strong className='text-medium-text font-[600]'>
                              {policy.policyMessage}
                              <span className='text-red-600 p-1'>*</span>
                            </strong>
                          </div>
                        ) : (
                          policy.policyMessage != '' &&
                            policy.policyMessage != null && (
                              <div className='mt-[20px] ' key={policy.name}>
                                <strong className=' text-medium-text font-[600]'>
                                  {policy.policyMessage}
                                </strong>
                              </div>
                            )
                        );
                      })}
                    {endUserDisplay && (
                      <div className='mt-[20px] font-[600]'>
                        <div className='mb-[10px]'>
                          End User Name (your customer) :{' '}
                          <span className='text-red-600 p-1'>*</span>
                        </div>
                        <input
                          type='text'
                          id='enduserstio'
                          className='form-input'
                          onChange={(event) => {
                            if (event.target.value.trim() !== '')
                              return setEndUserName(event.target.value.trim());
                            setEndUserName('');
                          }}
                          onBlur={(event) => {
                            if (event.target.value.trim() !== '')
                              return setEndUserName(event.target.value.trim());
                            setEndUserName('');
                          }}
                        />
                      </div>
                    )}
                    <div className=' pb-30'>
                      <button
                        id='checkout'
                        key={'/checkout'}
                        className={`my-4 w-full `}
                        disabled={!buttonDisabed}
                        onClick={() => {
                          localStorage.setItem('endusername', endUserNameS);
                          router.push(`${paths.CHECKOUT}`);
                        }}
                      >
                        <a
                          className={`btn btn-lg btn-primary !flex items-center justify-center w-full ${
                            !buttonDisabed ? 'opacity-40' : ''
                          }`}
                        >
                          <span className='material-icons text-lg mr-[2px]'>
                            shopping_cart
                          </span>
                          CHECKOUT NOW
                        </a>
                      </button>
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

export default CartType5;
