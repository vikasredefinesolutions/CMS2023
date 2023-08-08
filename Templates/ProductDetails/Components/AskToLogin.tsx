import { __pagesText } from '@constants/pages.text';
import { _AskToLoginprops } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const AskToLogin: React.FC<_AskToLoginprops> = ({ modalHandler }) => {
  const isUserLoggedIn = useTypedSelector_v2((state) => state.user.id);
  const showLoginOption = !isUserLoggedIn;
  const code  = useTypedSelector_v2((state) => state.store.code);
  return (
    <>
      {showLoginOption && (
        <>
          <div className='p-[10px] mt-[15px] border border-gray-700'>
            <div className='flex flex-wrap justify-between gap-y-[8px] items-center'>
              <div className='w-full md:w-1/2  text-sub-text'>
                <span className='w-full block text-sub-text '>
                  {' '}
                  {
                    __pagesText.productInfo.startOrderModal.askToLogin
                      .loginOrCreateAnAccount
                  }
                </span>{' '}
                {code === 'CG' && <span className='w-full block text-default-text'>
                  {
                    __pagesText.productInfo.startOrderModal.askToLogin
                      .toSeeDiscountPricing
                  }
                </span>}
                
              </div>
              <div className='w-full md:w-1/2  text-left'>
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
          </div>
        </>
      )}
    </>
  );
};

export default AskToLogin;
