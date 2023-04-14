import React from 'react';

interface _props {}

const Br_Banner: React.FC<_props> = () => {
  return (
    <section className='relative overflow-hidden py-[40px] w-full bg-primary'>
      <div className='flex justify-center items-center flex-wrap'>
        <div className='container'>
          <div className='flex justify-center flex-wrap items-center sm:max-w-[700px] mx-auto'>
            <div className='text-[#ffffff] text-title-text leading-[26px] mb-[8px] lg:border-r lg:pr-[4px] pl-[4px] lg:max-w-[340px] w-full grow'>
              <h1>
                Better Brand Inventory, Easier Customization, and Superior
                Branded Results
              </h1>
            </div>
            <div className='text-[#ffffff] text-default-text lg:ml-[20px] leading-[21px] lg:max-w-[340px] ml-[8px] w-full'>
              Your top-name, brand-favorites, customized with your brand logo
              and text. Customization for every occasion: corporate apparel,
              promotional products, company clothing, and corporate gifts.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Br_Banner;
