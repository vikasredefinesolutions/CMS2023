import { __pagesText } from '@constants/pages.text';
import { _Brand } from '@definations/brand';
import SubMenuItem from '@header/header_Type3/Components/Menu/Header_SubMenuItem';

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
            <a href={url} className='text-[12px] mr-[5px] underline'>
              {__pagesText.Headers.mobileViewAll}
            </a>
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
              className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] ${
                focus
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-primary'
              }`}
            >
              <span
                className='uppercase '
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
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
                className='absolute top-full left-[0] min-w-[250px] sm:text-[13px]'
              >
                <div className='relative border border-gray-border bg-white z-50 p-[15px]'>
                  <div className=''>
                    {/* {content && content.length > 0 && (
                    <div className='flex flex-wrap pb-[10px] border-b border-b-default mb-[10px]'>
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
                  )} */}
                    <ul className='w-full text-[13px]'>
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
                        if (index > (content.length / 3) * 2 + 1)
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
          </div>
        </>
      </Link>
    );
  }

  return <></>;
};

export default Brand;
