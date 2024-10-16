import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { SIMPLI_SAFE_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { _globalStore } from 'store.global';
import { _Banner } from '..';

let mediaBaseUrl = _globalStore.blobUrl;

const BannerType3: React.FC<{
  storeId: number;
  content: _Banner[] | null;
}> = ({ content }) => {
  const store = useTypedSelector_v2((state) => state.store);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const [showModal, setShowModal] = useState<string | null>(null);

  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  if (!content || content.length === 0) return null;

  return (
    <>
      {!userId ||
        (!(store.code === SIMPLI_SAFE_CODE) && (
          <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
            <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
              <a
                onClick={() => setShowModal('login')}
                className='inline-block items-center tracking-[1.2px] text-default-text font-medium'
              >
                <span className='align-middle'>
                  {__pagesText.productListing.Banner.loginforExclusivePrice}
                </span>
                <span className='material-icons align-middle'>
                  {__pagesText.Headers.loginIcon}
                </span>
              </a>
            </div>
          </div>
        ))}
      {!(store.code == SIMPLI_SAFE_CODE) ? (
        <div className='container pl-[15px] pr-[15px] mx-auto'>
          <div
            className='items-center sm:pl-[40px] sm:pr-[40px] sm:pt-[40px] sm:pb-[40px] md:pl-[70px] md:pr-[70px] md:pt-[70px] md:pb-[70px] pl-[0px] pr-[0px] pt-[16px] pb-[16px]'
            style={{
              backgroundImage: content[0]?.bannerImagePath
                ? `url(${mediaBaseUrl}${content[0]?.bannerImagePath} no-repeat center center)`
                : 'url()',
            }}
          >
            <div className='flex flex-wrap items-center gap-y-[40px]'>
              <div className='w-full text-[#000000] md:pl-[0px] md:pr-[0px] pl-[16px] pr-[16px]'>
                <div className='text-2xl-text pb-[10px]'>{content[0].h1}</div>
                <div className='text-sub-text pb-[5px] uppercase text-center'>
                  {content[0].h2 || content[0].name}
                </div>

                <div
                  className='text-medium-text'
                  dangerouslySetInnerHTML={{
                    __html: content[0].description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
      {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </>
  );
};

export default BannerType3;
