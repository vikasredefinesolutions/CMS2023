import { __pagesText } from '@constants/pages.text';
const FreeBanner = () => {
  return (
    <section className='mainsection text-center text-sm leading-none mt-[20px]'>
      <div className='container mx-auto pl-[15px] pr-[15px]'>
        <div className='bg-secondary md:pt-[16px] md:pb-[16px] text-center'>
          <div className='md:flex justify-center pl-[15px] pr-[15px] md:pl-[0] md:pr-[0]'>
            <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-r-[#000000] border-b-[#fff]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons' style={{ fontSize: '38px' }}>
                  {__pagesText.productListing.Banner.shippingIcon}
                </span>
                <div className='ml-[8px] text-left text-small-text'>
                  <div className='pb-[2px]'>
                    {__pagesText.productListing.Banner.freeShipping}
                  </div>
                  <div>{__pagesText.productListing.Banner.orderOver}</div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-r-[#000000] border-b-[#fff]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons' style={{ fontSize: '38px' }}>
                  style
                </span>
                <div className='ml-[8px] text-left text-small-text'>
                  <div className='pb-[2px]'>
                    {__pagesText.productListing.Banner.firstLogoFree}
                  </div>
                  <div>
                    {__pagesText.productListing.Banner.uptoTenThousandStiches}
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-auto inline-block pl-[20px] pr-[20px] pt-[20px] pb-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#000000]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons' style={{ fontSize: '38px' }}>
                  verified
                </span>
                <div className='ml-[8px] text-left text-small-text'>
                  <div className='pb-[2px]'>
                    {__pagesText.productListing.Banner.freeProof}
                  </div>
                  <div>{__pagesText.productListing.Banner.onAllOrders}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeBanner;
