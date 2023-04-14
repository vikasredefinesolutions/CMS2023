import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _globalStore } from 'store.global';
import { _BannerComponentProps } from '../Banner';
let mediaBaseUrl = _globalStore.blobUrl;

const BannerType3: React.FC<_BannerComponentProps> = ({
  banner,
  setShowModal,
  showModal,
  userId,
}) => {
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  if (banner === null || banner.length < 1) {
    return <></>;
  } else {
    return (
      <>
        {!userId && (
          <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
            <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
              <a
                onClick={() => setShowModal('login')}
                className='inline-flex items-center tracking-[1.2px] text-default-text font-medium'
              >
                {__pagesText.productListing.Banner.loginforExclusivePrice}
                <span className='material-icons'>
                  {__pagesText.Headers.loginIcon}
                </span>
              </a>
            </div>
          </div>
        )}
        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div
            className='items-center sm:pl-[40px] sm:pr-[40px] sm:pt-[40px] sm:pb-[40px] md:pl-[70px] md:pr-[70px] md:pt-[70px] md:pb-[70px] pl-[0px] pr-[0px] pt-[16px] pb-[16px]'
            style={{
              backgroundImage: banner[0]?.bannerImagePath
                ? `url(${mediaBaseUrl}${banner[0]?.bannerImagePath} no-repeat center center)`
                : 'url()',
            }}
          >
            <div className='flex flex-wrap items-center gap-y-[40px]'>
              <div className='w-full text-[#000000] md:pl-[0px] md:pr-[0px] pl-[16px] pr-[16px]'>
                <div className='text-2xl-text pb-[10px]'>{banner[0].h1}</div>
                <div className='text-sub-text pb-[5px]'>{banner[0].h2}</div>
                <div
                  className='text-medium-text'
                  dangerouslySetInnerHTML={{
                    __html: banner[0].description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto pl-[15px] pr-[15px]'>
          <div className='bg-secondary md:pt-[16px] md:pb-[16px] text-center'>
            <div className='md:flex justify-center pl-[15px] pr-[15px] md:pl-[0] md:pr-[0]'>
              <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-r-[#000000] border-b-[#fff]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>
                    {__pagesText.productListing.Banner.shippingIcon}
                  </span>
                  <div className='ml-[8px] text-left text-small-text'>
                    <div className='pb-[2px]'>
                      {__pagesText.productListing.Banner.freeShipping}
                    </div>
                    <div>{__pagesText.productListing.Banner.orderOver}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-r-[#000000] border-b-[#fff]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>style</span>
                  <div className='ml-[8px] text-left text-small-text'>
                    <div className='pb-[2px]'>
                      {__pagesText.productListing.Banner.firstLogoFree}
                    </div>
                    <div>
                      {__pagesText.productListing.Banner.uptoTenThousandStiches}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#000000]'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text'>verified</span>
                  <div className='ml-[8px] text-left text-small-text'>
                    <div className='pb-[2px]'>
                      {__pagesText.productListing.Banner.freeProof}
                    </div>
                    <div>{__pagesText.productListing.Banner.onAllOrders}</div>
                  </div>
                </div>
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

export default BannerType3;
