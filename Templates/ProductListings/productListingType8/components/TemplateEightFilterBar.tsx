/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SortingMethod } from '../../../../constants_v2/common.constant';

type props = {
  totalCount: number;
  showSortMenu: boolean;
  productView: string;
  sortingType: number;
  sortProductJson: (arg: number) => void;
  sortOpenHandler: (arg: boolean) => void;
  setProductView: (arg: string) => void;
  setShowFilter: (arg: boolean) => void;
};

const TemplateEightFilterBar: React.FC<props> = ({
  totalCount,
  showSortMenu,
  sortProductJson,
  sortOpenHandler,
  sortingType,
}) => {
  const router = useRouter();
  useEffect(() => {
    sortOpenHandler(false);
  }, [router.asPath]);
  return (
    <div className='relative z-10 bg-white px-[10px] mt-[20px] lg:mt-[0px]'>
      <h2 id='filter-heading' className='sr-only'>
        Filters
      </h2>
      <div className='relative py-3'>
        <div className='flex flex-wrap gap-y-6 text-default-text'>
          <div className='w-full md:w-1/3 flex justify-center lg:justify-start flex-wrap items-center'>
            <span className='text-small-text'>
              Total
              <span className='font-semibold text-sm ml-1'>
                {totalCount} Results
              </span>
            </span>
          </div>

          <div className='w-full md:w-2/3'>
            <div className='flex justify-center md:justify-end max-w-7xl mx-auto pl-[16px] sm:pl-[24px] lg:pl-[32px] z-40'>
              <div className='flex items-center'>
                <div className='relative inline-block text-left'>
                  <div className='flex items-center gap-2'>
                    <span>Sort </span>
                    <button
                      onClick={() => sortOpenHandler(!showSortMenu)}
                      type='button'
                      className='group inline-flex items-center justify-between text-small-text text-[#ffffff] bg-secondary w-[200px] md:w-[245px] pl-[8px] pt-[4px] pb-[4px] pr-[4px]'
                    >
                      <span>
                        {
                          SortingMethod.find(
                            (method) => method.type === sortingType,
                          )?.name
                        }
                      </span>
                      <span className='material-icons-outlined text-lg leading-none'>
                        add_circle
                      </span>
                    </button>
                  </div>
                  <div
                    className='origin-top-right absolute right-0 mt-[0px] w-[200px] md:w-[245px] border border-primary bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none'
                    style={{ display: showSortMenu ? 'unset' : 'none' }}
                  >
                    <div className='pt-[4px] pb-[4px]' x-ref='options'>
                      {SortingMethod.map((method) => (
                        <button
                          key={method.type}
                          onClick={() => {
                            sortProductJson(method.type);
                          }}
                          type='button'
                          className={
                            'w-full text-left pl-[8px] pt-[4px] pb-[4px] text-sm flex items-center gap-[8px] text-[#000000] text-normal-text'
                          }
                        >
                          <span
                            className={`material-icons-outlined text-sm ${
                              sortingType === method.type ? '' : 'opacity-0'
                            }`}
                          >
                            check
                          </span>
                          <span>{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEightFilterBar;
