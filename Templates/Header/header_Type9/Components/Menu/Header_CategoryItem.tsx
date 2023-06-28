import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import { _modals } from '@definations/product.type';
import SubMenuItem from '@header/header_Type9/Components/Menu/Header_SubMenuItem';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { FetchMenuCategories } from '@services/header.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
interface _props {
  title: string;
  url: string;
  // content: _MenuCategory[] | null;
  itemId: number;
  openTab: string;
  setOpenTab: (arg: string) => void;
  showPipe: boolean;
}

const Header_Category: React.FC<_props> = ({
  itemId,
  title,
  url,
  openTab,
  setOpenTab,
  showPipe,
}) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const {
    view,
    code,
    id: storeId,
  } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu, setRedirectPagePath } = useActions_v2();
  const [subCategories, setSubCategories] = useState<_MenuCategory[] | null>();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [showtab, setShowTab] = useState<boolean>(false);
  useEffect(() => {
    if (itemId) {
      FetchMenuCategories({
        categoryId: itemId,
        storeId: storeId,
      }).then((res) => setSubCategories(res?.categories));
    } else {
      setSubCategories([]);
    }
  }, [itemId]);
  useEffect(() => {
    if (openTab == title) {
      setShowTab(true);
      setShowAllItems(true);
    } else {
      setShowTab(false);
      setShowAllItems(false);
    }
  }, [openTab]);
  const [openModal, setOpenModal] = useState<null | _modals>(null);

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
            title={title}
            type='button'
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            onClick={() => {
              if (code === 'CYX') {
                if (customerId) {
                  setOpenTab(title);
                  setShowAllItems((show) => !show);
                } else {
                  setOpenModal('login');
                }
              } else {
                setOpenTab(title);
                setShowAllItems((show) => !show);
              }
            }}
          >
            {subCategories && subCategories.length > 0 && (
              <span
                className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
                x-html="open1 == true ? 'remove' : 'add'"
              >
                {showAllItems == true && showtab ? 'remove' : 'add'}
              </span>
            )}

            <div
              className=''
              onClick={() => {
                if (subCategories && subCategories.length <= 0) {
                  router.push(`/${url}`);
                }
              }}
            >
              {title}
            </div>
          </button>
          <div
            className='text-[12px] mr-[5px] underline'
            onClick={() => toggleSideMenu('CLOSE')}
          >
            {subCategories && subCategories.length > 0 && (
              <Link href={`/${url}`}>{__pagesText.Headers.mobileViewAll}</Link>
            )}
          </div>
          {/* </div> */}
        </div>
        {showAllItems &&
          showtab &&
          subCategories &&
          subCategories.length > 0 && (
            <div className='text-[14px]' x-show='open1'>
              <div className='relative bg-light-gray'>
                <div className=''>
                  <ul
                    // role='list'
                    // aria-labelledby='desktop-featured-heading-1'
                    className=''
                  >
                    {subCategories?.map((item, index) => {
                      return (
                        <SubMenuItem
                          key={index}
                          view={view}
                          itemLabel={capitalizeFirstLetter(item.categoryName)}
                          itemUrl={`${item.seName}.html?v=product-list`}
                          type={'CATEGORY'}
                          itemId={item.id}
                          showPipe={
                            subCategories.length - 1 !== index ? true : false
                          }
                        />
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
        <div className='flex '>
          <div
            className='relative flex '
            onClick={() => {
              router.push(`/${url}`);
            }}
          >
            <button
              title={title}
              type='button'
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              className={`relative z-10 flex items-center transition-colors ease-out text-[#000000] lg:py-[5px] xl:py-[12px] ${
                // focus
                //   ? 'border-secondary text-secondary'
                //   : 'border-transparent text-primary'
                ''
              }`}
            >
              <span
                className='font-semibold uppercase tracking-widest '
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
          {focus && subCategories && subCategories?.length > 0 && (
            <div
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
              //   x-transition:enter="transition ease-out duration-200"
              //   x-transition:enter-start="opacity-0"
              //   x-transition:enter-end="opacity-100"
              //   x-transition:leave="transition ease-in duration-150"
              //   x-transition:leave-start="opacity-100"
              //   x-transition:leave-end="opacity-0"
              className='absolute top-full left-0 w-screen max-w-screen-sm text-[#000000] sm:text-sm'
            >
              <div
                className='absolute inset-0 top-1/2 bg-white shadow'
                aria-hidden='true'
              ></div>
              <div className='relative bg-white border z-50'>
                <div className='w-7xl mx-auto'>
                  <div className='border-t first:border-t-0 py-5 px-5'>
                    {/* <div className='flex flex-wrap'> */}
                    <ul
                      role='list'
                      aria-labelledby='desktop-featured-heading-1'
                      className='flex flex-wrap space-x-2 xl:space-x-4'
                    >
                      {subCategories?.map((item, index) => {
                        // if (index > content.length / 2) return <></>;
                        return (
                          <SubMenuItem
                            key={index}
                            view={view}
                            itemLabel={capitalizeFirstLetter(item.categoryName)}
                            itemUrl={`${item.seName}.html?v=product-list`}
                            type={'CATEGORY'}
                            showPipe={
                              subCategories.length - 1 !== index ? true : false
                            }
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {showPipe && (
          <div className='flex lg:py-[5px] xl:py-[12px] text-anchor'>/</div>
        )}
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  return <></>;
};

export default Header_Category;
