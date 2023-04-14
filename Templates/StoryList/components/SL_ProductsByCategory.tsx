import { __StaticImg } from '@constants/assets';
import { paths } from '@constants/paths.constant';
import React from 'react';

const SL_ProductsByCategory: React.FC = () => {
  return (
    <section
      className='bg-cover relative py-20 h-full'
      style={{
        backgroundImage: `url(${__StaticImg.petternBanner});`,
      }}
    >
      <div className='container mx-auto'>
        <div className='flex flex-wrap bg-white relative'>
          <div className='w-full flex justify-center items-center flex-wrap'>
            <div className='xl:w-2/3 lg:w-1/2 flex flex-wrap justify-center items-center w-full'>
              <div className='bg-white w-full lg:p-20 mx-auto py-10 px-5 lg:px-20 lg:py-20'>
                <div className='mb-[10px]'>
                  <a href='javascript:void(0);' title=''>
                    <span className='btn btn-primary pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
                      Shop Products by category
                    </span>
                  </a>
                </div>
                <div className='mb-[10px] text-title-text'>
                  Company Apparel, Gifts &amp; Co-branded Accessories
                </div>
                <ul className='w-full flex max-w-4xl flex-wrap'>
                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
                </ul>
                <ul className='w-full flex max-w-4xl flex-wrap'>
                  {['', '', ''].map(() => {
                    return (
                      <li className='mr-0.5 md:mr-0'>
                        <a
                        //   :className="activeTab === 011 ? 'border-b-anchor' : 'border-b-transparent'"
                        //   className="inline-block px-[10px] py-[10px] border-b-2"
                        //   href="javascript:void(0);" x-on:click="activeTab = 011"
                        >
                          Men
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className='xl:w-1/3 lg:w-1/2 flex flex-wrap justify-center items-center w-full'>
              <div className='w-full py-10 px-5 lg:px-10'>
                <div className=''>
                  <div
                    className='panel-01 tab-content'
                    x-show='activeTab === 011'
                    // style='display: none;'
                  >
                    <div className='w-full'>
                      <div className='flex flex-wrap -mx-[15px] mt-[-15px] mb-[-15px]'>
                        <div className='w-full sm:w-1/2 lg:w-1/2 px-[15px] mt-[15px] mb-[15px]'>
                          <div className='border border-gray-50 bg-quaternary relative h-full'>
                            <div className='flex items-center py-10 px-4'>
                              <div className='flex flex-wrap'>
                                <a href={paths.BRAND} target='' title=''>
                                  <span className='font-bold text-black text-left text-sm lg:p-6 flex flex-wrap'>
                                    All Men`s Clothing
                                  </span>{' '}
                                  <img
                                    alt=''
                                    className='w-10 absolute right-3 top-5'
                                    //   inpname="image2"
                                    src={__StaticImg.labelIcon}
                                    title=''
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className='lg:w-10 lg:absolute lg:left-0 lg:top-0 lg:h-full w-full'>
              {['', '', ''].map(() => {
                return (
                  <li className='lg:h-1/3 lg:w-10 btn-quaternary flex flex-wrap items-center justify-center w-full p-3'>
                    <span className='lg:-rotate-90'>
                      <a href='javascript:void(0);'>Men</a>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SL_ProductsByCategory;
