import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import { FetchMenuCategories } from '@services/header.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import SubCategoryItem from './Header_SubCategoryItem';

interface _props {
  itemLabel: string;
  itemUrl: string;
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
  itemId?: number;
  setSubTab?: (args: string) => void;
  Subtab?: string;
}

const SubMenuItem: React.FC<_props> = ({
  type,
  itemLabel,
  itemUrl,
  view,
  itemId,
  setSubTab,
  Subtab,
}) => {
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const { toggleSideMenu } = useActions_v2();
  const [subCategories, setSubCategories] = useState<_MenuCategory[] | null>();
  const [showtab, setShowTab] = useState<boolean>(false);
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
  useEffect(() => {
    if (Subtab == itemLabel) {
      setShowTab(true);
      setShowAllItems(true);
    } else {
      setShowTab(false);
      setShowAllItems(false);
    }
  }, [Subtab]);

  if (type === 'BRAND') {
    if (view === 'MOBILE') {
      return (
        <li
          className='py-[12px] border-b border-b-gray-border'
          onClick={() => toggleSideMenu('CLOSE')}
        >
          <Link
            href={`/${itemUrl}.html`}
            passHref
            className='text-anchor hover:text-anchor-hover '
          >
            <a
              className='relative inline-block pl-[50px] leading-[18px]'
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
          <Link href={`/${itemUrl}.html`}>
            <a
              className='inline-block text-[13px] text-primary font-[600] tracking-[1px] leading-[18px]'
              title={itemLabel}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
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
                onClick={() => {
                  setSubTab && setSubTab(itemLabel);
                  setShowAllItems((show) => !show);
                }}
              >
                <span
                  className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
                  x-html="subopen1 == true ? 'remove' : 'add'"
                >
                  {showAllItems == true && Subtab ? 'remove' : 'add'}
                </span>
                <div className=''>{itemLabel}</div>
              </button>
              <div
                className='text-[12px] mr-[5px] underline'
                onClick={() => toggleSideMenu('CLOSE')}
              >
                <Link href={`${itemUrl}.html`}>
                  {__pagesText.Headers.mobileViewAll}
                </Link>
              </div>
            </div>

            {showAllItems && showtab && (
              <div className='text-[14px]' x-show='subopen1'>
                <div className='relative bg-light-gray'>
                  <div className=''>
                    <ul className=''>
                      {subCategories.map((subCat, index) => {
                        return (
                          <Fragment key={`${index}_${subCat.id}`}>
                            <SubCategoryItem
                              key={`${index}_${subCat.id}`}
                              itemLabel={subCat.categoryName}
                              type={'CATEGORY'}
                              view={'MOBILE'}
                              sename={subCat.seName}
                            />
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
      return (
        <li
          className='py-[12px] border-b border-b-gray-border'
          onClick={() => toggleSideMenu('CLOSE')}
        >
          {/* <span className='material-icons-outlined text-lg'>chevron_right</span> */}
          <Link
            href={`/${itemUrl}.html`}
            className='text-anchor hover:text-anchor-hover'
          >
            <a
              className='relative inline-block pl-[50px] leading-[18px]'
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
        <li className='flex pt-[12px] '>
          <span className='material-icons-outlined text-[18px] leading-none font-[100]'>
            {__pagesText.Headers.rightArrowIcon}
          </span>
          <Link href={`/${itemUrl}.html`}>
            <a
              className='inline-block text-[13px] text-primary font-[600] tracking-[1px] leading-[18px]'
              title={itemLabel}
            >
              {itemLabel}
            </a>
          </Link>
        </li>
      );
    }
  }

  return <></>;
};

export default SubMenuItem;
