import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { _Banner } from '..';

const BannerType2: React.FC<{
  storeId: number;
  content: _Banner[] | null;
}> = ({ content }) => {
  const userId = useTypedSelector_v2((state) => state.user.id);
  const [showModal, setShowModal] = useState<string | null>(null);

  if (!content || content.length === 0) return null;

  return (
    <>
      {!userId && (
        <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
          <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
            <div
              onClick={() => setShowModal('login')}
              className='inline-block items-center tracking-[1.2px] text-default-text font-medium'
            >
              <span className='align-middle'>
                {__pagesText.productListing.Banner.loginforExclusivePrice}
              </span>
              <span className='material-icons align-middle'>
                {__pagesText.Headers.loginIcon}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div className='items-center sm:pl-[40px] sm:pr-[40px] sm:pt-[40px] sm:pb-[40px] md:pl-[70px] md:pr-[70px] md:pt-[70px] md:pb-[70px] pl-[0px] pr-[0px] pt-[16px] pb-[16px] bg-light-gray'>
          <div className='flex flex-wrap items-center gap-y-[40px]'>
            <div className='w-full text-[#000000] md:pl-[0px] md:pr-[0px] pl-[16px] pr-[16px]'>
              <div className='text-2xl-text pb-[10px]'>{content[0].h1}</div>
              <div className='text-sub-text pb-[5px]'>{content[0].h2}</div>
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

export default BannerType2;
