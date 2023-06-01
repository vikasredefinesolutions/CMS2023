import { __pagesText } from '@constants/pages.text';
import { _MenuCategoryWithBrand } from '@definations/header.type';
import SubMenuItem from '@header/header_Type5/Components/Menu/Header_SubMenuItem';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MobileSubMenu from './Header_MobileSubMenu';
interface _props {
  title: string;
  url: string;
  content: _MenuCategoryWithBrand[] | null;
  openTab: string;
  setOpenTab: (arg: string) => void;
}

const Header_Category: React.FC<_props> = ({
  content,
  title,
  url,
  openTab,
  setOpenTab,
}) => {
  const { view } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu } = useActions_v2();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [showtab, setShowTab] = useState<boolean>(false);
  useEffect(() => {
    if (openTab == title) {
      setShowTab(true);
      setShowAllItems(true);
    } else {
      setShowTab(false);
      setShowAllItems(false);
    }
  }, [openTab]);
  if (view === 'MOBILE') {
    return (
      <>
        <div className='relative flex border-b border-b-gray-border items-center justify-between'>
          {/* <div className='flex items-center justify-between py-2 pr-2'> */}
          <button
            title={title}
            type='button'
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            onClick={() => {
              setOpenTab(title);
              setShowAllItems((show) => !show);
            }}
          >
            <span
              className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
              x-html="open1 == true ? 'remove' : 'add'"
            >
              {showAllItems == true && showtab ? 'remove' : 'add'}
            </span>
            <div className=''>{title}</div>
          </button>
          <div
            className='text-[12px] mr-[5px] underline'
            onClick={() => toggleSideMenu('CLOSE')}
          >
            <Link href={`${url}.html?v=product-list`}>
              <a>{__pagesText.Headers.mobileViewAll}</a>
            </Link>
          </div>
        </div>
        {showAllItems && showtab && (
          <div className='text-[14px]' x-show='open1'>
            <div className='relative bg-light-gray'>
              <div className=''>
                <ul
                  // role='list'
                  // aria-labelledby='desktop-featured-heading-1'
                  className=''
                >
                  <MobileSubMenu
                    url={url}
                    view={view}
                    type={'CATEGORY'}
                    content={content}
                  />
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  if (view === 'DESKTOP') {
    return (
      <>
        <Link href={`${url}.html`} className='flex'>
          <div className='relative flex '>
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative text-[14px] xl:text-[17px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[600] pt-[8px] pb-[8px] pl-[15px] pr-[15px] text-[#ffffff] hover:primary-link
              `}
            >
              <span
                className='uppercase'
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
        </Link>

        {focus && (
          <div
            onMouseOver={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            //   x-transition:enter="transition ease-out duration-200"
            //   x-transition:enter-start="opacity-0"
            //   x-transition:enter-end="opacity-100"
            //   x-transition:leave="transition ease-in duration-150"
            //   x-transition:leave-start="opacity-100"
            //   x-transition:leave-end="opacity-0"
            className='absolute top-full left-[0px] right-[0px] sm:text-[13px] bg-gray-100 z-50'
          >
            <div className='relative max-w-[1400px] mx-auto p-[0px]'>
              <div className='pt-[13px] pb-[20px]'>
                <div>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'></div>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'>
                      <div className='text-[18px] font-[700] tracking-[1px] uppercase text-tertiary pb-[5px]'>
                        BY CATEGORY
                      </div>
                      <ul
                        role='list'
                        aria-labelledby='desktop-featured-heading-1'
                        className='w-full lg:w-1/2 text-[13px] pl-[0px] pr-[0px]'
                      >
                        {content &&
                          content[0] &&
                          content[0]?.categoryDetails &&
                          content[0]?.categoryDetails.map((item, index) => {
                            return (
                              <SubMenuItem
                                key={index}
                                view={view}
                                itemLabel={capitalizeFirstLetter(
                                  item.categoryName,
                                )}
                                itemUrl={`${item.seName}.html?v=product-list`}
                                type={'CATEGORY'}
                              />
                            );
                          })}
                      </ul>{' '}
                    </div>

                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'>
                      <div className='text-[18px] font-[700] tracking-[1px] uppercase text-tertiary pb-[5px]'>
                        BY BRAND
                      </div>
                      <ul className='w-full lg:w-1/2 text-[13px] pl-[0px] pr-[0px]'>
                        {content &&
                          content[0].brandDetails &&
                          content[0]?.brandDetails?.map((item, index) => {
                            if (index > 9) return <></>;
                            return (
                              <SubMenuItem
                                key={index}
                                view={view}
                                itemLabel={capitalizeFirstLetter(
                                  item.brandName,
                                )}
                                itemUrl={`Brand/${item.seName}/${item.brandId}/${url}.html`}
                                type={'CATEGORY'}
                              />
                            );
                          })}
                      </ul>{' '}
                    </div>

                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'></div>
                  </div>
                  <div className='flex flex-wrap mt-[10px]'>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'></div>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'>
                      <ul className='border-t border-t-default'>
                        <Link href={`${url}.html`}>
                          <li className='flex pt-[10px]'>
                            <a
                              className='inline-block text-[15px] text-tertiary hover:text-tertiary-hover font-[500] tracking-[1px] leading-[18px]'
                              title=''
                              href='product-listing.html'
                            >
                              All {title} Apparel &amp; Footwear
                            </a>
                          </li>
                        </Link>
                      </ul>
                    </div>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'>
                      <ul className='border-t border-t-default'>
                        <Link href={`${url}.html`}>
                          <li className='flex pt-[10px]'>
                            <a
                              className='inline-block text-[15px] text-tertiary hover:text-tertiary-hover font-[500] tracking-[1px] leading-[18px]'
                              title=''
                              href='product-listing.html'
                            >
                              All Brands
                            </a>
                          </li>
                        </Link>
                      </ul>
                    </div>
                    <div className='w-full lg:w-1/5 text-[15px] pl-[15px] pr-[15px]'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <></>;
};

export default Header_Category;
