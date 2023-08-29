import { SortingMethod } from '@constants/common.constant';
import {
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
type _Props = {
  length: number;
};

const PL3_FilterBar: React.FC<_Props> = ({ length }) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const productView = useTypedSelector_v2((state) => state.listing.listingView);

  const router = useRouter();
  const { setShowLoader, update_ListingProperties } = useActions_v2();

  const [showSortMenu, setShowSortMenu] = useState(false);
  // const totalCount = useTypedSelector_v2(
  //   (state) => state.listing.totalVisibleProducts,
  // );

  const [sorting, setSorting] = useState<number>(1);

  const sortProductJson = (type: number) => {
    setShowLoader(true);
    setSorting(type);

    router.replace({
      query: { ...router.query, ['sort']: type },
    });
    setShowSortMenu(false);
  };

  useEffect(() => {
    setShowSortMenu(false);
  }, [router.asPath]);

  useEffect(() => {
    const sort: number =
      (router.query.sort as unknown as number) ||
      (router.query.Sort as unknown as number) ||
      1;
    setSorting(+sort);
  }, [router.query]);

  return (
    <div
      className={`relative z-10 mt-[20px] lg:mt-[0px] ${
        storeCode !== THD_STORE_CODE && storeCode !== _Store_CODES.USAAPUNCHOUT
          ? ' py-[5px]'
          : ''
      }`}
    >
      <hr />
      <div className='flex flex-wrap justify-between items-center text-sm gap-2 py-[5px]'>
        <div className='flex flex-wrap items-center gap-2'>
          {storeCode !== SIMPLI_SAFE_CODE &&
            storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
              <>
                <button
                  className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center ${
                    productView == 'grid' ? '!text-primary' : 'text-gray-600'
                  }`}
                  onClick={() =>
                    update_ListingProperties({
                      type: 'LISTING_VIEW',
                      view: 'grid',
                    })
                  }
                >
                  <span className='sr-only'>Grid View</span>
                  <span
                    className={`material-icons ${
                      productView === 'grid'
                        ? 'text-anchor hover:text-anchor-hover'
                        : 'hover:text-anchor text-anchor-hover'
                    } `}
                  >
                    apps
                  </span>
                </button>

                <button
                  className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center  ${
                    productView == 'list' ? 'text-primary' : '!text-gray-600'
                  }`}
                  onClick={() =>
                    update_ListingProperties({
                      type: 'LISTING_VIEW',
                      view: 'list',
                    })
                  }
                >
                  <span className='sr-only'>List View</span>
                  <span
                    className={`material-icons ${
                      productView === 'list'
                        ? 'text-anchor hover:text-anchor-hover'
                        : 'hover:text-anchor text-anchor-hover'
                    } `}
                  >
                    view_list
                  </span>
                </button>
              </>
            )}
          <span className='font-600'>
            {length} {__pagesText.productListing.totalCountresult}
          </span>
        </div>
        {storeCode !== SIMPLI_SAFE_CODE &&
          storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
            <div className='relative w-full max-w-[260px]'>
              <div className=''>
                <button
                  type='button'
                  className='group inline-flex items-center justify-between text-default-text border border-[#000000] w-full p-[10px] uppercase'
                  id='menu-button'
                  onClick={() => setShowSortMenu((prev) => !prev)}
                >
                  <span className=''>
                    <span>
                      {
                        SortingMethod.find((method) => method.type === sorting)
                          ?.name
                      }
                    </span>
                  </span>
                  <span className='material-icons-outlined  leading-none font-[900]'>
                    {showSortMenu ? 'remove' : 'add'}
                  </span>
                </button>
              </div>
              {showSortMenu && (
                <div className='origin-top-right absolute right-0 mt-[0px] w-full border border-[#000000] border-t-0 bg-[#ffffff] ring-1 ring-[#000000] ring-opacity-5 focus:outline-none'>
                  <div className='pt-[4px] pb-[4px]'>
                    {SortingMethod.map((method) => (
                      <button
                        key={method.type}
                        onClick={() => {
                          sortProductJson(method.type);
                        }}
                        type='button'
                        className={
                          'w-full text-left pl-[8px] pt-[4px] pb-[4px] flex items-center gap-[8px] text-extra-small-text'
                        }
                      >
                        <span
                          className={`material-icons-outlined ${
                            sorting === method.type ? '' : 'opacity-0'
                          }`}
                        >
                          {__pagesText.productListing.checkIcon}
                        </span>
                        <span>{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
      <hr />
    </div>
  );
};

export default PL3_FilterBar;
