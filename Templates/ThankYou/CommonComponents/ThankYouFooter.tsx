import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';

const ThankYouFooter = () => {
  return (
    <>
      <div className='container mx-auto pr-[15px] pb-[15px] pt-[15px] pl-[15px]'>
        <div className='w-full text-center'>
          <div className='text-xl font-semibold mb-3'>
            {__pagesText.ThankYouPage.ThankYouFooter.heading}
          </div>
          <div className='text-base mb-3'>
            {__pagesText.ThankYouPage.ThankYouFooter.heading}
          </div>
          <div className='flex items-center justify-center'>
            <div className='p-4 m-4'>
              <NxtImage src={''} className='' alt={''} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouFooter;
