/* eslint-disable no-unused-vars */
import { SortingMethod } from '@constants/common.constant';
import React from 'react';

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

const TemplateFourFilterBar: React.FC<props> = ({
  totalCount,
  showSortMenu,
  sortProductJson,
  sortOpenHandler,
  sortingType,
}) => {
  return (
    <>
      <div className='relative z-10 bg-light-gray px-[10px] mt-[20px] lg:mt-[0px]'>
        <div className='relative py-3'>
          <div className='flex flex-wrap gap-y-6 text-default-text'>
            <div className='w-full md:w-1/3 flex justify-center lg:justify-start flex-wrap items-center'>
              <div className='flex-1 flex flex-wrap items-center pr-[4px]'>
                <span>
                  Total{' '}
                  <span className='font-semibold'>{totalCount} Results</span>
                </span>
              </div>
            </div>
            <div className='w-full md:w-2/3'>
              <div className='flex items-center justify-end gap-2'>
                <span className=''>Sort</span>
                <div className='relative w-full max-w-[250px] text-left'>
                  <div className=''>
                    <button
                      type='button'
                      className='group inline-flex items-center justify-between bg-[#ffffff] border border-[#000000] w-full pl-[8px] pt-[4px] pb-[4px] pr-[4px]'
                      id='menu-button'
                      onClick={() =>
                        sortOpenHandler(showSortMenu ? false : true)
                      }
                    >
                      {
                        SortingMethod.find(
                          (method) => method.type === sortingType,
                        )?.name
                      }
                      <span className='material-icons-outlined font-[800]'>
                        add
                      </span>
                    </button>
                  </div>
                  <div
                    className='origin-top-right absolute right-0 mt-[0px] w-full border border-[#000000] border-t-0 bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none'
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
    </>
  );
};

export default TemplateFourFilterBar;
