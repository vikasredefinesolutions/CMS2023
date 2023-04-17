import Price from '@appComponents/Price';
import React from 'react';

interface _Props {}

const json = [
  {
    name: `Peter Millar Men's Solid Performance Polo - Self Collar`,
    src: 'https://media.corporategear.com/resources/assets/library/mockup-assets/images/gray-500-horizontal.png',
    price: 101.5,
  },
  {
    name: `Peter Millar Men's Solid Performance Polo - Self Collar`,
    src: 'https://media.corporategear.com/resources/assets/library/mockup-assets/images/gray-500-horizontal.png',
    price: 101.5,
  },
  {
    name: `Peter Millar Men's Solid Performance Polo - Self Collar`,
    src: 'https://media.corporategear.com/resources/assets/library/mockup-assets/images/gray-500-horizontal.png',
    price: 101.5,
  },
  {
    name: `Peter Millar Men's Solid Performance Polo - Self Collar`,
    src: 'https://media.corporategear.com/resources/assets/library/mockup-assets/images/gray-500-horizontal.png',
    price: 101.5,
  },
];

const SD_ProductsSlider: React.FC<_Props> = () => {
  return (
    <section className='relative pt-10 bg-light-gray'>
      <div className='container px-4 mx-auto'>
        <div className='flex flex-wrap -mx-3 -mt-[24px]'>
          {json.map((ele, index) => {
            return (
              <div
                key={index}
                className='w-full lg:w-1/4 px-3 md:w-1/3 mt-[24px]'
              >
                <div className='border border-gray-50 px-[24px] py-[24px] bg-white relative'>
                  <div className='flex justify-center'>
                    <a
                      className=''
                      href='/'
                      target=''
                      data-acsb-clickable='true'
                      data-acsb-navigable='true'
                      data-acsb-now-navigable='true'
                      role='button'
                      data-acsb-textual-ops='scroll'
                    >
                      <span
                        className='sr-only'
                        data-acsb-sr-only='true'
                        data-acsb-force-visible='true'
                        aria-hidden='false'
                        data-acsb-hidden='false'
                      >
                        Scroll Page{' '}
                      </span>
                      <img
                        className='w-full mx-auto'
                        src={ele.src}
                        alt='Text'
                      />
                    </a>
                  </div>
                  <div className='text-center w-full'>
                    <div className='text-medium-text p-[8px] text-anchor tetx-center'>
                      {ele.name}
                    </div>
                    <div className='mb-[8px] text-medium-text'>
                      <strong>
                        MSRP: <Price value={ele.price} />
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SD_ProductsSlider;
