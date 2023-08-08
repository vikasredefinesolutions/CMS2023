import { _Store_CODES } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _CategorySiteMap } from '@templates/siteMap/siteMapTypes';
import Link from 'next/link';
import React from 'react';
import Sub_MenuItemsSiteMap from './Sub_MenuItemsSiteMap';

interface _props {
  subRow: _CategorySiteMap[];
}

interface _props_brands {
  brandsList: {
    brandName: string;
    brandCollectionUrl: string;
    seName: string;
  }[];
}

const MenuItemsSiteMap: React.FC<_props> = ({ subRow }) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  return (
    <ul className='relative before:bg-default before:w-px before:absolute before:left-[-20px] before:top-2.5 before:bottom-2.5'>
      {subRow.map((el, index) => {
        return (
          <li
            key={index}
            className='relative ml-[35px] before:bg-default before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
          >
            <Link href={el.sename}>
              <a
                className={`${
                  storeCode === _Store_CODES.UNITi
                    ? 'Primary-link hover:primary-link before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'
                    : 'text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'
                }`}
              >
                {el.name}
              </a>
            </Link>
            {el.subRows.length > 0 ? (
              <Sub_MenuItemsSiteMap subRow={el.subRows} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
  //   return <>{JSON.stringify(subRow)}</>;
};

export const MenuItemsSiteMap_Brands: React.FC<_props_brands> = ({
  brandsList,
}) => {
  return (
    <ul className='pl-[20px] mt-[30px] mb-[30px] relative before:bg-gray-border before:w-px before:absolute before:left-0 before:top-2.5 before:bottom-2.5'>
      {brandsList.map((el, index) => {
        return (
          <li
            key={index}
            className='relative ml-[35px] before:bg-gray-border before:h-px before:w-[42px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
          >
            <Link
              href={`${
                el?.brandCollectionUrl ? el?.brandCollectionUrl : el.seName
              }.html`}
              className='text-[#415364] hover:text-[#7bc24e] before:absolute before:bg-[#415364] before:rounded-full before:w-[6px] before:h-[6px] before:mr-3 before:mt-2 before:ml-[-14px] before:inline-block'
            >
              <a className='ml-[20px] relative text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:top-[6px] before:left-[-14px] before:inline-block'>
                {el.brandName}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuItemsSiteMap;
