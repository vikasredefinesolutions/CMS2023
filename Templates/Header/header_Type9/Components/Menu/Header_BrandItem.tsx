import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { _Brand } from '@definations/brand';
import { _modals } from '@definations/product.type';
import SubMenuItem from '@header/header_Type9/Components/Menu/Header_SubMenuItem';

import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
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
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const [focus, setFocus] = useState<boolean>(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
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

  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
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
              onClick={() => {
                if (code === 'CYX') {
                  if (customerId) {
                    setOpenTab(title);
                    setShowAllItems((show) => !show);
                  } else {
                    toggleSideMenu('CLOSE');
                    setOpenModal('login');
                  }
                } else {
                  setOpenTab(title);
                  setShowAllItems((show) => !show);
                }
              }}
              x-html="open == true ? 'remove' : 'add'"
            >
              {showAllItems == true && showtab ? 'remove' : 'add'}
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
        {showAllItems && showtab && (
          <div className='text-[14px]' x-show='open' x-cloak>
            <div className='relative bg-light-gray'>
              <div className=''>
                <ul
                  // role='list'
                  // aria-labelledby='desktop-featured-heading-1'
                  className=''
                >
                  {content?.map((brand, index) => {
                    return (
                      <Fragment key={brand.id}>
                        <SubMenuItem
                          view={view}
                          itemLabel={capitalizeFirstLetter(brand.brandName)}
                          itemUrl={
                            brand.brandCollectionUrl
                              ? `${brand.brandCollectionUrl}.html`
                              : `${brand.seName}.html?v=product-list`
                          }
                          type={'BRAND'}
                          showPipe={content.length - 1 !== index ? true : false}
                        />
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  if (view === 'DESKTOP') {
    return (
      <>
        <div
          className='flex '
          onClick={() => {
            router.push(`/${url}`);
          }}
        >
          <div className='relative flex '>
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative z-10 flex items-center transition-colors ease-out text-[#000000] lg:py-[5px] xl:py-[12px] ${
                focus
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-primary'
              }`}
            >
              <span
                className='font-semibold uppercase tracking-widest '
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
                className='absolute top-full left-0 w-screen max-w-screen-sm text-[#000000] sm:text-sm'
              >
                {' '}
                <div
                  className='absolute inset-0 top-1/2 bg-white shadow'
                  aria-hidden='true'
                ></div>
                <div className='relative bg-white border z-50'>
                  <div className='w-7xl mx-auto'>
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
                    <ul
                      role='list'
                      aria-labelledby='desktop-featured-heading-1'
                      className='flex flex-wrap space-x-2 xl:space-x-4'
                    >
                      {content?.map((brand, index) => {
                        return (
                          <Fragment key={brand.id}>
                            <SubMenuItem
                              view={view}
                              itemLabel={capitalizeFirstLetter(brand.brandName)}
                              itemUrl={
                                brand.brandCollectionUrl
                                  ? `${brand.brandCollectionUrl}.html`
                                  : `${brand.seName}.html?v=product-list`
                              }
                              type={'BRAND'}
                              showPipe={
                                content.length - 1 !== index ? true : false
                              }
                            />
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex lg:py-[5px] xl:py-[12px] text-anchor'>/</div>
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  return <></>;
};

export default Brand;
