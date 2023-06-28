/* eslint-disable no-unused-vars */
// import LoginModal from 'appComponents/modals/LoginModal';
import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import ImageComponent from '@appComponents/reUsable/Image';
import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useState } from 'react';
import { _Banner } from '..';

const BannerType1: React.FC<{
  storeId: number;
  content: _Banner[] | null;
}> = ({ content }) => {
  const userId = useTypedSelector_v2((state) => state.user.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const [showModal, setShowModal] = useState<string | null>(null);

  if (!content || content.length === 0) return null;

  return (
    <>
      {storeCode == _Store.type1 && (
        <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
          <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
            <a
              onClick={() => (!userId ? setShowModal('login') : null)}
              className='inline-block items-center tracking-[1.2px] text-default-text font-medium'
            >
              <span className='align-middle'>
                {__pagesText.productListing.Banner.loginforExclusivePrice}
              </span>
              <span className='material-icons ml-[7px] align-middle'>
                {__pagesText.Headers.loginIcon}
              </span>
            </a>
          </div>
        </div>
      )}

      <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div className='items-center md:pl-[70px] md:pr-[70px] md:pt-[70px] md:pb-[70px] pl-[16px] pr-[16px] pt-[16px] pb-[16px] bg-light-gray'>
          <div className='flex flex-wrap items-center gap-y-[40px]'>
            <div className='w-full lg:w-1/2 sm:flex gap-[8px] h-full md:pl-[0px] pt-[2px] pb-[2px]'>
              <div className='w-full md:w-5/12 min-h-[100px] bg-[#ffffff] sm:bg-transparent shadow sm:shadow-none flex items-center justify-center  sm:pt-[0px] sm:pb-[0px] text-sub-text md:text-title-text sm:text-[45px] font-bold sm:flex sm:items-center sm:justify-center cursor-pointer'>
                {content[0] && (content[0].brandImage || content[0].banner) ? (
                  <Link
                    href={`${
                      content[0].customSEName
                        ? `/${content[0].customSEName}.html`
                        : `javascript:void(0);`
                    }`}
                  >
                    <a>
                      <ImageComponent
                        title={content[0].name}
                        className=''
                        src={content[0]?.brandImage || content[0].banner}
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
                    className=''
                    alt='category'
                    useNextImage={false}
                  />
                )}
              </div>
              <div className='w-full md:w-1/12 text-[45px] font-bold sm:flex text-center sm:items-center sm:justify-center sm:pl-[8px] pt-[20px] pb-[20px] sm:pt-[0px] sm:pb-[0px] leading-none'>
                &amp;
              </div>
              <div className='w-full md:w-5/12 min-h-[100px] bg-[#ffffff] shadow flex items-center justify-center pt-[20px] pb-[20px] h-[200px] md:h-auto'>
                <div className='uppercase border-[2px] inline-block text-sub-text font-semibold pl-[5px] pr-[5px] pt-[3px] leading-[29px] text-center border-[#000000]'>
                  {__pagesText.productListing.Banner.yourLogo}
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2 text-gray-900 px-5'>
              <div className='font-normal text-2xl-text pb-[10px]'>
                <h1> {content[0].h1}</h1>
              </div>
              <div className='font-normal text-sub-text pb-[5px]'>
                <h2> {content[0].h2}</h2>
              </div>
              <div
                className='text-default-text font-default-text text-color-default-text'
                dangerouslySetInnerHTML={{
                  __html: content[0].description,
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
};

export default BannerType1;
