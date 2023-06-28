import { __pagesText } from '@constants/pages.text';

const FreeBannerTemplate5 = () => {
  return (
    <div className='mainsection text-center text-sm leading-none mt-[10px]'>
      <div className='md:pt-[20px] md:pb-[20px] text-center bg-tertiary'>
        <div className='md:flex justify-center'>
          <div className='w-full md:w-auto inline-block p-[15px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons leading-[15px] text-tertiary'>
                {__pagesText.productListing.Banner.shippingIcon}
              </span>

              <div className='ml-[8px] text-left text-default-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                <div className='font-semibold'>FREE SHIPPING</div>
                <div>TO ONE LOCATION</div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-auto inline-block p-[15px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons leading-[15px] text-secondary'>
                {__pagesText.productListing.Banner.drawIcon}
              </span>
              <div className='ml-[8px] text-left text-default-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                <div className='font-semibold'>1ST LOGO FREE</div>
                <div>WITH ORDERS</div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-auto inline-block p-[15px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons leading-[15px] text-primary'>
                {__pagesText.productListing.Banner.verifyIcon}
              </span>
              <div className='ml-[8px] text-left text-default-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                <div className='font-semibold'>SATISFACTION</div>
                <div>GUARANTEED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBannerTemplate5;
