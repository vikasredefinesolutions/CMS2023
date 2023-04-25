import { __pagesText } from '@constants/pages.text';
import { _MenuCategory } from '@definations/header.type';
import SubMenuItem from '@header/header_Type3/Components/Menu/Header_SubMenuItem';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useState } from 'react';
interface _props {
  title: string;
  url: string;
  content: _MenuCategory[] | null;
}

const Header_Category: React.FC<_props> = ({ content, title, url }) => {
  const { view } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu } = useActions_v2();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  if (view === 'MOBILE') {
    return (
      <>
        <div className='relative flex border-b border-b-gray-border items-center justify-between'>
          {/* <div className='flex items-center justify-between py-2 pr-2'> */}
          <button
            title={title}
            type='button'
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            onClick={() => setShowAllItems((show) => !show)}
          >
            <span
              className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
              x-html="open1 == true ? 'remove' : 'add'"
            >
              {showAllItems == true ? 'remove' : 'add'}
            </span>
            <div className=''>{title}</div>
          </button>
          <a
            className='text-[12px] mr-[5px] underline'
            onClick={() => toggleSideMenu('CLOSE')}
          >
            <Link href={`${url}`}>{__pagesText.Headers.mobileViewAll}</Link>
          </a>
          {/* </div> */}
        </div>
        {showAllItems && (
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
      </>
    );
  }
  if (view === 'DESKTOP') {
    return (
      <Link href={`${url}`} className='flex'>
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
                //   x-transition:enter="transition ease-out duration-200"
                //   x-transition:enter-start="opacity-0"
                //   x-transition:enter-end="opacity-100"
                //   x-transition:leave="transition ease-in duration-150"
                //   x-transition:leave-start="opacity-100"
                //   x-transition:leave-end="opacity-0"
                className='absolute top-full left-[0] min-w-[250px] sm:text-[13px]'
              >
                <div className='relative border border-gray-border bg-white z-50 p-[15px]'>
                  <div className=''>
                    <div className='flex flex-wrap'>
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
                              itemLabel={capitalizeFirstLetter(
                                item.categoryName,
                              )}
                              itemUrl={`${item.seName}.html?v=product-list`}
                              type={'CATEGORY'}
                            />
                          );
                        })}
                      </ul>
                      {/* <ul className='w-full lg:w-1/2 text-[13px] pl-[20px] pr-[20px]'>
                        {content?.map((item, index) => {
                          if (
                            index >= content.length / 2 &&
                            index <= (content.length / 2) * 2 + 1
                          )
                            return (
                              <SubMenuItem
                                key={index}
                                view={view}
                                itemLabel={capitalizeFirstLetter(
                                  item.categoryName,
                                )}
                                itemUrl={`${item.seName}.html?v=product-list`}
                                type={'CATEGORY'}
                              />
                            );
                        })}
                      </ul> */}
                    </div>
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

export default Header_Category;