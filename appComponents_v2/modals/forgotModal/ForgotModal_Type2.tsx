/* eslint-disable no-unused-vars */
import { _ModalProps } from '@appComponents/modals/modal';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { ForgetCustomerPassword } from '@services/customerUser.service';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ForgotModal_Type2: React.FC<_ModalProps> = ({ modalHandler }) => {
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { setShowLoader } = useActions_v2();
  const [Email, setEmail] = useState('');
  const [FinalMessage, setFinalMessage] = useState(false);
  const [Error, setError] = useState(false);
  const [errorStatement, setErrorStatement] = useState(false);

  const router = useRouter();

  const forgotPassword = async (email: string) => {
    if (email) {
      const regex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      );
      if (email.match(regex)) {
        try {
          setShowLoader(true);
          const res = await ForgetCustomerPassword({ email, storeId });
          setShowLoader(false);
          if (res?.issend) {
            setError(false);
            setFinalMessage(true);
            setEmail(email);
            alert(__pagesText.productInfo.forgotModal.sucessmesage);
          } else {
            setError(true);
            setFinalMessage(false);
          }
        } catch (error) {
          setShowLoader(false);
          console.log(error);
        }
      } else {
        setErrorStatement(true);
      }
    } else {
      alert('Email Cannot be empty');
      setErrorStatement(true);
    }
  };

  const showerror = () => {
    alert(__pagesText.productInfo.forgotModal.notFound);
  };

  if (Error) {
    showerror();
    setError(false);
  }

  return (
    <div
      onClick={(e) => {
        modalHandler(null);
      }}
    >
      <div
        id='Login1Modal'
        className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div
            className='relative w-full max-w-xl h-auto bg-cover'
            style={{
              backgroundImage: 'url("/assets/images/login-bg-gdg.jpg")',
            }}
          >
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full p-[20px] bg-opacity-60'>
              <div className='flex justify-center items-start p-[15px] bg-tertiary text-large-text'>
                <div className='font-[600] text-[#ffffff]'>
                  WELCOME TO GDG CLUB
                </div>
              </div>
              <div
                className='p-[25px] bg-cover'
                style={{
                  backgroundImage: 'url("/assets/images/login-bg-1-gdg.jpg")',
                }}
              >
                <div className='mb-[10px] medium-text text-center '>
                  {__pagesText.productInfo.forgotModal.forgotPassword}
                </div>
                <div className='Login-Main mx-auto'>
                  <div className='relative mb-[10px] flex'>
                    <div className='bg-tertiary flex items-center justify-center p-[2px]'>
                      <span className='material-icons-round text-white'>
                        person
                      </span>
                    </div>
                    <input
                      type='email'
                      placeholder='Enter Email Address'
                      className='form-input'
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className='mb-[20px]'>
                    <button
                      type='button'
                      className='btn btn-secondary w-full'
                      id=''
                      onClick={(e) => {
                        e.stopPropagation();
                        forgotPassword(Email);
                      }}
                    >
                      {__pagesText.productInfo.forgotModal.forgotPassword}
                    </button>
                  </div>
                </div>
                <div className='flex flex-wrap items-start justify-between'>
                  <button
                    data-modal-toggle='LoginModal'
                    className='btn btn-secondary mr-[10px]'
                    onClick={() => modalHandler('login')}
                  >
                    Back
                  </button>
                  <div className='w-full sm:w-auto flex flex-wrap items-center justify-between gap-[10px]'>
                    <div className=''>Register as a</div>
                    <button
                      className='btn btn-secondary'
                      onClick={() => {
                        modalHandler(null);
                        router.push(paths.SIGN_UP);
                      }}
                    >
                      INDIVIDUALS
                    </button>{' '}
                    <button
                      className='btn btn-secondary'
                      onClick={() => {
                        modalHandler(null);
                        router.push(paths.SIGNUP_TEAM);
                      }}
                    >
                      TEAMS
                    </button>
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

export default ForgotModal_Type2;
