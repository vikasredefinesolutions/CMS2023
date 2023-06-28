import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { paymentMethodCustom } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import CheckoutController from '@controllers/checkoutController';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
import { paymentProps } from '..';
import CT1_EL_PaymentOption from '../../CO1_EL_PaymentOption';

const CardPaymentType1: paymentProps = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
  cardDetails,
  purchaseOrder,
}) => {
  const [showCardHelp, setShowCardHelp] = useState(false);
  const [checkCard, setcardCheck] = useState(false);
  const [input, setInput] = useState<number | string>(
    cardDetails?.cardNumber ? cardDetails?.cardNumber : '',
  );
  const [cvv, setcvv] = useState<string>(
    cardDetails?.cardVarificationCode ? cardDetails?.cardVarificationCode : '',
  );
  const { blockInvalidChar } = CheckoutController();

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  const handleCard = (e: any) => {
    if (!Number(e.target.value) || e.target.value.length == 0) {
      setcardCheck(false);
      setInput('');

      return;
    } else {
      if (e.target.value.length < e.target.maxLength + 1) {
        setInput(e.target.value);
        setcardCheck(true);
      }
    }
  };

  const handleCVV = (e: any) => {
    const regex = new RegExp('[0-9]').test(e.target.value);
    if (!regex) {
      setcvv('');
      return;
    } else {
      if (e.target.value.length < e.target.maxLength + 1) {
        setcvv(e.target.value);
      }
    }
  };

  const [yearMonth, setyearMonth] = useState({
    cardExpirationYear: '',
    cardExpirationMonth: '',
  });

  const handledefault = (e: any) => {
    const d = new Date().getMonth() + 1;
    e.target.setAttribute('value', e.target.value);
    if (e.target.value >= d) {
      e.target.classList.remove('border', 'border-solid', 'border-red-700');
      e.target.classList.add('border-0');
      setyearMonth({ ...yearMonth, [e.target.name]: e.target.value });
    } else {
      e.target.classList.remove('border-0');
      e.target.classList.add('border', 'border-red-700', 'border-solid');
      // console.log('non');
    }
  };

  useEffect(() => {
    if (
      cardDetails &&
      Object.values(cardDetails).some((x) => x === null || x === '')
    ) {
      document.querySelectorAll('.selectFiled').forEach((el) => {
        el.setAttribute('value', '');
      });
    }

    if (cardDetails && cardDetails?.cardNumber.length > 14) {
      setcardCheck(true);
    }
  }, []);

  return (
    <div id='PaymentCard'>
      {/* flex items-baseline mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border */}
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          Payment
        </div>
        <div>
          {!employeeLogin.isPaymentPending && (
            <div className='w-full flex justify-end'>
              <button
                className='!text-anchor hover:!text-anchor-hover underline'
                id='btn-use-purchase-order'
                onClick={() =>
                  updatePaymentMethod(paymentMethodCustom.purchaseOrder)
                }
              >
                Use Purchase Order
              </button>
            </div>
          )}
          {isEmployeeLoggedIn && <CT1_EL_PaymentOption />}
        </div>
      </div>
      <div
        className={`relative z-0 w-full mb-[20px] border border-gray-border rounded ${
          employeeLogin.isPaymentPending ? 'opacity-50' : ''
        }`}
      >
        <input
          autoComplete='off'
          onContextMenu={(e) => e.preventDefault()}
          onBlur={changeHandler}
          onKeyDown={blockInvalidChar}
          onChange={(e) => {
            changeHandler(e);
            handleCard(e);
          }}
          name='cardNumber'
          placeholder=' '
          required={true}
          value={input}
          maxLength={
            +`${detectCardType && detectCardType() === 'AMEX' ? 15 : 16}`
          }
          type='number'
          disabled={employeeLogin.isPaymentPending}
          className='apperance pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        />
        <label
          htmlFor='CreditCardNumber'
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          Credit Card Number *
        </label>
        <div className={`${!checkCard ? 'block' : 'hidden'}`}>
          <div className='absolute top-[14px] right-[8px] flex items-center'>
            {cardType.map((res) => (
              <div key={res.name} className={`opacity-70 ml-[4px] w-[32px]`}>
                <NxtImage isStatic={true} className='' src={res.url} alt='' />
              </div>
            ))}
          </div>
        </div>
        <div className={`${checkCard ? 'block' : 'hidden'}`}>
          <div className='absolute top-[14px] right-[8px] flex items-center'>
            {cardType.map((res) => (
              <div
                key={res.name}
                className={`opacity-${
                  detectCardType && detectCardType() === res.name
                    ? '1 block'
                    : '40 hidden'
                } ml-[4px] w-[32px]`}
              >
                <NxtImage isStatic={true} className='' src={res.url} alt='' />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`flex flex-wrap -mx-3 md:gap-y-6 ${
          employeeLogin.isPaymentPending ? 'opacity-50' : ''
        }`}
      >
        <div className='md:w-3/12 w-6/12 pl-[12px] pr-[12px]'>
          <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
            <select
              onBlur={changeHandler}
              onChange={handledefault}
              name='cardExpirationMonth'
              disabled={employeeLogin.isPaymentPending}
              data-value={yearMonth.cardExpirationMonth}
              className='selectFiled pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
            >
              <option value=''></option>
              {new Array(12).fill('').map((_, index) => {
                const selected =
                  cardDetails && index + 1 === +cardDetails.cardExpirationMonth
                    ? true
                    : false;
                if (selected) {
                  return index < 9 ? (
                    <>
                      <option key={index} value={`0${index + 1}`} selected>
                        {`0${index + 1}`}
                      </option>
                    </>
                  ) : (
                    <>
                      <option key={index} value={index + 1} selected>
                        {index + 1}
                      </option>
                    </>
                  );
                }
                return index < 9 ? (
                  <>
                    <option key={index} value={`0${index + 1}`}>
                      {`0${index + 1}`}
                    </option>
                  </>
                ) : (
                  <>
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  </>
                );
              })}
            </select>
            <label
              htmlFor='Month'
              className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Month *
            </label>
          </div>
        </div>
        <div className='md:w-3/12 w-6/12 pl-[12px] pr-[12px]'>
          <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
            <select
              onBlur={changeHandler}
              onChange={handledefault}
              name='cardExpirationYear'
              disabled={employeeLogin.isPaymentPending}
              data-value={yearMonth.cardExpirationYear}
              className='selectFiled pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
            >
              <option value=''></option>
              {new Array(12).fill('').map((_, index) => {
                const optin = new Date().getFullYear() + index;
                const selected =
                  cardDetails?.cardExpirationYear &&
                  optin === +cardDetails.cardExpirationYear
                    ? true
                    : false;
                if (selected) {
                  return (
                    <option key={index} value={optin} selected>
                      {optin}
                    </option>
                  );
                }
                return (
                  <option key={index} value={optin}>
                    {optin}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor='Year'
              className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Year *
            </label>
          </div>
        </div>
        <div className='md:w-6/12 w-6/12 pl-[12px] pr-[12px]'>
          <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
            <input
              onBlur={changeHandler}
              onChange={handleCVV}
              name='cardVarificationCode'
              onKeyDown={blockInvalidChar}
              placeholder=' '
              disabled={employeeLogin.isPaymentPending}
              required={true}
              maxLength={
                +`${detectCardType && detectCardType() === 'AMEX' ? 4 : 3}`
              }
              // value={cvv}
              value={cvv}
              type='number'
              className='apperance  pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
            />
            <label
              htmlFor='SecurityCode'
              className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Security Code (CCV) *
            </label>
            <div className='absolute top-[12px] right-[8px]'>
              <div className='relative' x-data='{ open: false }'>
                <button className='' aria-haspopup='true'></button>
                <span
                  onMouseEnter={() => setShowCardHelp(true)}
                  onMouseLeave={() => setShowCardHelp(false)}
                  className='material-icons-outlined text-base text-anchor'
                >
                  {' '}
                  help
                </span>
                <div className='z-10 absolute bottom-full left-1/2 transform -translate-x-1/2'>
                  <div
                    className='bg-slate-800 p-2 rounded overflow-hidden mb-2'
                    style={{ display: showCardHelp ? 'block' : 'none' }}
                  >
                    <div className='text-xs text-gray-200 font-light'>
                      {__pagesText.CheckoutPage.cardInstruction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentType1;
