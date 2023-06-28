import React from 'react';

const CustomeRequest_Type4: React.FC = () => {
  return (
    <>
      <section className='pt-[40px] mb-[30px]'>
        <div className='container mx-auto'>
          <div className='text-large-text text-center uppercase font-semibold text-[#00B3E3]'>
            Special Orders Request Form
          </div>
        </div>
      </section>

      <section className='container mx-auto'>
        <div className='bg-[#f5f5f5] pt-[40px] pb-[40px] max-w-5xl mx-auto'>
          <div className='w-full mx-auto px-[15px] lg:px-[40px]'>
            <div className='text-[16px] leading-[22px] pb-[40px]'>
              <p>
                If you are looking to place an order for something not on this
                store, please fill out the below form with as much detail as
                possible. You will be contacted by a Sales Rep, who will work
                with you to fulfill the order. You may also contact Kylie
                Bernard at{' '}
                <a
                  href='mailto:kbernard@parsonskellogg.com'
                  title='kbernard@parsonskellogg.com'
                  style={{ color: 'blue' }}
                >
                  kbernard@parsonskellogg.com
                </a>
              </p>
            </div>
            <div className='text-[16px] leading-[22px] pb-[40px]'>
              <p className=''>
                <a
                  href='https://parsonskellogg.espwebsite.com/'
                  title='www.parsonskellogg.espwebsite.com'
                  style={{ color: 'blue' }}
                >
                  Check out this link for promotional product ideas!
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomeRequest_Type4;
