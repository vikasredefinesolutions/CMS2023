import { __LocalStorage } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

const CompareIcon: React.FC = () => {
  const [skus, setSkus] = useState([]);
  const router = useRouter();

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
            <img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/icon-compare.png" alt="Compare Products" title="Compare Products" />
          </span>
          <span className='absolute right-[-5px] top-[1px] rounded-full flex items-center justify-center bg-secondary text-[9px] text-[#000000] pl-[4px] pr-[4px] pt-[2px] pb-[2px] leading-[10px]'>
            {skus.length}
          </span>
        </button>
      </div>
    </>
  );
};

export default CompareIcon;
