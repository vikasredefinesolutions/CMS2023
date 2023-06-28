import Price from '@appComponents/Price';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { GetShippingmethod } from '@services/address.service';
import { FetchSalesTax } from '@services/checkout.service';
import { _CO6_Screens } from '@templates/checkout/checkoutType6/CO6_Extras';
import React, { useEffect, useState } from 'react';

interface _Props {
  // methods: { name: string; price: number }[];
  city: string;
  state: string;
  countryName: string;
  postalCode: string;
  setScreenToShow: React.Dispatch<React.SetStateAction<_CO6_Screens>>;
}

const CO6_ChooseShippingMethods: React.FC<_Props> = ({
  city,
  state,
  postalCode,
  countryName,
  setScreenToShow,
}) => {
  const customerId = GetCustomerId();
  const {
    setShowLoader,
    update_CheckoutShippingMethod,
    update_CheckoutCharges,
  } = useActions_v2();
  const { id: storeId, cartCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { shippingMethodId } = useTypedSelector_v2(
    (state) => state.sbStore.store,
  );
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);

  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };

  const { name: selectedShipping } = useTypedSelector_v2(
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
    const payload = {
      customerId: customerId,
      zipCode: zipCode || '0',
      shippingCharges: shippingCharges || 0,
      smallRunFee: smallRunFee.toFixed(2),
      //
      logoTotal: 0,
      lineTotal: 0,
      logoSetupCharge: 0,
    };

    await FetchSalesTax(payload)
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
      shippingType: shippingMethodId,
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
        if (response[0].price) {
          update_CheckoutShippingMethod({
            type: 'method',
            value: response[0],
          });
          setAvailableShippingMethods(response);
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
    calculateTax({
      shippingCharges: 0,
      smallRunFee: cartCharges?.smallRunFeesCharges || 0,
      zipCode: postalCode,
    });
  }, []);

  useEffect(() => {
    if (!countryName || !state || !postalCode || !city) return;

    const getData = setTimeout(() => {
      calculateShippingCharges();
    }, 1500);

    return () => clearTimeout(getData);
  }, [city, state, postalCode, countryName, cartItems]);

  if (availableShippingMethods.length === 0) return null;
  return (
    <div className='bg-light-gray w-full mb-[30px]' id='ShippingMethods'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Shipping Methods</div>
        </div>

        {/* <div className='flex flex-wrap items-center gap-[10px] mt-[10px]'>
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
        </div> */}

        <>
          <div className='text-default-text mb-[5px] mt-[10px]'>
            Choose Shipping Method
          </div>
          {availableShippingMethods.map((method, index) => {
            return (
              <div key={index} className='flex items-center mb-[10px]'>
                <input
                  id={`radio-${index}`}
                  type='radio'
                  value=''
                  name={`radio-${index}`}
                  checked={method.name === selectedShipping}
                  onClick={() => updateShippingMethod(method)}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor={`radio-${index}`}
                  className='ml-2 text-default-text'
                >
                  {method.name}({<Price value={method.price} />})
                </label>
              </div>
            );
          })}
        </>

        {/* <div className=''>
          <button
            id='GoToPaymentDetailsBtn'
            onClick={() => setScreenToShow('addPaymentMethodAndBilling')}
            className='btn btn-lg btn-secondary'
          >
            GO TO PAYMENT DETAILS
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CO6_ChooseShippingMethods;
