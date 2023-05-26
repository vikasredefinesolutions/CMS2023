import NxtImage from '@appComponents/reUsable/Image';
import { _Brand } from '@definations/brand';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Cateogory,
  _Category,
  categories,
  categoriesWithBrands,
  colorImgTabArray,
} from './brandsByCategoriesType1.extras';

interface _Props {
  brands: _Brand[];
}

const BrandsByCategoriesType1: React.FC<_Props> = ({ brands }) => {
  const [activeTab, setActiveTab] = useState<_Category>('Featured');
  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);

  const activeTabColor = () => {
    switch (activeTab) {
      case 'Featured':
        return 'bg-secondary';
      case 'Outerwear':
        return 'bg-tertiary';
      case 'Golf':
        return 'bg-quaternary';
      case 'Sporting Goods':
        return 'bg-primary';
      case 'Accessories':
        return 'bg-default';
    }
  };
  return (
    <section className='relative pt-[30px] pb-[30px]'>
      <div className='overflow-x-hidden'>
        <div className='w-full'>
          <div className='mt-[12px] mb-[12px] text-center'>
            <span className='material-icons text-[40px] text-primary'>
              local_offer
            </span>
          </div>
          <div className='mb-[12px] text-large-text font-[600] mt-[12px] text-center'>
            <h2>Shop Your Favorite Brands by Category</h2>
          </div>
          <div className='flex flex-col md:flex-row md:-mr-px text-default-text'>
            <div className='w-full'>
              <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
                <li className=''>
                  <div
                    className={`inline-block ${activeTabColor()} h-[8px] w-[96px] mt-[8px] mb-[8px]`}
                  />
                </li>
              </ul>
              <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
                {Cateogory.map((category, index) => {
                  const activeClass =
                    activeTab === category
                      ? 'text-anchor hover:text-anchor-hover border-[#006CD1] border-b-[2px]'
                      : 'rounded-sm';

                  return (
                    <li key={index} className='mr-[2px] md:mr-0 font-[600]'>
                      <button
                        onClick={() => setActiveTab(category)}
                        className={
                          `tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor ` +
                          activeClass
                        }
                      >
                        {category}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className='ml-[16px] mr-[16px]'>
                <div className='w-full text-center mx-auto max-w-6xl pt-[30px]'>
                  <div className='panel-01 tab-content pb-[16px]'>
                    <div className='w-full'>
                      <div className='flex flex-wrap ml-[-12px] mr-[-12px] mt-[-12px] '>
                        {categoriesWithBrands.map((element, index) => {
                          if (element.category !== activeTab) {
                            return null;
                          }

                          return element.brandsIDs.map((item) => {
                            const brand = {
                              seName: '/',
                              imagePath: item.staticImagePath,
                              name: item.brandName,
                              id: item.id,
                            };

                            const brandWithSeName = brands?.find(
                              (brand) => item.seName === brand.seName,
                            );

                            if (brandWithSeName) {
                              brand.name = brandWithSeName.brandName;
                              brand.seName = brandWithSeName.seName;
                              brand.imagePath = !colorImgTabArray.includes(
                                activeTab,
                              )
                                ? brandWithSeName.brandColorImageUrl
                                : brandWithSeName.brandBlackColorImageUrl;
                            }

                            return (
                              <div
                                key={index}
                                className='w-full lg:w-1/4 pl-[12px] pr-[12px] mt-[12px] mb-[12px] flex'
                              >
                                <div
                                  className={`border border-gray-border ${activeTabColor()} hover:${activeTabColor()}-hover relative font-light w-full h-full flex items-center justify-center  mt-[50px] mb-[50px]`}
                                >
                                  <div className='flex justify-center items-center brand-listing-logo cursor-pointer'>
                                    <Link
                                      title={brand.name}
                                      href={`${brand.seName}.html`}
                                    >
                                      <a>
                                        <NxtImage
                                          className='w-full mx-auto'
                                          src={brand.imagePath}
                                          title={brand.name}
                                          alt={brand.name}
                                          useNextImage={false}
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-medium-text text-center mx-auto max-w-3xl pb-[30px] pt-[50px]'>
                  Jumpstart your creativity and shop by brand category. Browse
                  your favorite brands for corporate apparel and gear. From
                  company jackets, polos, custom longsleeve shirts to brand logo
                  t-shirts, you'll find it here. Or, customize tumblers, hats,
                  backpacks, coolers, and electronics on premium, popular
                  brands.
                </div>
              </div>

              <ul
                className={`${
                  currentPage === 'BRANDS' ? 'container mx-auto' : ''
                } w-full flex justify-center flex-wrap`}
              >
                {categories.map((cate, index) => {
                  return (
                    <li key={index} className='lg:w-1/5 w-full'>
                      <button
                        className={`${cate.classes} w-full`}
                        onClick={() => setActiveTab(cate.label)}
                      >
                        {cate.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsByCategoriesType1;
