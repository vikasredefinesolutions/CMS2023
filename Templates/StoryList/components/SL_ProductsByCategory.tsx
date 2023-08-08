import NxtImage from '@appComponents/reUsable/Image';
import { __StaticImg } from '@constants/assets';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  _StaticCategories,
  categoriesWithColor,
  shopProductsByCategory,
} from './SL_Extras';

const SL_ProductsByCategory: React.FC = () => {
  const [activeCategory, setActiveCateogory] =
    useState<_StaticCategories>('Men');

  const activeTabColor = () => {
    switch (activeCategory) {
      case 'Men':
        return 'quaternary';
      case 'Women':
        return 'tertiary';
      case 'Accessories':
        return 'secondary';
    }
  };

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
                  <a href='/' title=''>
                    <span className='btn bg-white hover:bg-tertiary-hover hover:text-anchor-hover text-anchor pl-[20px] pr-[20px] pt-[10px] pb-[10px] !uppercase text-default-text'>
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
                  {(['Men', 'Women', 'Accessories'] as _StaticCategories[]).map(
                    (cate) => {
                      return (
                        <li
                          className='mr-0.5 md:mr-0'
                          onClick={() => setActiveCateogory(cate)}
                        >
                          <button
                            className={`inline-block px-[10px] py-[10px] border-b-2 ${
                              activeCategory === cate
                                ? 'border-anchor'
                                : 'border-transparent'
                            }`}
                          >
                            {cate}
                          </button>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
            </div>
            <div className='xl:w-1/3 lg:w-1/2 flex flex-wrap justify-center items-center w-full'>
              <div className='w-full py-10 px-5 lg:px-10'>
                <div className=''>
                  <div className='panel-01 tab-content'>
                    <div className='w-full'>
                      <div className='flex flex-wrap -mx-[15px] mt-[-15px] mb-[-15px]'>
                        {shopProductsByCategory.map((category) => {
                          if (category.title === activeCategory) {
                            return category.categories.map((subCategories) => {
                              return (
                                <div className='w-full sm:w-1/2 lg:w-1/2 px-[15px] mt-[15px] mb-[15px]'>
                                  <div
                                    className={`border border-gray-50 bg-${activeTabColor()} relative h-full`}
                                  >
                                    <div className='flex items-center py-10 px-4'>
                                      <div className='flex flex-wrap'>
                                        <Link
                                          href={subCategories.slug}
                                          target=''
                                          title=''
                                        >
                                          <a>
                                            {' '}
                                            <span className='font-bold text-black text-left text-sm lg:p-6 flex flex-wrap'>
                                              {subCategories.name}
                                            </span>{' '}
                                            <NxtImage
                                              alt=''
                                              className='w-10 absolute right-3 top-5'
                                              //   inpname="image2"
                                              isStatic={true}
                                              src={__StaticImg.labelIcon}
                                              title=''
                                            />
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            });
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className='lg:w-10 lg:absolute lg:left-0 lg:top-0 lg:h-full w-full'>
              {categoriesWithColor.map((cate) => {
                return (
                  <li
                    onClick={() => setActiveCateogory(cate.title)}
                    className={`lg:h-1/3 lg:w-10 btn-${cate.color} flex flex-wrap items-center justify-center w-full p-3`}
                  >
                    <span className='lg:-rotate-90'>
                      <button>{cate.title}</button>
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
