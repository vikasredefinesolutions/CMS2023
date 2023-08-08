import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import NxtImage from '@appComponents/reUsable/Image';
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
      )}
      <div className='container mx-auto'>
        <div className='px-[40px] py-[15px] bg-light-gray'>
          <div className='flex items-center'>
            {content[0] && (content[0].brandLogo || content[0].banner) ? (
              <NxtImage
                title={content[0].name}
                className='lg:object-cover lg:max-w-none bg-white'
                src={content[0].brandLogo || content[0].banner || null}
                alt={''}
                useNextImage={false}
              />
            ) : (
              <NxtImage
                isStatic={true}
                title={'category'}
                src='/images/your-favorite-brands.png'
                className='lg:object-cover lg:max-w-none bg-white'
                alt='category'
                useNextImage={false}
              />
            )}
          </div>
        </div>
      </div>
      {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
      {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </section>
  );
};

export default BannerType5;
