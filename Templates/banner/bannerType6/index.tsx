import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { _Banner } from '..';

const BannerType5: React.FC<{
  storeId: number;
  content: _Banner[] | null;
}> = ({ content }) => {
  const userId = useTypedSelector_v2((state) => state.user.id);
  const [showModal, setShowModal] = useState<string | null>(null);

  if (!content || content.length === 0) return null;

  return (
    <section className='mainsection'>
      {!userId && (
        <div className='container pl-[15px] pr-[15px] mx-auto cursor-pointer'>
          <div className='text-center bg-tertiary pl-[10px] pr-[10px] pt-[4px] pb-[4px]'>
            <a
              onClick={() => setShowModal('login')}
              className='inline-block items-center tracking-[1.2px] text-default-text font-medium !text-white'
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
      )}
      <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div className='bg-white'>
          <div className='flex flex-wrap items-center gap-y-[40px]'>
            <div className='w-full lg:w-1/2 sm:flex'>
              <img src='https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/45/images/porsche-category-image.jpg' />
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='pl-[20px] sm:pl-[30px] lg:pl-[40px] pr-[20px] sm:pr-[30px] lg:pr-[40px]'>
                <div className='text-2xl-text pb-[10px]'>
                  {content[0].h1 ? content[0].h1 : content[0].name}
                </div>
                {content[0].h2 && (
                  <div className='text-sub-text pb-[5px]'>{content[0].h2}</div>
                )}
                {content[0].description && (
                  <div
                    className='text-default-text'
                    dangerouslySetInnerHTML={{
                      __html: content[0].description,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
      {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </section>
  );
};

export default BannerType5;
