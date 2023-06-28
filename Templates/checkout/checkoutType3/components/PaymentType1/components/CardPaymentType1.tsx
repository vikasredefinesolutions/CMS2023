import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { paymentMethodCustom } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { useState } from 'react';
import { paymentProps } from '..';

const CardPaymentType1: paymentProps = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
}) => {
  const [showCardHelp, setShowCardHelp] = useState(false);

  return (
    <div id='PaymentCard'>
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          Payment
        </div>
        <div>
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
      </div>
      <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
        <input
          onChange={changeHandler}
          autoComplete='off'
          onContextMenu={(e) => e.preventDefault()}
          name='cardNumber'
          placeholder=' '
          required={true}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        />
        <label
          htmlFor='CreditCardNumber'
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          Credit Card Number *
        </label>
        <div className='absolute top-[14px] right-[8px] flex items-center'>
          {cardType.map((res) => (
            <div
              key={res.name}
              className={`opacity-${
                detectCardType && detectCardType() === res.name ? '100' : '40'
              } ml-[4px] w-[32px]`}
            >
              <NxtImage isStatic={true} className='' src={res.url} alt='' />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 md:gap-y-6'>
        <div className='md:w-3/12 w-6/12 pl-[12px] pr-[12px]'>
          <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
            <select
              onChange={changeHandler}
              name='cardExpirationMonth'
              className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
            >
              <option value=''>Select</option>
              {new Array(12).fill('').map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>{' '}
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
              onChange={changeHandler}
              name='cardExpirationYear'
              className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
            >
              <option value=''>Select</option>
              {new Array(12).fill('').map((_, index) => {
                const optin = new Date().getFullYear() + index;
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
              onChange={changeHandler}
              name='cardVarificationCode'
              placeholder=' '
              required={true}
              className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
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
                  className='material-icons-outlined text-base'
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
