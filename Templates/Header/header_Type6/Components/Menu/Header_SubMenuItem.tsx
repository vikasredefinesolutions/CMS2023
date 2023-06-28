import LoginModal from '@appComponents/modals/loginModal';
import { UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import { _modals } from '@definations/product.type';
import { FetchMenuCategories } from '@services/header.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SubCategoryItem from './Header_SubCategoryItem';

interface _props {
  itemLabel: string;
  itemUrl: string;
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
  itemId?: number;
}

const SubMenuItem: React.FC<_props> = ({
  type,
  itemLabel,
  itemUrl,
  view,
  itemId,
}) => {
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const { toggleSideMenu, setRedirectPagePath } = useActions_v2();
  const [subCategories, setSubCategories] = useState<_MenuCategory[] | null>();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const { code } = useTypedSelector_v2((state) => state.store);

  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
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

  if (type === 'BRAND') {
    if (view === 'MOBILE') {
      return (
        <li
          className='py-[12px] border-b border-b-gray-border'
          onClick={() => toggleSideMenu('CLOSE')}
        >
          <Link
            href={`/${itemUrl}`}
            className='text-anchor hover:text-anchor-hover '
          >
            <a
              className='relative inline-block pl-[50px] leading-[18px] text-[#000000]'
              title={itemLabel}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
      );
    }
    if (view === 'DESKTOP') {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();

            if (code === 'CYX' || code === UNITI_CODE) {
              if (customerId) {
                router.push(`/${itemUrl}`);
              } else {
                setRedirectPagePath(`/${itemUrl}`);
                setOpenModal('login');
              }
            } else {
              router.push(`/${itemUrl}`);
            }
          }}
        >
          <li className=''>
            {/* <span className='material-icons-outlined text-[18px] leading-none font-[100] mr-[10px]'>
            {__pagesText.Headers.rightArrowIcon}
          </span> */}
            <span
              className='block text-[14px] text-primary font-[400] tracking-[1px] leading-[18px] uppercase hover:text-white hover:bg-secondary px-[10px] py-[7px] hover:pl-[20px] transition-all duration-700'
              title={itemLabel}
            >
              {itemLabel}
            </span>
          </li>
          {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
        </div>
      );
    }
  }

  if (type === 'CATEGORY') {
    if (view === 'MOBILE') {
      if (subCategories && subCategories?.length > 0) {
        return (
          <>
            <div className='relative flex border-b border-b-gray-border items-center justify-between pl-[25px]'>
              <button
                title={itemLabel}
                type='button'
                className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
                onClick={() => setShowAllItems((show) => !show)}
              >
                <span
                  className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
                  x-html="subopen1 == true ? 'remove' : 'add'"
                >
                  {showAllItems == true ? 'remove' : 'add'}
                </span>
                <div className=''>{itemLabel}</div>
              </button>
              <a
                className='text-[12px] mr-[5px] underline'
                onClick={() => toggleSideMenu('CLOSE')}
                href='javascript:void(0);'
              >
                <Link href={`/${itemUrl}`}>
                  {__pagesText.Headers.mobileViewAll}
                </Link>
              </a>
            </div>

            {showAllItems && (
              <div className='text-[14px]' x-show='subopen2'>
                <div className='relative bg-light-gray'>
                  <div className=''>
                    <ul
                      // role='list'
                      // aria-labelledby='desktop-featured-heading-1'
                      className=''
                    >
                      {subCategories.map((subCat, index) => {
                        return (
                          <SubCategoryItem
                            key={`${index}_${subCat.id}`}
                            itemLabel={subCat.categoryName}
                            type={'CATEGORY'}
                            view={'MOBILE'}
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
      return (
        <li
          className='py-[12px] border-b border-b-gray-border'
          onClick={() => toggleSideMenu('CLOSE')}
        >
          {/* <span className='material-icons-outlined text-lg'>chevron_right</span> */}
          <Link
            href={`/${itemUrl}`}
            className='text-anchor hover:text-anchor-hover'
          >
            <a
              className='relative inline-block pl-[50px] leading-[18px] text-[#000000]'
              title={itemLabel}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
      );
    }

    if (view === 'DESKTOP') {
      return (
        <>
          <li className=''>
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (code === 'CYX' || code == UNITI_CODE) {
                  if (customerId) {
                    router.push(`/${itemUrl}`);
                  } else {
                    setRedirectPagePath(`/${itemUrl}`);
                    setOpenModal('login');
                  }
                } else {
                  router.push(`/${itemUrl}`);
                }
              }}
            >
              <span
                className='block text-[14px] text-primary font-[400] tracking-[1px] leading-[18px] uppercase  hover:bg-secondary px-[10px] py-[7px] hover:pl-[20px] transition-all duration-700 hover:text-primary'
                title={itemLabel}
              >
                {itemLabel}
              </span>
            </div>
          </li>
          {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
        </>
      );
    }
  }

  return <></>;
};

export default SubMenuItem;
