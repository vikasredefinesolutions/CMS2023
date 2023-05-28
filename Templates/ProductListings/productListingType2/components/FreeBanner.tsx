import { __pagesText } from '@constants/pages.text';
const FreeBanner = () => {
  return (
    <section className='mainsection text-center text-sm leading-none mt-[20px]'>
      <div className='container mx-auto'>
        <div className='md:pt-[20px] md:pb-[20px] text-center bg-quaternary'>
          <div className='md:flex justify-center'>
            <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#ffffff]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons text-2xl-text leading-[15px] text-tertiary'>
                  {__pagesText.productListing.Banner.shippingIcon}
                </span>
                <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                  <div> {__pagesText.productListing.Banner.freeShipping}</div>
                  <div>{__pagesText.productListing.Banner.orderOver}</div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#ffffff]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons text-2xl-text leading-[15px] text-secondary'>
                  draw
                </span>
                <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                  <div> {__pagesText.productListing.Banner.firstLogoFree}</div>
                  <div>
                    {__pagesText.productListing.Banner.uptoTenThousandStiches}
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#ffffff]'>
              <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                <span className='material-icons text-2xl-text leading-[15px] text-primary'>
                  verified
                </span>
                <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                  <div> {__pagesText.productListing.Banner.freeProof}</div>
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
