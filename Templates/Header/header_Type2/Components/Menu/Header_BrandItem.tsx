import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _Brand } from '@definations/brand';
import BrandImage from '@header/header_Type2/Components/Menu/Header_BrandImage';
import SubMenuItem from '@header/header_Type2/Components/Menu/Header_SubMenuItem';

import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useState } from 'react';

interface _props {
  url: string;
  title: string;
  content: _Brand[] | null;
}

const Brand: React.FC<_props> = ({ url, title, content }) => {
  const { toggleSideMenu } = useActions_v2();

  // -------------------------------------------------------------------
  const { view } = useTypedSelector_v2((state) => state.store);

  // -------------------------------------------------------------------
  const [focus, setFocus] = useState<boolean>(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  if (view === 'MOBILE') {
    return (
      <>
        <div className='relative flex border-b border-b-gray-border items-center justify-between'>
          {/* <div className='flex items-center justify-between py-2 pr-2'> */}
          <button
            title='Brands'
            type='button'
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
          >
            <span
              className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
              onClick={() => setShowAllItems((show) => !show)}
              x-html="open == true ? 'remove' : 'add'"
            >
              {showAllItems == true ? 'remove' : 'add'}
            </span>
            <span className=''>{title}</span>
          </button>
          <div className='' onClick={() => toggleSideMenu('CLOSE')}>
            <Link href={url} passHref>
              <a className='text-[12px] mr-[5px] underline'>
                {__pagesText.Headers.mobileViewAll}
              </a>
            </Link>
            {/* </div> */}
          </div>
        </div>
        {showAllItems && (
          <div className='text-[14px]' x-show='open' x-cloak>
            <div className='relative bg-light-gray'>
              <div className=''>
                <ul
                  // role='list'
                  // aria-labelledby='desktop-featured-heading-1'
                  className=''
                >
                  {content?.map((brand) => {
                    return (
                      <SubMenuItem
                        view={view}
                        key={brand.id}
                        itemLabel={capitalizeFirstLetter(brand.brandName)}
                        itemUrl={
                          brand.brandCollectionUrl
                            ? `${brand.brandCollectionUrl}.html`
                            : `${brand.seName}.html?v=product-list`
                        }
                        type={'BRAND'}
                      />
                    );
                  })}
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
      <Link href={url}>
        <>
          <div className='relative '>
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative text-[12px] xl:text-[14px] xl:ml-[21px] xl:mr-[20px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] border-0 pt-[10px] pb-[10px] border-transparent hover:border-primary text-quaternary before:absolute before:bottom-[0px] before:content-[''] before:border-y-solid before:border-t-transparent before:border-x-transparent before:h-0 before:w-0 before:border-b-gray-100 before:border-[10px] before:left-1/2 before:-translate-x-1/2 before:inline-block ${
                focus ? '' : 'before:hidden'
              }`}
            >
              <span
                className='uppercase text-quaternary'
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
          {focus && (
            <div
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              //     x-transition:enter="transition ease-out duration-200"
              //     x-transition:enter-start="opacity-0"
              //     x-transition:enter-end="opacity-100"
              //     x-transition:leave="transition ease-in duration-150"
              //     x-transition:leave-start="opacity-100"
              //     x-transition:leave-end="opacity-0"
              className='absolute top-full  w-screen max-w-[700px] sm:text-[13px]'
            >
              <div className='relative bg-gray-100 z-50 p-[15px]'>
                <div className=''>
                  {content && content.length > 0 && (
                    <div className='flex flex-wrap pb-[10px] border-b border-b-default mb-[10px] '>
                      {content
                        ?.filter(
                          (brand) =>
                            brand.brandColorImageUrl &&
                            __pagesConstant._header.brandImage.includes(
                              brand.seName,
                            ),
                        )
                        .sort(function (a, b) {
                          return (
                            __pagesConstant._header.brandImage.indexOf(
                              a.seName,
                            ) -
                            __pagesConstant._header.brandImage.indexOf(b.seName)
                          );
                        })
                        ?.map((brand) => (
                          <BrandImage
                            key={brand.id}
                            url={
                              brand.brandCollectionUrl
                                ? `${brand.brandCollectionUrl}.html`
                                : `${brand.seName}.html?v=product-list`
                            }
                            alt={capitalizeFirstLetter(brand.brandName)}
                            src={brand.brandColorImageUrl}
                          />
                        ))}
                    </div>
                  )}
                  <div className=''>
                    <div className='flex flex-wrap'>
                      <ul className='w-full lg:w-1/2 text-[13px] pl-[20px] pr-[20px'>
                        {content?.map((brand, index) => {
                          if (index > content.length / 3 + 1) return <></>;
                          return (
                            <SubMenuItem
                              view={view}
                              key={brand.id}
                              itemLabel={capitalizeFirstLetter(brand.brandName)}
                              itemUrl={
                                brand.brandCollectionUrl
                                  ? `${brand.brandCollectionUrl}.html`
                                  : `${brand.seName}.html?v=product-list`
                              }
                              type={'BRAND'}
                            />
                          );
                        })}
                      </ul>
                      <ul className='w-full lg:w-1/3 text-[13px] pl-[20px] pr-[20px]'>
                        {content?.map((brand, index) => {
                          if (
                            index >= content.length / 3 + 1 &&
                            index <= (content.length / 3) * 2 + 1
                          )
                            return (
                              <SubMenuItem
                                view={view}
                                key={brand.id}
                                itemLabel={capitalizeFirstLetter(
                                  brand.brandName,
                                )}
                                itemUrl={
                                  brand.brandCollectionUrl
                                    ? `${brand.brandCollectionUrl}.html`
                                    : `${brand.seName}.html?v=product-list`
                                }
                                type={'BRAND'}
                              />
                            );
                        })}
                      </ul>
                      <ul className='w-full lg:w-1/3 text-[13px] pl-[20px] pr-[20px]'>
                        {content?.map((brand, index) => {
                          if (index > (content.length / 3) * 2 + 1)
                            return (
                              <SubMenuItem
                                view={view}
                                key={brand.id}
                                itemLabel={capitalizeFirstLetter(
                                  brand.brandName,
                                )}
                                itemUrl={
                                  brand.brandCollectionUrl
                                    ? `${brand.brandCollectionUrl}.html`
                                    : `${brand.seName}.html?v=product-list`
                                }
                                type={'BRAND'}
                              />
                            );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </Link>
    );
  }

  return <></>;
};

export default Brand;
