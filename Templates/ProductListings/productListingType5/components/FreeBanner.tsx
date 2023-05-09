const FreeBanner = () => {
  return (
    <section className='mainsection mb-[15px]'>
      <div className='container mx-auto text-center'>
        <div className='text-white uppercase md:py-[20px] mb-[20px] bg-tertiary'>
          <div className='max-w-lg mx-auto tracking-wider leading-none'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/3 px-[12px] py-[12px] md:py-0 border-b border-b-white last:border-b-0 md:border-0 md:border-r md:border-r-white md:last:border-r-0'>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                  <img src='/assets/images/free-shipping-new.png' alt='' />
                  <span className='inline-block text-left'>
                    <span className='block font-extrabold'>Free Shipping</span>{' '}
                    <span>On All Orders</span>
                  </span>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-3 py-3 md:py-0 border-b border-b-white last:border-b-0 md:border-0 md:border-r md:border-r-white md:last:border-r-0'>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                  <img src='/assets/images/logo-free.png' alt='' />{' '}
                  <span className='inline-block text-left'>
                    <span className='block font-extrabold'>1st Logo Free</span>{' '}
                    <span>With Order</span>
                  </span>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-3 py-3 md:py-0 border-b border-b-white last:border-b-0 md:border-0 md:border-r md:border-r-white md:last:border-r-0'>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                  <img src='/assets/images/guarantee.png' alt='' />{' '}
                  <span className='inline-block text-left'>
                    <span className='block font-extrabold'>Satisfaction</span>{' '}
                    <span>Guaranteed</span>
                  </span>
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
