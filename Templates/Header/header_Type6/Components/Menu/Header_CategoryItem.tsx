import LoginModal from '@appComponents/modals/loginModal';
import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import { _modals } from '@definations/product.type';
import SubMenuItem from '@header/header_Type6/Components/Menu/Header_SubMenuItem';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
interface _props {
  title: string;
  url: string;
  content: _MenuCategory[] | null;
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
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu, setRedirectPagePath } = useActions_v2();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [showtab, setShowTab] = useState<boolean>(false);
  const { redirectPath } = useTypedSelector_v2((state) => state.home);
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
              if (code === CYXTERA_CODE || code === UNITI_CODE) {
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
            <Link href={`${url}`}>{__pagesText.Headers.mobileViewAll}</Link>
          </div>
          {/* </div> */}
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
                  {content?.map((item, index) => {
                    return (
                      <SubMenuItem
                        key={index}
                        view={view}
                        itemLabel={capitalizeFirstLetter(item.categoryName)}
                        itemUrl={`${item.seName}.html?v=product-list`}
                        type={'CATEGORY'}
                        itemId={item.id}
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
        <div
          onClick={() => {
            if (code === CYXTERA_CODE || code === UNITI_CODE) {
              if (customerId) {
                router.push(`/${url}`);
              } else {
                setRedirectPagePath(redirectPath || `/${url}`);
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
                className='absolute top-full left-[0] min-w-[250px] sm:text-[13px]'
              >
                <div className='relative border border-gray-border bg-white z-50 p-[15px]'>
                  <div className=''>
                    <ul
                      role='list'
                      aria-labelledby='desktop-featured-heading-1'
                      className='w-full text-[13px]'
                    >
                      {content?.map((item, index) => {
                        // if (index > content.length / 2) return <></>;
                        return (
                          <SubMenuItem
                            key={index}
                            view={view}
                            itemLabel={capitalizeFirstLetter(item.categoryName)}
                            itemUrl={`${item.seName}.html?v=product-list`}
                            type={'CATEGORY'}
                          />
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

export default Header_Category;
