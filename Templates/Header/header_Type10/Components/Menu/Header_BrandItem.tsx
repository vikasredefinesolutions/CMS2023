import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { _Brand } from '@definations/brand';
import BrandImage from '@header/header_Type1/Components/Menu/Header_BrandImage';
import SubMenuItem from '@header/header_Type1/Components/Menu/Header_SubMenuItem';

import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

interface _props {
  url: string;
  title: string;
  content: _Brand[] | null;
  openTab: string;
  setOpenTab: (arg: string) => void;
}

const Brand: React.FC<_props> = ({
  url,
  title,
  content,
  openTab,
  setOpenTab,
}) => {
  const { toggleSideMenu } = useActions_v2();

  // -------------------------------------------------------------------
  const { view } = useTypedSelector_v2((state) => state.store);

  // -------------------------------------------------------------------
  const [focus, setFocus] = useState<boolean>(false);
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
            type='button'
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            title={title}
          >
            <span
              className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
              onClick={() => {
                setOpenTab(title);
                setShowAllItems((show) => !show);
              }}
              x-html="open == true ? 'remove' : 'add'"
            >
              {showAllItems == true && showtab ? 'remove' : 'add'}
            </span>
            <span className=''>{title}</span>
          </button>
          <div className='' onClick={() => toggleSideMenu('CLOSE')}>
            <Link href={`/${url}.html`} passHref>
              <a className='text-[12px] mr-[5px] underline'>
                {__pagesText.Headers.mobileViewAll}
              </a>
            </Link>
            {/* </div> */}
          </div>
        </div>
        {showAllItems && showtab && (
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
                      <Fragment key={brand.id}>
                        <SubMenuItem
                          view={view}
                          // itemLabel={capitalizeFirstLetter(brand.brandName)}
                          itemLabel={capitalizeFirstLetter(brand.brandName)}
                          itemUrl={
                            brand.brandCollectionUrl
                              ? `${brand.brandCollectionUrl}.html`
                              : `${brand.seName}.html`
                          }
                          type={'BRAND'}
                        />{' '}
                      </Fragment>
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
      <>
        <Link href={`${url}.html`}>
          <div className='relative flex'>
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative text-[12px] xl:text-[14px] mt-[5px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[1px] z-10 flex items-center font-[600] border-0 border-b-2 pt-[10px] pb-[10px] border-transparent hover:border-primary text-primary`}
            >
              <span
                className='uppercase text-primary'
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
            //     x-transition:enter="transition ease-out duration-200"
            //     x-transition:enter-start="opacity-0"
            //     x-transition:enter-end="opacity-100"
            //     x-transition:leave="transition ease-in duration-150"
            //     x-transition:leave-start="opacity-100"
            //     x-transition:leave-end="opacity-0"
            className='absolute top-full left-[0px] w-screen max-w-[600px] sm:text-[14px] '
          >
            <div className='relative bg-gray-100 z-50'>
              <div className=''>
                {content && content.length > 0 && (
                  <div className='flex flex-wrap pt-[14px] pb-[3px] border-b border-b-default'>
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
                          __pagesConstant._header.brandImage.indexOf(a.seName) -
                          __pagesConstant._header.brandImage.indexOf(b.seName)
                        );
                      })
                      ?.map((brand) => (
                        <BrandImage
                          key={brand.id}
                          url={
                            brand.brandCollectionUrl
                              ? `${brand.brandCollectionUrl}.html`
                              : `${brand.seName}.html`
                          }
                          alt={capitalizeFirstLetter(brand.brandName)}
                          src={brand.brandBlackColorImageUrl}
                        />
                      ))}
                  </div>
                )}
                <div className='pt-[10px] pb-[20px]'>
                  <div className='flex flex-wrap'>
                    <ul className='w-full lg:w-1/3 text-[13px] pl-[20px] pr-[20px]'>
                      {content?.map((brand, index) => {
                        if (index > content.length / 3) return <></>;
                        return (
                          <SubMenuItem
                            view={view}
                            key={brand.id}
                            itemLabel={capitalizeFirstLetter(brand.brandName)}
                            itemUrl={
                              brand.brandCollectionUrl
                                ? `${brand.brandCollectionUrl}`
                                : `${brand.seName}`
                            }
                            type={'BRAND'}
                          />
                        );
                      })}
                    </ul>
                    <ul className='w-full lg:w-1/3 text-[13px] pl-[20px] pr-[20px]'>
                      {content?.map((brand, index) => {
                        if (
                          index > content.length / 3 &&
                          index <= (content.length / 3) * 2 + 1
                        )
                          return (
                            <Fragment key={brand.id}>
                              <SubMenuItem
                                view={view}
                                itemLabel={capitalizeFirstLetter(
                                  brand.brandName,
                                )}
                                itemUrl={
                                  brand.brandCollectionUrl
                                    ? `${brand.brandCollectionUrl}`
                                    : `${brand.seName}.html?v=product-list`
                                }
                                type={'BRAND'}
                              />
                            </Fragment>
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
                                  ? `${brand.brandCollectionUrl}`
                                  : `${brand.seName}.html`
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
    );
  }

  return <></>;
};

export default Brand;
