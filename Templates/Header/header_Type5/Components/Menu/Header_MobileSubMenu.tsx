import { __pagesText } from '@constants/pages.text';
import { _MenuCategoryWithBrand } from '@definations/header.type';
import { useActions_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React, { useState } from 'react';
import SubCategoryItem from './Header_SubCategoryItem';

interface _props {
  type: 'BRAND' | 'CATEGORY';
  view: 'DESKTOP' | 'MOBILE';
  content: _MenuCategoryWithBrand[] | null;
  url: string;
}

const MobileSubMenu: React.FC<_props> = ({ content, type, view, url }) => {
  //   const { toggleSideMenu } = useActions_v2();
  const [showAllItemsCategories, setShowAllItemsCategories] =
    useState<boolean>(false);
  const [showAllItemsBrand, setShowAllItemsBrand] = useState<boolean>(false);
  const { toggleSideMenu } = useActions_v2();
  if (type === 'CATEGORY') {
    if (view === 'MOBILE') {
      return (
        <>
          <div className='relative flex border-b border-b-gray-border items-center justify-between pl-[25px]'>
            <button
              title={'Categories'}
              type='button'
              className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
              onClick={() => {
                if (!showAllItemsCategories) setShowAllItemsBrand(false);
                setShowAllItemsCategories((show) => !show);
              }}
            >
              <span
                className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
                x-html="subopen1 == true ? 'remove' : 'add'"
              >
                {showAllItemsCategories == true ? 'remove' : 'add'}
              </span>
              <div className=''>BY Categories</div>
            </button>
            <div
              className='text-[12px] mr-[5px] underline'
              onClick={() => toggleSideMenu('CLOSE')}
            >
              <Link href={`${url}.html`}>
                {__pagesText.Headers.mobileViewAll}
              </Link>
            </div>
          </div>

          {showAllItemsCategories && (
            <div className='text-[14px]' x-show='subopen2'>
              <div className='relative bg-light-gray'>
                <div className=''>
                  <ul
                    // role='list'
                    // aria-labelledby='desktop-featured-heading-1'
                    className=''
                  >
                    {content &&
                      content[0].categoryDetails.map((subCat, index) => {
                        return (
                          <SubCategoryItem
                            key={`${index}_${subCat.id}`}
                            itemLabel={subCat.categoryName}
                            type={'CATEGORY'}
                            view={'MOBILE'}
                            url={`${subCat.seName}.html`}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <div className='relative flex border-b border-b-gray-border items-center justify-between pl-[25px]'>
            <button
              title={'BRAND'}
              type='button'
              className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
              onClick={() => {
                if (!showAllItemsBrand) setShowAllItemsCategories(false);
                setShowAllItemsBrand((show) => !show);
              }}
            >
              <span
                className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
                x-html="subopen1 == true ? 'remove' : 'add'"
              >
                {showAllItemsBrand == true ? 'remove' : 'add'}
              </span>
              <div className=''>BY Brand</div>
            </button>
            <div
              className='text-[12px] mr-[5px] underline'
              onClick={() => toggleSideMenu('CLOSE')}
            >
              <Link href={`${url}.html`}>
                {__pagesText.Headers.mobileViewAll}
              </Link>
            </div>
          </div>

          {showAllItemsBrand && (
            <div className='text-[14px]' x-show='subopen2'>
              <div className='relative bg-light-gray'>
                <div className=''>
                  <ul
                    // role='list'
                    // aria-labelledby='desktop-featured-heading-1'
                    className=''
                  >
                    {' '}
                    {content &&
                      content[0].brandDetails.map((subCat, index) => {
                        return (
                          <Link href={subCat.seName}>
                            <SubCategoryItem
                              key={`${index}_${subCat.id}`}
                              itemLabel={subCat.brandName}
                              url={`Brand/${subCat.seName}/${subCat.brandId}/${url}.html`}
                              type={'BRAND'}
                              view={'MOBILE'}
                            />
                          </Link>
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
  }
  return <></>;
};

export default MobileSubMenu;
