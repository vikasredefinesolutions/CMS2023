import React from 'react';

const ProductFeatures: React.FC = () => {
  return (
    <section className='mainsection text-center text-sm leading-none text-primary'>
      <div className=''>
        <div className='mt-5 py-3 text-center'>
          <div className='block md:inline-block px-6 md:border-r border-slate-800 border-b border-b-black md:border-b-0 last:border-b-0 py-2.5 md:py-0'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons text-4xl leading-[15px]'>
                local_shipping
              </span>
              <div className='ml-2 text-left text-[13px] leading-[15px] tracking-[1px]'>
                <div className=''>FREE SHIPPING</div>
                <div>ORDERS OVER $4K</div>
              </div>
            </div>
          </div>
          <div className='block md:inline-block px-6 border-b border-b-black md:border-b-0 last:border-b-0 py-2.5 md:py-0'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons text-4xl leading-[15px]'>
                style
              </span>
              <div className='ml-2 text-left text-[13px] leading-[15px] tracking-[1px]'>
                <div className=''>1ST LOGO FREE</div>
                <div>UP TO 10,000 STITCHES</div>
              </div>
            </div>
          </div>
          <div className='block md:inline-block px-6 md:border-l border-slate-800 border-b border-b-black md:border-b-0 last:border-b-0 py-2.5 md:py-0'>
            <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
              <span className='material-icons text-4xl leading-[15px]'>
                verified
              </span>
              <div className='ml-2 text-left text-[13px] leading-[15px] tracking-[1px]'>
                <div className=''>FREE PROOF</div>
                <div>ON ALL ORDERS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
