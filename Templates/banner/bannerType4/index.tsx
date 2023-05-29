import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _globalStore } from 'store.global';
import { _BannerComponentProps } from '../Banner';

let mediaBaseUrl = _globalStore.blobUrl;

const BannerType4: React.FC<_BannerComponentProps> = ({
  banner,
  setShowModal,
  showModal,
  userId,
}) => {
  const store = useTypedSelector_v2((state) => state.store);
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  if (banner === null || banner.length < 1) {
    return <></>;
  } else {
    
    return (
      <>
      {storeCode !== 'PKHG' &&  <>
        {!userId && (
          <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
            <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
              <div
                onClick={() => setShowModal('login')}
                className='inline-flex items-center tracking-[1.2px] text-default-text font-medium'
              >
                {__pagesText.productListing.Banner.loginforExclusivePrice}
                <span className='material-icons'>
                  {__pagesText.Headers.loginIcon}
                </span>
              </div>
            </div>
          </div>
        )}
        </>
        }
        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div className='items-center sm:pl-[40px] sm:pr-[40px] sm:pt-[40px] sm:pb-[40px] md:pl-[70px] md:pr-[0px] md:pt-[40px] md:pb-[40px] pl-[0px] pr-[0px] pt-[16px] pb-[16px] bg-light-gray'>
            <div className='flex flex-wrap items-center gap-y-[40px]'>
              <div className='w-full text-[#000000] md:pl-[0px] md:pr-[0px] pl-[16px] pr-[16px]'>
                <div className='text-2xl-text pb-[10px]'>{banner[0].name}</div>
                <div className='text-sub-text pb-[5px]'>{banner[0].h2}</div>
                <div
                  className='text-default-text font-default-text text-color-default-text'
                  dangerouslySetInnerHTML={{
                    __html: banner[0].description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </>
    );
  }
};

export default BannerType4;
