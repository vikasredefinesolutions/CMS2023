import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { paymentMethodCustom } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { useState } from 'react';
import { paymentProps } from '..';

const CardPaymentType: paymentProps = ({ changeHandler, detectCardType }) => {
  const [showCardHelp, setShowCardHelp] = useState(false);

  return (
    <div id='PaymentCard'>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label
            htmlFor='creditCardHolder'
            className='mb-[4px] text-normal-text'
          >
            Name On Card*
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              type='text'
              onChange={changeHandler}
              name='creditCardHolder'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
            />
          </div>
        </div>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label
            htmlFor='CreditCardNumber'
            className='mb-[4px] text-normal-text'
          >
            Credit Card Number *
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              type='text'
              onChange={changeHandler}
              name='cardNumber'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label
            htmlFor='creditCardHolder'
            className='mb-[4px] text-normal-text'
          >
            Expiration Date*
          </label>
          <div className='flex items-center justify-start w-full'>
            <div className='flex items-center justify-start w-full'>
              <div className='flex flex-wrap justify-between items-center w-full'>
                <select
                  onChange={changeHandler}
                  name='cardExpirationYear'
                  className='form-input !w-[calc(100%-40px)]'
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
              </div>
            </div>
            <div className='ml-[5px] mr-[5px]'>/</div>
            <div className='flex flex-wrap justify-between items-center w-full'>
              <select
                onChange={changeHandler}
                name='cardExpirationMonth'
                className='form-input !w-[calc(100%-40px)]'
              >
                <option value=''>Select</option>
                {new Array(12).fill('').map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label htmlFor='SecurityCode' className='mb-[4px] text-normal-text'>
            Security Code(CVV/CVC)*
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              type='text'
              onChange={changeHandler}
              name='cardVarificationCode'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentType;
