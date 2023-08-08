import Price from '@appComponents/Price';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { GetShippingmethod } from '@services/address.service';
import { FetchSalesTax } from '@services/checkout.service';

import { HEALTHYPOINTS } from '@constants/global.constant';
import React, { useEffect, useState } from 'react';
import { _CO7R_Screens } from '../CO7R_Extras';

interface _Props {
  // methods: { name: string; price: number }[];
  city: string;
  state: string;
  countryName: string;
  postalCode: string;
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO7R_Screens>>;
  handleGoToPaymentScreen: () => void;
}

const CO7R_ChooseShippingMethods: React.FC<_Props> = ({
  city,
  state,
  postalCode,
  countryName,
  setScreenToShow,
  handleGoToPaymentScreen,
}) => {
  const customerId = GetCustomerId();
  const {
    setShowLoader,
    update_CheckoutShippingMethod,
    update_CheckoutCharges,
  } = useActions_v2();
  const {
    id: storeId,
    shippingChargeType,
    cartCharges,
  } = useTypedSelector_v2((state) => state.store);
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);

  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice;
    });

    return subTotal;
  };

  const { destination, name: selectedShipping } = useTypedSelector_v2(
    (state) => state.checkout.shippingMethod,
  );
  const [availableShippingMethods, setAvailableShippingMethods] = useState<
    {
      name: string;
      price: number;
    }[]
  >([]);

  const calculateTax = async ({
    zipCode,
    shippingCharges,
    smallRunFee,
  }: {
    zipCode: string;
    shippingCharges: number;
    smallRunFee: number;
  }) => {
    await FetchSalesTax({
      customerId: customerId,
      zipCode: zipCode,
      logoTotal: 0,
      lineTotal: 0,
      logoSetupCharge: 0,
      shippingCharges: shippingCharges,
      smallRunFee: smallRunFee.toFixed(2),
    })
      .then((res) => {
        update_CheckoutCharges({ type: 'SALES_TAX', cost: res });
      })
      .catch((error) => {
        console.log('ERROR: Sales Tax ===>', error);
      })
      .finally(() => {});
  };

  const calculateShippingCharges = async () => {
    setShowLoader(true);

    const payload = {
      storeId: storeId,
      customerID: customerId,
      shippingType: shippingChargeType,
      city: city,
      state: state,
      zipCode: postalCode,
      country: countryName,
      ordertotalwithoutshipppingcharge: calculateSubTotal(),
    };

    await GetShippingmethod({
      shippingMethodModel: payload,
    })
      .then((response) => {
        if (!response) return 0;
        if (response.length === 0) return 0;
        if (response[0].price >= 0) {
          setAvailableShippingMethods(response);
          update_CheckoutShippingMethod({
            type: 'method',
            value: response[0],
          });

          return response[0].price;
        }

        return 0;
      })
      .then((price) => {
        calculateTax({
          shippingCharges: price,
          smallRunFee: cartCharges?.smallRunFeesCharges || 0,
          zipCode: payload.zipCode,
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const updateShippingMethod = (method: { name: string; price: number }) => {
    update_CheckoutShippingMethod({
      type: 'method',
      value: {
        name: method.name,
        price: method.price,
      },
    });
    calculateTax({
      shippingCharges: method.price,
      smallRunFee: cartCharges?.smallRunFeesCharges || 0,
      zipCode: postalCode,
    });
  };

  useEffect(() => {
    if (!countryName || !state || !postalCode || !city) return;

    const getData = setTimeout(() => {
      calculateShippingCharges();
    }, 1500);

    return () => clearTimeout(getData);
  }, [city, state, postalCode, countryName, cartItems]);

  return (
    <div className='bg-light-gray w-full mb-[30px]' id='ShippingMethods'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Shipping Methods</div>
        </div>
        <div className='flex flex-wrap items-center gap-[10px] mt-[10px]'>
          <div className='text-default-text'>Shipping Destination Type</div>
          <div className='flex flex-wrap justify-between items-center grow max-w-[300px]'>
            <select
              value={destination}
              onChange={(event) => {
                update_CheckoutShippingMethod({
                  type: 'destination',
                  value: event.target.value as 'residential' | 'commercial',
                });
              }}
              className='form-input !w-[calc(100%-40px)]'
            >
              <option value='residential'>Residential</option>
              <option value='commercial'>Commercial</option>
            </select>
          </div>
        </div>
        {availableShippingMethods.length > 0 && (
          <>
            <div className='text-default-text mb-[5px] mt-[10px] !font-bold'>
              Choose Shipping Method
            </div>
            {availableShippingMethods.map((method, index) => {
              return (
                <div key={index} className='flex items-center mb-[10px]'>
                  <div
                    className='inline-block'
                    onClick={() => updateShippingMethod(method)}
                  >
                    <>
                      <input
                        id={`radio-${index}`}
                        type='radio'
                        value=''
                        name='radio'
                        checked={method.name === selectedShipping}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor={`radio-${index}`}
                        className='ml-2 text-default-text'
                      >
                        {method.name.toLowerCase() === 'free shipping'
                          ? 'Fedex Ground'
                          : method.name}
                        ({<Price value={method.price} />})
                      </label>
                    </>
                  </div>
                </div>
              );
            })}
            <div className='text-default-text mt-[10px]'>Apply Freight</div>
          </>
        )}
        <div className='mt-[20px]'>
          <button
            id='GoToPaymentDetailsBtn'
            onClick={() => {
              if (storeCode == HEALTHYPOINTS) {
                return setScreenToShow('completeOrderDetails');
              }
              handleGoToPaymentScreen();
            }}
            className='btn btn-lg btn-secondary'
          >
            {storeCode == HEALTHYPOINTS
              ? 'GO TO REVIEW ORDER'
              : 'GO TO PAYMENT DETAILS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CO7R_ChooseShippingMethods;
