/* eslint-disable no-unused-vars */
import { _ModalProps } from '@appComponents/modals/modal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { ForgetCustomerPassword } from '@services/customerUser.service';
import React, { useState } from 'react';

const ForgotModal: React.FC<_ModalProps> = ({ modalHandler }) => {
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const [Email, setEmail] = useState('');
  const [FinalMessage, setFinalMessage] = useState(false);
  const [Error, setError] = useState(false);

  const forgotPassword = async (email: string) => {
    try {
      const res = await ForgetCustomerPassword({ email, storeId });
      if (res?.issend) {
        setError(false);
        setFinalMessage(true);
        setEmail(email);
      } else {
        setError(true);
        setFinalMessage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        id='Login1Modal'
        aria-hidden='true'
        className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
              <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-large-text'>
                  {__pagesText.productInfo.forgotModal.forgotPassword}
                </div>

                <div className='flex items-center gap-x-2'>
                  <div
                    onClick={() => modalHandler('login')}
                    className='text-anchor'
                  >
                    &lt; {__pagesText.productInfo.forgotModal.back}
                  </div>

                  <button
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                    onClick={() => modalHandler(null)}
                  >
                    <svg
                      className='w-[24px] h-[24px]'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className='p-[25px]'>
                <div className='mb-[10px] medium-text text-center uppercase'>
                  {__pagesText.productInfo.forgotModal.forgotPassword}
                </div>

                <div className='Login-Main'>
                  <div className='mb-[10PX]'>
                    {FinalMessage || Error ? (
                      FinalMessage ? (
                        <p>
                          {__pagesText.productInfo.forgotModal.sentSucess1}
                          {Email}
                          {__pagesText.productInfo.forgotModal.sentSucess2}
                        </p>
                      ) : (
                        <p>
                          {Email} {__pagesText.productInfo.forgotModal.notFound}
                        </p>
                      )
                    ) : (
                      <input
                        type='email'
                        id='email-address0'
                        name='email-address0'
                        placeholder='Enter Your Email Address'
                        className='form-input'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </div>
                  {FinalMessage || Error ? (
                    ''
                  ) : (
                    <div className=''>
                      <button
                        className='btn btn-xl btn-secondary w-full'
                        onClick={() => forgotPassword(Email)}
                      >
                        {__pagesText.productInfo.forgotModal.forgotPassword}{' '}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotModal;
