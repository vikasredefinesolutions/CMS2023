/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { __LocalStorage } from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { _ModalProps } from '../modal';

const ThirdPartyLogin: React.FC<_ModalProps> = ({
  modalHandler,
  closeHandler,
}) => {
  const router = useRouter();

  // const bothLogin = useTypedSelector_v2((state) => state.store.bothLogin);
  const [showErroMsg, setErrorMsg] = useState<null | string>(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  // const storeEmail = useTypedSelector_v2((state) => state.store.email_address);

  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      ThirdpartyServices.map((service) => {
        if (service.thirdPartyServiceName == 'Okta')
          if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.oktaLogin.toLocaleLowerCase()
          ) {
            localStorage.setItem(
              __LocalStorage.thirdPartyServiceName,
              service.thirdPartyServiceName,
            );
            service.url && router.push(service.url);
          } else if (
            service.thirdPartyServiceName.toLocaleLowerCase() ==
            thirdPartyLoginService.samlLogin.toLocaleLowerCase()
          ) {
            const jsonDate = new Date().toJSON();
            const datejson = jsonDate.split('.')[0] + 'Z';
            // console.log(datejson, 'datejson', jsonDate);
            service.url &&
              router.push(service.url + encodeURIComponent(datejson));
          }
      });
    });
  };

  return (
    <>
      <div
        id='LoginModal'
        className=' overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
      >
        <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
          <div className={`relative px-[16px] w-full max-w-2xl h-auto`}>
            <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-md'>
              <div className='flex justify-between items-center p-[15px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
                <div className='font-[600] text-medium-text'>
                  {__pagesText.productInfo.loginModal.signIn}
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={() =>
                    closeHandler ? closeHandler() : modalHandler(null)
                  }
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
              </div>{' '}
              <div className='p-[25px]'>
                <div className='mb-[10px] font-[700] text-lg text-center'>
                  <div className='mb-4'>
                    <button
                      onClick={SamlloginHandler}
                      className='btn btn-md btn-secondary w-full'
                      type='button'
                    >
                      CLICK HERE TO LOGIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdPartyLogin;
