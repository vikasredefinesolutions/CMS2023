import { __LocalStorage } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

const CompareIcon: React.FC = () => {
  const [skus, setSkus] = useState([]);
  const router = useRouter();
  const storeLayout = useTypedSelector_v2((state) => state.store.layout);

  const comparePageURL = () => {
    if (skus.length > 0) {
      return `${paths.PRODUCT_COMPARE}?SKU=${skus.toString()}`;
    }
    return '';
  };

  const goToComparePage = () => {
    if (skus.length > 0) {
      const URL = comparePageURL();
      router.push(URL);
      return;
    }
  };

  const updateSkuCount = () => {
    if (localStorage) {
      setTimeout(() => {
        const skuString = localStorage.getItem(__LocalStorage.compareProducts);
        const _skus = skuString ? JSON.parse(skuString) : [];
        setSkus(() => _skus);
      }, 200);
    }
  };

  useEffect(() => {
    updateSkuCount();
    setTimeout(() => {
      document.addEventListener('itemInserted', updateSkuCount, false);
      document.addEventListener('itemRemoved', updateSkuCount, false);
    }, 1000);
    return document.removeEventListener('itemInserted', updateSkuCount, false);
  }, []);

  return (
    <>
      <div className='flex pl-[8px]'>
        <button
          onClick={() => goToComparePage()}
          className='text-quaternary flex items-center relative pt-[5px] pb-[5px]'
        >
          <span className='sr-only'>Compare</span>
          <span className='inline-flex items-center justify-center w-[35px] h-[35px]'>
            {/*  img link */}

            <i className='fa-solid fa-shuffle text-xl'></i>
          </span>
          <span className='absolute right-[-7px] top-[-1px] rounded-full flex items-center justify-center bg-secondary text-[9px] text-[#000000] pl-[4px] pr-[4px] pt-[2px] pb-[2px]'>
            {skus.length}
          </span>
        </button>
      </div>
    </>
  );
};

export default CompareIcon;
