/* eslint-disable no-unused-vars */
import React from 'react';
import { SortingMethod } from '../../../../constants_v2/common.constant';

import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type _Props = {
  length: number;
};

const PL5_FilterBar: React.FC<_Props> = ({ length }: _Props) => {
  const router = useRouter();
  const { setShowLoader } = useActions_v2();

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

    router.replace({
      query: { ...router.query, ['sort']: type },
    });
    setShowSortMenu(false);
  };

  useEffect(() => {
    setShowSortMenu(false);
  }, [router.asPath]);

  return (
    <div className='relative z-10 bg-light-gray px-[10px] mt-[20px] lg:mt-[0px]'>
      {/* <h2 id='filter-heading' className='sr-only'>
        Filters
      </h2> */}
      <div className='relative py-3'>
        <div className='flex flex-wrap gap-y-6 text-default-text'>
          <div className='w-full md:w-1/3 flex justify-center lg:justify-start flex-wrap items-center'>
            <span className='flex-1 flex flex-wrap items-center pr-[4px]'>
              Total
              <span className='font-medium ml-[2px] inline-block !font-bold'>
                &nbsp;{length} Results
              </span>
            </span>
          </div>

          <div className='w-full md:w-2/3'>
            {/* <div className='flex justify-center md:justify-end max-w-7xl mx-auto pl-[16px] sm:pl-[24px] lg:pl-[32px] z-40'> */}
            <div className='flex items-center justify-end gap-2'>
              <span className=''>Sort </span>
              <div className='relative w-full max-w-[250px] text-left'>
                <div className=''>
                  <button
                    type='button'
                    onClick={() => setShowSortMenu((prev) => !prev)}
                    className='text-small-text group inline-flex items-center justify-between bg-[#ffffff] border border-[#000000] w-full pl-[8px] pt-[4px] pb-[4px] pr-[4px]'
                    id='menu-button'
                  >
                    <span>
                      {
                        SortingMethod.find((method) => method.type === sorting)
                          ?.name
                      }
                    </span>
                    <span className='material-icons-outlined font-[800]'>
                      {/* {!showSortMenu ? 'add' : 'remove'} */}
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
                          'w-full text-left pl-[8px] pt-[4px] pb-[4px] flex items-center gap-[8px] text-tertiary'
                        }
                      >
                        <span
                          className={`material-icons-outlined text-sm ${
                            sorting === method.type ? '' : 'opacity-0'
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PL5_FilterBar;
