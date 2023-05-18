import { __pagesText } from '@constants/pages.text';
import { _AskToLoginprops } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const AskToLogin: React.FC<_AskToLoginprops> = ({ modalHandler }) => {
  const isUserLoggedIn = useTypedSelector_v2((state) => state.user.id);
  const showLoginOption = !isUserLoggedIn;

  return (
    <>
      {showLoginOption && (
        <>
          <div className='mt-3 border border-gray-700 p-2.5 flex flex-wrap justify-between items-center gap-y-2'>
            <div className='w-full md:w-1/2 text-lg leading-none font-bold text-gray-900'>
              <span className='w-full block'>
                {' '}
                {
                  __pagesText.productInfo.startOrderModal.askToLogin
                    .loginOrCreateAnAccount
                }
              </span>{' '}
              <span className='w-full block text-base font-normal'>
                {
                  __pagesText.productInfo.startOrderModal.askToLogin
                    .toSeeDiscountPricing
                }
              </span>
            </div>
            <div className='w-full md:w-1/2 text-left flex justify-end'>
              <button
                onClick={() => modalHandler('login')}
                type='button'
                className='btn btn-secondary !flex !py-4 items-center justify-center w-full !font-semibold uppercase'
              >
                {
                  __pagesText.productInfo.startOrderModal.askToLogin
                    .loginCreateAccount
                }
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AskToLogin;
