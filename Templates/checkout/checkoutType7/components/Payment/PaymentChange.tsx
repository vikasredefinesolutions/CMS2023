import { paymentMethodCustom } from '@constants/enum';
import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { ChangeEvent, useEffect, useState } from 'react';
import CO2_EL_PaymentOption from '../CO2_EL_PaymentOption';

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
  const employeeLogin = useTypedSelector_v2((state) => state.employee.loggedIn);
  const { el } = useTypedSelector_v2((state) => state.checkout);
  const { code: storeCode, storeXPaymetnOptionListViewModels } =
    useTypedSelector_v2((state) => state.store);
  const { customerUseCreditBalance } = useActions_v2();
  const { allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  console.log(storeXPaymetnOptionListViewModels, 'payment list oprion');

  const [showPO, setShowPO] = useState<boolean>(false);
  const [showCredit, setShowCredit] = useState<boolean>(false);

  useEffect(() => {
    storeXPaymetnOptionListViewModels.map((el) => {
      if (el.paymentOptionId == 3) {
        setShowCredit(true);
      }
      if (el.paymentOptionId == 2) {
        setShowPO(true);
      }
    });
  }, []);
  return (
    <>
      {(storeCode === CYXTERA_CODE || storeCode == UNITI_CODE) && (
        <div>
          <label>
            <input
              type='checkbox'
              defaultChecked={true}
              onChange={(e) => {
                customerUseCreditBalance(e.target.checked);
              }}
            />
            {`Use Credit ? Available credit amount: ${allowedBalance} credits ($${allowedBalance})`}
          </label>
        </div>
      )}
      <div className='flex justify-between flex-wrap items-center mt-[12px]  flex-wrap'>
        {showCredit && (
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
              onClick={() =>
                updatePaymentMethod(paymentMethodCustom.creditCard)
              }
            >
              <span className='mr-[10px]'>
                <img className='' src='/cards.jpg' alt='/credit card' />
              </span>
              <span>SELECT CREDIT CARD</span>
            </button>
          </div>
        )}
        {showPO && (
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
        )}
      </div>
      {employeeLogin && <CO2_EL_PaymentOption />}
    </>
  );
};

export default PaymentChange;
