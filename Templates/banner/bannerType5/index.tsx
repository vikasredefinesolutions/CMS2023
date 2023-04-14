import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { _BannerComponentProps } from '../Banner';

const BannerType5: React.FC<_BannerComponentProps> = ({
  banner,
  setShowModal,
  showModal,
  userId,
}) => {
  if (banner === null || banner.length < 1) {
    return <></>;
  } else {
    return (
      <section className='mainsection'>
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
        <div className='container mx-auto'>
          <div className='px-[40px] py-[15px] bg-light-gray'>
            <div className='flex items-center'>
              {banner[0] && (banner[0].brandLogo || banner[0].banner) ? (
                <NxtImage
                  title={banner[0].name}
                  className='lg:object-cover lg:max-w-none bg-white'
                  src={banner[0].brandLogo || banner[0].banner}
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
  }
};

export default BannerType5;
