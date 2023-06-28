import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { _globalStore } from 'store.global';
import { _Banner } from '..';

let mediaBaseUrl = _globalStore.blobUrl;

const BannerType4: React.FC<{
  storeId: number;
  content: _Banner[] | null;
}> = ({ content }) => {
  const store = useTypedSelector_v2((state) => state.store);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const [showModal, setShowModal] = useState<string | null>(null);

  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;

  if (!content || content.length === 0) return null;

  return (
    <>
      {storeCode == _Store.type1 && (
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
        </>
      )}
      <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div
          className={`${
            content[0] && content[0].brandImage
              ? 'items-center sm:pl-[20px] sm:pr-[20px] sm:pt-[20px] sm:pb-[20px] md:pl-[20px] md:pr-[0px] md:pt-[20px] md:pb-[15px] pl-[0px] pr-[0px] pt-[16px] pb-[16px] bg-light-gray'
              : 'items-center sm:pl-[40px] sm:pr-[40px] sm:pt-[40px] sm:pb-[40px] md:pl-[40px] md:pr-[0px] md:pt-[35px] md:pb-[40px] pl-[0px] pr-[0px] pt-[16px] pb-[16px] bg-light-gray'
          }`}
        >
          <div className='flex flex-wrap items-center gap-y-[40px]'>
            <div className='w-full text-[#000000] md:pl-[0px] md:pr-[0px] pl-[16px] pr-[16px]'>
              {content[0] && (content[0].brandImage || content[0].banner) ? (
                <div className='text-2xl-text pb-[10px]'>
                  <img
                    src={`${mediaBaseUrl}${content[0].brandImage}`}
                    className='max-h-[100px]'
                  />
                </div>
              ) : (
                <div className='text-2xl-text pb-[10px]'>{content[0].name}</div>
              )}
              {content[0].h2 && (
                <div className='text-sub-text pb-[5px]'>{content[0].h2}</div>
              )}
              {content[0].description && (
                <div
                  className='text-default-text font-default-text text-color-default-text'
                  dangerouslySetInnerHTML={{
                    __html: content[0].description,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
      {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </>
  );
};

export default BannerType4;
