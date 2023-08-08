import SearchProductCard from '@appComponents/reUsable/SearchProduct';
import { _Store_CODES } from '@constants/global.constant';
import { klaviyosearchStoreCodeArray } from '@constants/pages.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCustomSearch } from '@services/product.service';
import { searchproduct } from '@services/product.service.type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const SearchPageResult: NextPage = () => {
  const router = useRouter();
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [searchProductList, setSearchProductList] = useState<
    searchproduct[] | []
  >([]);
  const isklaviyoSearch = klaviyosearchStoreCodeArray.includes(storeCode);

  useEffect(() => {
    if (!isklaviyoSearch && storeId && router.query.q) {
      const payload = {
        contant: router.query.q ? (router.query.q as string) : '',
        storeId: storeId,
      };

      let x = document.querySelector('searchResults');
      if (x) {
        document
          .querySelectorAll('#searchResults')[0]
          .classList.remove('hidden');
      }
      FetchCustomSearch(payload).then((res: any) => {
        setSearchProductList(res);
      });
    }
  }, [isklaviyoSearch, router.query.q, storeId]);
  if (isklaviyoSearch) {
    return (
      <>
        <div className='container mx-auto pb-[20px]'>
          <div className='flex flex-wrap gap-1 items-center max-w-5xl mx-auto hidden'>
            <strong>Search:</strong>
            <form action='#' className='grow'>
              <input
                id='txtSearch'
                name='q'
                type='text'
                className='border border-gray-border outline-none w-full focus:ring-0 text-[14px] tracking-[1px] text-primary h-[26px]'
              />
            </form>
          </div>
          <div className='klevuLanding'></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
          <section className=''>
            <div className='container  mx-auto'>
              <div className='bg-white pl-[15px] pr-[15px]'>
                <div className='flex flex-wrap items-center'>
                  <div className='w-full'>
                    <div className=''>
                      <div className='text-2xl-text py-[15px]'>
                        Search Result
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id=''>
          <div className=''>
            <div className='container pl-[15px] pr-[15px] mx-auto'>
              <div aria-labelledby='products-heading' className=''>
                <h2 id='products-heading' className='sr-only'>
                  Products
                </h2>
                <div className=' flex flex-wrap ml-[-15px] mr-[-15px]'>
                  <div className='w-full pl-[15px] pr-[15px]'>
                    <div className='relative z-10 bg-[#ffffff] px-[15px]'>
                      <h2 id='filter-heading' className='sr-only'>
                        Filters
                      </h2>
                      {storeCode !== _Store_CODES.USAAHEALTHYPOINTS && (
                        <div className='relative py-3'>
                          <div className='flex flex-wrap gap-y-6 text-default-text'>
                            <div className='w-full md:w-1/3 flex lg:justify-start flex-wrap items-center'>
                              <span className='text-small-text'>
                                Total{' '}
                                <span className='font-semibold text-sm'>
                                  {searchProductList.length}{' '}
                                  {searchProductList.length > 1
                                    ? 'Results'
                                    : 'Result'}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='relative bg-white' id='gridview'>
                      {searchProductList.length > 0 ? (
                        <div className='relative w-full pb-[24px]'>
                          <ul
                            role='list'
                            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-[32px] px-[15px]'
                          >
                            {searchProductList.map((productData) => {
                              return (
                                <li
                                  className='text-center flex bg-[#ffffff]'
                                  key={productData.id}
                                >
                                  <SearchProductCard product={productData} />
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        <div
                          className='mb-[32px] relative z-10 bg-[#ffffff] px-[10px] mt-[20px] lg:mt-[0px] flex flex-wrap gap-y-6 text-default-text justify-center hidden'
                          id='searchResults'
                        >
                          <span className='font-semibold text-sm py-3'>
                            Sorry, No Result(s) Found
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default SearchPageResult;
