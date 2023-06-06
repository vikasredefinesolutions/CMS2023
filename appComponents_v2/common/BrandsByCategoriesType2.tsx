import NxtImage from '@appComponents/reUsable/Image';
import { _Brand } from '@definations/brand';
import Link from 'next/link';
import React, { useState } from 'react';

interface _Props {
  brands: _Brand[];
}

type _Category = 'Featured' | 'Apparel' | 'Accessories';

const categories: { label: _Category; classes: string }[] = [
  {
    label: 'Featured',
    classes:
      'bg-primary hover:text-[#000000]  block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600]',
  },

  {
    label: 'Apparel',
    classes:
      'bg-tertiary hover:bg-primary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
  {
    label: 'Accessories',
    classes:
      'bg-secondary hover:bg-default-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
];

const cateogory: _Category[] = ['Featured', 'Apparel', 'Accessories'];

const categoriesWithBrands: {
  category: _Category;
  brandsIDs: {
    staticImagePath: string;
    id: number;
    brandName: string;
    seName: string;
  }[];
}[] = [
  {
    category: 'Featured',
    brandsIDs: [
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_515.png',
        id: 49,
        brandName: 'Patagonia',
        seName: 'patagonia',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_20.png',
        id: 10,
        brandName: 'YETI',
        seName: 'yeti',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_11.png',
        id: 9,
        brandName: 'Nike',
        seName: 'nike',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_2.png',
        id: 28,
        brandName: 'Peter Millar',
        seName: 'peter-millar',
      },
    ],
  },
  {
    category: 'Apparel',
    brandsIDs: [
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_181.png',
        id: 21,
        brandName: 'STIO',
        seName: 'stio',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_180.png',
        id: 45,
        brandName: 'Marine Layer',
        seName: 'marine-layer',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_29.png',
        id: 15,
        brandName: 'Eddie Bauer',
        seName: 'eddie-bauer',
      },
      {
        staticImagePath: '/assets/images/PKhealth/adidas.png',
        id: 4,
        brandName: 'adidas',
        seName: 'adidas',
      },
    ],
  },
  {
    category: 'Accessories',
    brandsIDs: [
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/black_brand_24.png',
        id: 533,
        brandName: 'Ogio',
        seName: 'ogio',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_37.png',
        id: 63,
        brandName: 'Swell',
        seName: 'swell',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_38.png',
        id: 537,
        brandName: 'Camelbak',
        seName: 'camelbak',
      },
      {
        staticImagePath: 'https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_65.png',
        id: 26,
        brandName: 'Tile',
        seName: 'tile',
      },
    ],
  },
];

const BrandsByCategoriesType2: React.FC<_Props> = ({ brands }) => {
  const [activeTab, setActiveTab] = useState<_Category>('Featured');
  const activeTabColor = () => {
    switch (activeTab) {
      case 'Featured':
        return 'bg-primary';
      case 'Apparel':
        return 'bg-tertiary';
      case 'Accessories':
        return 'bg-secondary';
    }
  };

  return (
    <section className='relative pt-[40px] pb-[40px]'>
      <div className='overflow-x-hidden'>
        <div className='w-full'>
          <div className="mt-3 mb-3  text-center">
            <span className="material-icons text-[40px] text-[#003a70]">local_offer</span>
        </div>
        <div className="mb-3 text-center">
          <a title="" target="" href="javascript:void(0);"
            className="btn btn-primary bg-gray-100 uppercase py-2 px-10 text-sm text-[#006CD1]" data-nofollow="N">
            Shop HEALTHCARE BRANDS BY CATEGORY
          </a>
        </div>
          <div className='mb-[12px] text-large-text font-[600] mt-[12px] text-center'>
            <h2>Level-Up with Custom Healthcare Apparel and Accessories</h2>
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
                {cateogory.map((category, index) => {
                  const activeClass =
                    activeTab === category
                      ? 'text-anchor border-b-[2px]'
                      : 'rounded-sm';

                  return (
                    <li key={index} className='mr-[2px] md:mr-0 font-[600]'>
                      <button
                        onClick={() => setActiveTab(category)}
                        className={
                          `tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor-hover focus:outline-none font-[600] border-anchor` +
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
                <div className='w-full text-center mx-auto max-w-6xl pt-[40px] pb-[40px]'>
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
                              brand.imagePath =
                                brandWithSeName.brandColorImageUrl;
                            }

                            return (
                              <div
                                key={index}
                                className='w-full lg:w-1/4 pl-[12px] pr-[12px] mt-[12px] mb-[12px] flex'
                              >
                                <div
                                  className={`border border-gray-border ${activeTabColor()} hover:${activeTabColor()}-hover relative font-light w-full h-full flex items-center justify-center`}
                                >
                                  <div className='flex justify-center items-center brand-listing-logo'>
                                    <Link
                                      title={brand.name}
                                      href={brand.seName}
                                    >
                                      <NxtImage
                                        className='w-full mx-auto'
                                        src={brand.imagePath}
                                        alt={brand.name}
                                      />
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
                <div className='mb-[12px] text-medium-text text-center mx-auto max-w-3xl pb-[40px]'>
                  We`ve built close relationships with some of the best-known
                  brands in the world and we`ve introduced them to our customers
                  in the healthcare industry..
                </div>
              </div>

              <ul className='w-full flex justify-center flex-wrap mt-[32px]'>
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

export default BrandsByCategoriesType2;
