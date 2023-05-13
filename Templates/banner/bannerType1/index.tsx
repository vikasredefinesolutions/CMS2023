/* eslint-disable no-unused-vars */
// import LoginModal from 'appComponents/modals/LoginModal';
import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import ImageComponent from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import Link from 'next/link';
import React from 'react';
import { _BannerComponentProps } from '../Banner';
const BannerType1: React.FC<_BannerComponentProps> = ({
  banner,
  setShowModal,
  showModal,
  userId,
}) => {
  if (banner === null || banner.length < 1) {
    return <></>;
  } else {
    return (
      <>
        <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
          <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
            <a
              onClick={() => (!userId ? setShowModal('login') : null)}
              className='inline-flex items-center tracking-[1.2px] text-default-text font-medium'
            >
              {__pagesText.productListing.Banner.loginforExclusivePrice}
              <span className='material-icons'>
                {__pagesText.Headers.loginIcon}
              </span>
            </a>
          </div>
        </div>

        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div className='items-center md:pl-[70px] md:pr-[70px] md:pt-[70px] md:pb-[70px] pl-[0px] pr-[0px] pt-[16px] pb-[16px] bg-light-gray'>
            <div className='flex flex-wrap items-center gap-y-[40px]'>
              <div className='w-full lg:w-1/2 sm:flex gap-[8px] h-full md:pl-[0px] pl-[16px] pr-[16px] pt-[2px] pb-[2px]'>
                <div className='w-full md:w-5/12 min-h-[100px] bg-[#ffffff] sm:bg-transparent shadow sm:shadow-none flex items-center justify-center pt-[15px] pb-[15px] sm:pt-[0px] sm:pb-[0px] text-sub-text md:text-title-text sm:text-[45px] font-bold sm:flex sm:items-center sm:justify-center cursor-pointer'>
                  {banner[0] && (banner[0].brandLogo || banner[0].banner) ? (
                    <Link
                      href={`${
                        banner[0].customSEName
                          ? `${banner[0].customSEName}.html`
                          : `javascript:void(0);`
                      }`}
                    >
                      <a>
                        <ImageComponent
                          title={banner[0].name}
                          className='lg:object-cover lg:max-w-none bg-white'
                          src={banner[0]?.brandImage || banner[0].banner}
                          alt={''}
                          useNextImage={false}
                        />
                      </a>
                    </Link>
                  ) : (
                    <ImageComponent
                      isStatic={true}
                      title={'category'}
                      src='/assets/images/your-favorite-brands.webp'
                      className='lg:object-cover lg:max-w-none bg-white'
                      alt='category'
                      useNextImage={false}
                    />
                  )}
                </div>
                <div className='w-full md:w-1/12 text-[45px] font-bold sm:flex text-center sm:items-center sm:justify-center sm:pl-[8px] pt-[10px] pb-[10px] sm:pt-[0px] sm:pb-[0px]'>
                  &amp;
                </div>
                <div className='w-full md:w-5/12 min-h-[100px] bg-[#ffffff] shadow flex items-center justify-center pt-[20px] pb-[20px]'>
                  <div className='uppercase border-[2px] inline-block text-sub-text font-semibold pl-[5px] pr-[5px] pt-[3px] leading-[29px] text-center border-[#000000]'>
                    {__pagesText.productListing.Banner.yourLogo}
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-1/2 text-gray-900 px-5'>
                <div className='font-normal text-title-text pb-[10px]'>
                  {banner[0].h1}
                </div>
                <div className='font-normal text-sub-text pb-[5px]'>
                  {banner[0].h2}
                </div>
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

export default BannerType1;
