import { SortingMethod } from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import React from 'react';
type props = {
  totalCount: number;
  showSortMenu: boolean;
  productView: string;
  sortProductJson: (arg: number) => void;
  sortOpenHandler: (arg: boolean) => void;
  setProductView: (arg: string) => void;
  setShowFilter: (arg: boolean) => void;
  sortingType: number | undefined;
};

const PL4_FilterBar: React.FC<props> = ({
  totalCount,
  showSortMenu,
  sortProductJson,
  sortOpenHandler,
  setProductView,
  sortingType,
}) => {
  return (
    <div className='relative z-10 mt-[20px] lg:mt-[0px]'>
      <div className='flex flex-wrap justify-between items-center text-sm gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center`}
            onClick={() => setProductView('grid')}
          >
            <span className='sr-only'>Grid View</span>
            <span className='material-icons-outlined text-medium-text text-anchor hover:text-anchor-hover'>
              {__pagesText.productListing.gridViewIcon}
            </span>
          </button>

          <button
            className={`flex justify-center items-center w-[34px] h-[40px] bg-light-gray text-center`}
            onClick={() => setProductView('list')}
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
              onClick={() => sortOpenHandler(!showSortMenu)}
            >
              <span className=''>
                <span>
                  {
                    SortingMethod.find((method) => method.type === sortingType)
                      ?.name
                  }
                </span>
              </span>
              <span className='material-icons-outlined text-sub-text leading-none font-[900]'>
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
                        sortingType === method.type ? '' : 'opacity-0'
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
