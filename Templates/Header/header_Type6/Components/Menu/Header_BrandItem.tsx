import LoginModal from '@appComponents/modals/loginModal';
import ThirdPartyLogin from '@appComponents/modals/loginModal/ThirdPartyLogin';
import {
  CYXTERA_CODE,
  SIMPLI_SAFE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _Brand } from '@definations/brand';
import { _modals } from '@definations/product.type';
import SubMenuItem from '@header/header_Type6/Components/Menu/Header_SubMenuItem';

import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

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
  const { thirdPartyLogin } = useTypedSelector_v2((state) => state.store);
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

  const getHeaderClassName = useCallback(() => {
    if (focus) {
      if (code == SIMPLI_SAFE_CODE || code === _Store_CODES.USAAHEALTHYPOINTS) {
        return 'border-secondary primary-link hover:primary-link';
      }
      return 'border-secondary text-secondary';
    } else {
      if (code == UNITI_CODE) {
        return 'border-transparent primary-link font-semibold';
      } else if (
        code == SIMPLI_SAFE_CODE ||
        code === _Store_CODES.USAAHEALTHYPOINTS ||
        code === UCA
      ) {
        return 'border-transparent primary-link';
      } else {
        return 'border-transparent text-primary';
      }
    }
  }, [focus, code]);

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
                if (
                  code === CYXTERA_CODE ||
                  code === UNITI_CODE ||
                  code === UCA
                ) {
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
                  {content?.map((brand) => {
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
                        />
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
        {openModal === 'login' && (
          <>
            {thirdPartyLogin ? (
              <ThirdPartyLogin modalHandler={modalHandler} />
            ) : (
              <LoginModal modalHandler={modalHandler} />
            )}
          </>
        )}
      </>
    );
  }

  if (view === 'DESKTOP') {
    return (
      <>
        <div
          onClick={() => {
            if (code === CYXTERA_CODE || code === UNITI_CODE || code === UCA) {
              if (customerId) {
                router.push(`/${url}`);
              } else {
                setOpenModal('login');
              }
            } else {
              router.push(`/${url}`);
            }
          }}
        >
          <div className='relative '>
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] ${getHeaderClassName()}`}
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
                className='absolute top-full left-[0] min-w-[250px] sm:text-[13px]'
              >
                <div className='relative border border-gray-border bg-white z-50 p-[15px]'>
                  <div className=''>
                    <ul className='w-full text-[13px]'>
                      {content?.map((brand, index) => {
                        if (index > content.length / 3 + 1) return <></>;
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
                            />
                          </Fragment>
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
                            <Fragment key={brand.id}>
                              <SubMenuItem
                                view={view}
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
                            </Fragment>
                          );
                      })}
                    </ul>
                    <ul className='w-full lg:w-1/3 text-[13px] pl-[20px] pr-[20px]'>
                      {content?.map((brand, index) => {
                        if (index > (content.length / 3) * 2 + 1)
                          return (
                            <Fragment key={brand.id}>
                              <SubMenuItem
                                view={view}
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
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  return <></>;
};

export default Brand;
