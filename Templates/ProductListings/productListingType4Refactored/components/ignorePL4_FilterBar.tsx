import { SortingMethod } from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
interface props {}

const PL4_FilterBar: React.FC<props> = () => {
  const router = useRouter();
  const { setShowLoader, update_ListingProperties } = useActions_v2();

  const productView = useTypedSelector_v2((state) => state.listing.listingView);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const totalCount = useTypedSelector_v2(
    (state) => state.listing.totalVisibleProducts,
  );
  const sort: number =
    (router.query.sort as unknown as number) ||
    (router.query.Sort as unknown as number) ||
    1;
  const [sorting, setSorting] = useState<number>(+sort || 1);

  const sortProductJson = (type: number) => {
    setShowLoader(true);
    setSorting(type);

    let query = `?sort=${type}`;
    if (router.query?.page) {
      query = `?sort=${type}&page=${router.query.page}`;
    }

    const newPath = router.query['slug-id'] + query;
    router.replace(newPath);
    setShowSortMenu(false);
  };

  useEffect(() => {
    setShowSortMenu(false);
  }, [router.asPath]);

  return (
    <div className='relative z-10 mt-[20px] lg:mt-[0px]'>
      <div className='flex flex-wrap justify-between items-center text-sm gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center`}
            onClick={() =>
              update_ListingProperties({ type: 'LISTING_VIEW', view: 'grid' })
            }
          >
            <span className='sr-only'>Grid View</span>
            <span className='material-icons-outlined text-anchor hover:text-anchor-hover'>
              {__pagesText.productListing.gridViewIcon}
            </span>
          </button>

          <button
            className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center`}
            onClick={() =>
              update_ListingProperties({ type: 'LISTING_VIEW', view: 'list' })
            }
          >
            <span className='sr-only'>List View</span>
            <span className='material-icons-outlined text-medium-text text-anchor hover:text-anchor-hover'>
              {__pagesText.productListing.listViewIcon}
            </span>
          </button>
          <span className='font-600'>
            {totalCount} {__pagesText.productListing.totalCountresult}
          </span>
        </div>
        <div className='relative w-full max-w-[200px]'>
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
              <span className='material-icons-outlined font-[900]'>
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
                      className={`material-icons-outlined text-sm ${
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
      </div>
    </div>
  );
};

export default PL4_FilterBar;
