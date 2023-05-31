import NxtImage from '@appComponents/reUsable/Image';
import { paymentMethodCustom } from '@constants/enum';
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { ChangeEvent, useEffect, useState } from 'react';

interface _PaymentProps {
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  detectCardType?: () => string;
  changeBillingAddress?: boolean;
  BillingFormik: any;
  setChangeBillingAddress: (value: boolean) => void;
  cardDetails?: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardVarificationCode: string;
  };
  purchaseOrder?: string;
  paymentMethod?: paymentMethodCustom;
}

const PaymentChange: React.FC<_PaymentProps> = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
  changeBillingAddress,
  BillingFormik,
  setChangeBillingAddress,
  cardDetails,
  purchaseOrder,
  paymentMethod,
}) => {
  const [countries, setCountries] = useState<_Country[] | []>([]);

  const [state, setState] = useState<_State[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<_Country>({
    id: 0,
    name: '',
    countryCode: '',
  });

  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (res) {
        setCountries(res);
        FetchStatesList(res[0].id).then((res) =>
          res ? setState(res) : setState([]),
        );
      }
    });
  }, [selectedCountry.id]);

  return (
    <>
      {
        <>
          <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[20px]'>
            <div className='pb-[10px] text-default-text'>
              All fields marked with * are required fields.
            </div>
            <div className='pb-[10px]'>
              <img src='/norton.png' />
            </div>
          </div>
          <div className='mb-[20px]' id='BillingShippingAddress'>
            <input
              type='checkbox'
              id='BillingShippingAddressChk'
              name=''
              onClick={() => {
                setChangeBillingAddress(!changeBillingAddress);
              }}
            />
            <label className=''>Billing & Shipping Address is the same</label>
          </div>
          {changeBillingAddress && (
            <form>
              <div id='BillingAddress'>
                <div className='pt-[10px] border-b border-[#ececec]'>
                  <div className='pb-[10px] text-title-text'>
                    Billing Address
                  </div>
                </div>
                <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
                  All Fields marked * are required fields.
                </div>
                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      First Name*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='firstName'
                        placeholder=' '
                        value={BillingFormik.values.firstName}
                        className='form-input !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.firstName ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Last Name*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='lastName'
                        placeholder=' '
                        value={BillingFormik.values.lastName}
                        className='form-input !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.lastName ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                  <div className='mb-[15px] w-full pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Street Address*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='streetAddress'
                        placeholder=' '
                        value={BillingFormik.values.streetAddress}
                        className='form-input !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.streetAddress ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Apt, Suite
                    </label>
                    <input
                      onBlur={BillingFormik.handleBlur}
                      onChange={BillingFormik.handleChange}
                      name='aptSuite'
                      placeholder=' '
                      value={BillingFormik.values.aptSuite}
                      className='form-input'
                    />
                  </div>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Zip Code*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='zipCode'
                        placeholder=' '
                        value={BillingFormik.values.zipCode}
                        className='form-input  !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.zipCode ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>City*</label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='city'
                        placeholder=' '
                        value={BillingFormik.values.city}
                        className='form-input  !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.city ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      State / Province*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <select
                        className='form-input !w-[calc(100%-40px)]'
                        placeholder='Select Country'
                        name='state'
                        onChange={BillingFormik.handleChange}
                        value={BillingFormik.values.state}
                      >
                        <option value='1'>United States</option>
                      </select>
                      <img className='ml-[5px]' src='/yes.png' />
                      <img className='ml-[5px] ' src='/no.png' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap ml-[-15px] mr-[-15px] mb-[30px]'>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Country*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <select
                        className='form-input !w-[calc(100%-40px)]'
                        placeholder='Select Country'
                        name='country'
                        onChange={BillingFormik.handleChange}
                        value={BillingFormik.values.country}
                      >
                        <option value='1'>United States</option>
                      </select>
                      <img className='ml-[5px]' src='/yes.png' />
                      <img className='ml-[5px] ' src='/no.png' />
                    </div>
                  </div>
                  <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
                    <label className='mb-[4px] text-normal-text'>
                      Phone Number*
                    </label>
                    <div className='flex flex-wrap justify-between items-center'>
                      <input
                        onBlur={BillingFormik.handleBlur}
                        onChange={BillingFormik.handleChange}
                        name='phone'
                        placeholder=' '
                        value={BillingFormik.values.phone}
                        className='form-input  !w-[calc(100%-40px)]'
                      />
                      {BillingFormik.errors.phone ? (
                        <img className='ml-[5px] ' src='/no.png' />
                      ) : (
                        <img className='ml-[5px]' src='/yes.png' />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      }
      <div className='flex justify-between flex-wrap items-center mt-[12px]  flex-wrap'>
        <div className='mb-[15px] w-full'>
          <button
            className={`bg-[#ffffff] flex items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000] ${
              paymentMethod == paymentMethodCustom.creditCard
                ? 'bg-gray-500 text-[#fff]'
                : ''
            }`}
            onClick={() => updatePaymentMethod(paymentMethodCustom.creditCard)}
          >
            <span className='mr-[10px]'>
              <NxtImage className='' alt='credit card' src={'//cards.jpg'} />
            </span>
            <span>SELECT CREDIT CARD</span>
          </button>
        </div>
        <div className='mb-[15px]'>
          <button
            className={`bg-[#ffffff] flex flex-wrap items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000] ${
              paymentMethod == paymentMethodCustom.purchaseOrder
                ? 'bg-gray-500'
                : ''
            }`}
            onClick={() =>
              updatePaymentMethod(paymentMethodCustom.purchaseOrder)
            }
          >
            <span className='mr-[10px]'>
              <NxtImage className='' alt='credit card' src={'//cards.jpg'} />
            </span>
            <span>SELECT PURCHASE ORDER</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentChange;
