import NxtImage from '@appComponents/reUsable/Image';
import { paymentMethodCustom } from '@constants/enum';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _HandlerProps } from '../..';
import CO2_EL_PaymentOption from '../CO2_EL_PaymentOption';
import AddressFormPk from '../Form';

interface _PaymentProps {
  updatePaymentMethod: (arg: paymentMethodCustom) => void;
  changeHandler: (e: _HandlerProps) => void;
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
  billingAddress: AddressType | null;
  ShippingFormik: any;
  setBillingAddress: (args: any) => void;
}

const PaymentChange: React.FC<_PaymentProps> = ({
  updatePaymentMethod,
  changeBillingAddress,
  BillingFormik,
  setChangeBillingAddress,
  setUseShippingAddress,
  paymentMethod,
  useShippingAddress,
  billingAddress,
  setBillingAddress,
  ShippingFormik,
}) => {
  const employeeLogin = useTypedSelector_v2((state) => state.employee.loggedIn);
  const { el } = useTypedSelector_v2((state) => state.checkout);

  return (
    <>
      {
        <>
          <div className='flex flex-wrap items-center justify-between pt-[10px] mb-[20px]'>
            <div className='pb-[10px] text-default-text'>
              All fields marked with * are required fields.
            </div>
            <div className='pb-[10px]'>
              <NxtImage
                useNextImage={false}
                className=''
                alt=''
                isStatic={true}
                src='/norton.png'
              />
            </div>
          </div>
          {changeBillingAddress && (
            <div className='mb-[20px]' id='BillingShippingAddress'>
              <input
                type='checkbox'
                id='BillingShippingAddressChk'
                name=''
                checked={useShippingAddress}
                onChange={(e) => {
                  if (e.target.checked) {
                    setBillingAddress(ShippingFormik.values);
                    setUseShippingAddress(e.target.checked);
                  } else {
                    setChangeBillingAddress(true);
                    setUseShippingAddress(e.target.checked);
                  }
                }}
              />
              <label className=''>Billing & Shipping Address is the same</label>
            </div>
          )}
          {!useShippingAddress && changeBillingAddress && (
            <div>
              {' '}
              <div className='pt-[10px] border-b border-[#ececec]'>
                <div className='pb-[10px] text-title-text'>Billing Address</div>
              </div>
              <AddressFormPk
                addressformik={BillingFormik}
                values={BillingFormik.values}
                touched={BillingFormik.touched}
                errors={BillingFormik.errors}
              />
            </div>
          )}
          {/* {!employeeLogin && (
            <div className='mb-[20px]' id='BillingShippingAddress'>
              <input
                type='checkbox'
                id='BillingShippingAddressChk'
                name=''
                checked={!changeBillingAddress}
                onClick={() => {
                  if (!useShippingAddress) {
                    setShippingAddress(billingAddress);
                  }
                  setChangeBillingAddress(!changeBillingAddress);
                  setUseShippingAddress(!useShippingAddress);
                }}
              />
              <label className=''>Billing & Shipping Address is the same</label>
            </div>
          )}

          {employeeLogin && (
            <div className='mb-[20px]' id='BillingShippingAddress'>
              <input
                type='checkbox'
                id='BillingShippingAddressChk'
                name=''
                onClick={() => {
                  setChangeBillingAddress(!changeBillingAddress);
                  setUseShippingAddress(!useShippingAddress);
                }}
                checked={changeBillingAddress}
              />
              <label className=''>Billing & Shipping Address is the same</label>
            </div>
          )}

          {!employeeLogin && changeBillingAddress && (
            <>
              <div className='pt-[10px] border-b border-[#ececec]'>
                <div className='pb-[10px] text-title-text'>Billing Address</div>
              </div>
              <AddressFormPk
                addressformik={BillingFormik}
                values={BillingFormik.values}
                touched={BillingFormik.touched}
                errors={BillingFormik.errors}
              />
            </>
          )}
          {employeeLogin && !changeBillingAddress && (
            <>
              <div className='pt-[10px] border-b border-[#ececec]'>
                <div className='pb-[10px] text-title-text'>Billing Address</div>
              </div>
              <AddressFormPk
                addressformik={BillingFormik}
                values={BillingFormik.values}
                touched={BillingFormik.touched}
                errors={BillingFormik.errors}
              />
            </>
          )} */}
        </>
      }

      <div className='flex justify-between flex-wrap items-center mt-[12px]  flex-wrap'>
        <div className='mb-[15px] w-full'>
          <button
            className={`bg-[#ffffff] flex items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000] ${
              el.isPaymentPending
                ? 'opacity-50'
                : paymentMethod == paymentMethodCustom.creditCard
                ? 'bg-gray-200 text-[#fff]'
                : ''
            }`}
            disabled={el.isPaymentPending}
            onClick={() => updatePaymentMethod(paymentMethodCustom.creditCard)}
          >
            <span className='mr-[10px]'>
              <NxtImage
                useNextImage={false}
                isStatic={true}
                className=''
                src='/cards.jpg'
                alt='/credit card'
              />
            </span>
            <span>SELECT CREDIT CARD</span>
          </button>
        </div>
        {
          <div className='mb-[15px]'>
            <button
              className={`bg-[#ffffff] flex flex-wrap items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000] ${
                el.isPaymentPending
                  ? 'opacity-50'
                  : paymentMethod == paymentMethodCustom.purchaseOrder
                  ? 'bg-gray-200 text-[#fff]'
                  : ''
              }`}
              disabled={el.isPaymentPending}
              onClick={() =>
                updatePaymentMethod(paymentMethodCustom.purchaseOrder)
              }
            >
              <span>SELECT PURCHASE ORDER</span>
            </button>
          </div>
        }
      </div>
      {employeeLogin && <CO2_EL_PaymentOption />}
    </>
  );
};

export default PaymentChange;
