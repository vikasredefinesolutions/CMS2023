import NxtImage from '@appComponents/reUsable/Image';
import { _Brand } from '@definations/brand';
import Link from 'next/link';
import React, { useState } from 'react';

interface _Props {
  brands: _Brand[];
}

type _Category =
  | 'Featured'
  | 'Outerwear'
  | 'Golf'
  | 'Sporting Goods'
  | 'Accessories';

const categories: { label: _Category; classes: string }[] = [
  {
    label: 'Featured',
    classes:
      'bg-secondary hover:text-[#000000]  block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600]',
  },
  {
    label: 'Outerwear',
    classes:
      'bg-tertiary hover:bg-tertiary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] hover:text-[#000000]',
  },
  {
    label: 'Golf',
    classes:
      'bg-quaternary hover:bg-quaternary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] hover:text-[#000000]',
  },
  {
    label: 'Sporting Goods',
    classes:
      'bg-primary hover:bg-primary-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
  {
    label: 'Accessories',
    classes:
      'bg-default hover:bg-default-hover block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff]',
  },
];

const cateogory: _Category[] = [
  'Featured',
  'Outerwear',
  'Golf',
  'Sporting Goods',
  'Accessories',
];

const categoriesWithBrands = [
  {
    category: 'Featured',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 49,
        brandName: 'Patagonia',
      },
      {
        staticImagePath: '',
        id: 9,
        brandName: 'Nike',
      },
      {
        staticImagePath: '',
        id: 28,
        brandName: 'Peter Millar',
      },
      {
        staticImagePath: '',
        id: 10,
        brandName: 'YETI',
      },
      {
        staticImagePath: '',
        id: 37,
        brandName: 'The North Face',
      },
      {
        staticImagePath: '',
        id: 5,
        brandName: 'Helly Hansen',
      },
      {
        staticImagePath: '',
        id: 7,
        brandName: 'Southern Tide',
      },
      {
        staticImagePath: '',
        id: 6,
        brandName: 'johnnie-O',
      },
    ],
  },
  {
    category: 'Outerwear',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 21,
        brandName: 'STIO',
      },
      {
        staticImagePath: '',
        id: 39,
        brandName: 'Carhartt',
      },
      {
        staticImagePath: '',
        id: 45,
        brandName: 'Marine Layer',
      },
      {
        staticImagePath: '',
        id: 12,
        brandName: 'Columbia',
      },
      {
        staticImagePath: '',
        id: 36,
        brandName: 'Marmot',
      },
      {
        staticImagePath: '',
        id: 59,
        brandName: 'Charles River Apparel',
      },
      {
        staticImagePath: '',
        id: 61,
        brandName: 'Berne Apparel',
      },
      {
        staticImagePath: '',
        id: 15,
        brandName: 'Eddie Bauer',
      },
    ],
  },
  {
    category: 'Golf',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 2,
        brandName: 'Faherty Brand',
      },
      {
        staticImagePath: '',
        id: 13,
        brandName: 'Titleist',
      },
      {
        staticImagePath: '',
        id: 44,
        brandName: 'Galvin Green',
      },
      {
        staticImagePath: '',
        id: 32,
        brandName: 'Callaway Golf',
      },
      {
        staticImagePath: '',
        id: 40,
        brandName: 'Fairway & Greene',
      },
      {
        staticImagePath: '',
        id: 33,
        brandName: 'TaylorMade',
      },
      {
        staticImagePath: '',
        id: 35,
        brandName: 'Zero Restriction',
      },
      {
        staticImagePath: '',
        id: 20,
        brandName: 'Travis Mathew',
      },
    ],
  },
  {
    category: 'Sporting Goods',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 4,
        brandName: 'adidas',
      },
      {
        staticImagePath: '',
        id: 8,
        brandName: 'Under Armour',
      },
      {
        staticImagePath: '',
        id: 14,
        brandName: 'Spyder',
      },
      {
        staticImagePath: '',
        id: 30,
        brandName: 'BAUER',
      },
      {
        staticImagePath: '',
        id: 66,
        brandName: 'Lacoste',
      },
      {
        staticImagePath: '',
        id: 57,
        brandName: 'SPORT TEK',
      },
      {
        staticImagePath: '',
        id: 27,
        brandName: 'New Era',
      },
      {
        staticImagePath: '',
        id: 34,
        brandName: 'PUMA',
      },
    ],
  },
  {
    category: 'Accessories',
    brandsIDs: [
      {
        staticImagePath: '',
        id: 38,
        brandName: 'Matouk',
      },
      {
        staticImagePath: '',
        id: 64,
        brandName: 'KNACK',
      },
      {
        staticImagePath: '',
        id: 26,
        brandName: 'Tile',
      },
      {
        staticImagePath: '',
        id: 67,
        brandName: 'Ember',
      },
      {
        staticImagePath: '',
        id: 43,
        brandName: 'Moleskine',
      },
      {
        staticImagePath: '',
        id: 63,
        brandName: 'Swell',
      },
      {
        staticImagePath: '',
        id: 1,
        brandName: 'Cross',
      },
      {
        staticImagePath: '',
        id: 62,
        brandName: 'Bose',
      },
    ],
  },
];

const BrandsByCategoriesType1: React.FC<_Props> = ({ brands }) => {
  const [activeTab, setActiveTab] = useState<_Category>('Featured');

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
    <section className='relative pt-[40px] pb-[40px]'>
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
                              (brand) => item.id === brand.id,
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
                                      <a>
                                        <NxtImage
                                          className='w-full mx-auto'
                                          src={brand.imagePath}
                                          alt={brand.name}
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
                <div className='mb-[12px] text-medium-text text-center mx-auto max-w-3xl pb-[40px]'>
                  Jumpstart your creativity and shop by brand category. Browse
                  your favorite brands for corporate apparel and gear. From
                  company jackets, polos, custom longsleeve shirts to brand logo
                  t-shirts, you'll find it here. Or, customize tumblers, hats,
                  backpacks, coolers, and electronics on premium, popular
                  brands.
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

export default BrandsByCategoriesType1;
