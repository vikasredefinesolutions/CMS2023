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
  const isklaviyoSearch = klaviyosearchStoreCodeArray.includes(storeCode);

  const [searchProductList, setSearchProductList] = useState<
    searchproduct[] | []
  >([]);
  
  useEffect(() => {
    if (!isklaviyoSearch && storeId && router.query.q) {
      const payload = {
        contant: router.query.q ? (router.query.q as string) : '',
        storeId: storeId,
      };
      
      if(storeCode !== 'CG' && storeCode !== 'GG' && storeCode !== 'PKHG' && storeCode === 'DI')
      {
        let x = document.querySelector("searchResults");
        if(x)
        {
          document.querySelectorAll("#searchResults")[0].classList.remove("hidden");
        }
      }
      FetchCustomSearch(payload).then((res: any) => {
        setSearchProductList(res);
      });
    }
  }, [isklaviyoSearch, router.query.q, storeId]);
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
};

export default SearchPageResult;
