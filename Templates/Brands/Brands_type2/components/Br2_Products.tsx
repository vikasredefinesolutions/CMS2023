import React from 'react';

const Br2_Products: React.FC = () => {
  return (
    <section className='mainsection featured_items text-center'>
      <div className='container mx-auto'>
        <div className='relative w-full'>
          <ul
            role='list'
            className='flex justify-center flex-wrap ml-[-15px] mr-[-15px]'
          >
            {['', '', '', ''].map(() => {
              return (
                <li className='w-full lg:w-3/12 relative pl-[15px] pr-[15px] flex'>
                  <div className='bg-[#ffffff] p-[20px] h-full'>
                    <div className='w-full overflow-hidden'>
                      <div className='w-auto h-auto m-auto max-h-[400px]'>
                        <img
                          alt=''
                          src="https://media.corporategear.com/resources/assets/library/Adidas-Men's-Creator-T-Shirt.jpg"
                          className='max-h-full'
                        />
                      </div>
                    </div>
                    <div className='pt-[10px]'>
                      <div className='px-[10px] text-[16px] h-[48px] overflow-hidden'>
                        <a className='inline-block' href='javascript:void(0);'>
                          Patagonia Men's Better Sweater Quarter Zip
                        </a>
                      </div>
                      <div className='mt-[10px] text-[14px] font-bold'>
                        + YOUR HEALTHCARE LOGO
                      </div>
                      <div className='mt-[10px] text-[14px]'>
                        <a
                          href='javascript:void(0);'
                          className='btn btn-primary'
                        >
                          DETAILS
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Br2_Products;
