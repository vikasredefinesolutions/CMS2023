import NxtImage from '@appComponents/reUsable/Image';
import { paymentMethodCustom } from '@constants/enum';
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { ChangeEvent, useEffect, useState } from 'react';
import AddressFormPk from '../Form';

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
    creditCardHolder: string;
  };
  purchaseOrder?: string;
  paymentMethod?: paymentMethodCustom;
  setUseShippingAddress: (args: boolean) => void;
  useShippingAddress: boolean;
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
  setUseShippingAddress,
  paymentMethod,
  useShippingAddress,
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
          {changeBillingAddress && (
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
          )}
          {changeBillingAddress && (
            <>
              <div className='pt-[10px] border-b border-[#ececec]'>
                <div className='pb-[10px] text-title-text'>Billing Address</div>
              </div>
              <AddressFormPk addressformik={BillingFormik} />
            </>
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
