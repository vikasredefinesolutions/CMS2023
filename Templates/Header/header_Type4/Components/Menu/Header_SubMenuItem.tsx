import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import { FetchMenuCategories } from '@services/header.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
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
  const { toggleSideMenu } = useActions_v2();
  const [subCategories, setSubCategories] = useState<_MenuCategory[] | null>();
  const storeId = useTypedSelector_v2((state) => state.store.id);
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
        <Link href={`/${itemUrl}`}>
          <li className='flex pt-[12px]'>
            <span className='material-icons-outlined text-[18px] leading-none font-[100]'>
              {__pagesText.Headers.rightArrowIcon}
            </span>
            <span
              className='inline-block text-[13px] text-primary hover:text-primary-hover font-[600] tracking-[1.25px] leading-[18px]'
              title={itemLabel}
            >
              {itemLabel}
            </span>
          </li>
        </Link>
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
                href='javascript:void(0);'
                onClick={() => toggleSideMenu('CLOSE')}
              >
                <Link href={`${itemUrl}`}>
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
        <li className='flex pt-[12px]'>
          <span className='material-icons-outlined text-[18px] leading-none font-[100]'>
            {__pagesText.Headers.rightArrowIcon}
          </span>
          <Link href={`/${itemUrl}`}>
            <span
              className='inline-block text-[13px] text-primary hover:text-primary-hover font-[600] tracking-[1.25px] leading-[18px]'
              title={itemLabel}
            >
              {itemLabel}
            </span>
          </Link>
        </li>
      );
    }
  }

  return <></>;
};

export default SubMenuItem;
