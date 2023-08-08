import { _Store_CODES } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import React from 'react';
import { _Sitemap_ExpectedProps } from '../siteMapTypes';
import MenuItemsSiteMap, {
  MenuItemsSiteMap_Brands,
} from './components/MenuItemsSiteMap';

const SiteMap_Type1: React.FC<_Sitemap_ExpectedProps> = ({
  brandItems,
  categories,
  pageSiteMap,
}) => {
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  if (!brandItems) {
    return <>No data found</>;
  }

  return (
    <>
      {/* {pageSiteMap?.length || categories?.length ? ( */}
      <div className='container mx-auto'>
        <div className='bg-white pt-6 pb-6'>
          <div className='text-2xl-text text-center mb-[10px]'>Category</div>
          <div className='pl-[20px] text-sm tracking-[1.4px]'>
            <ul className='relative before:bg-default before:w-px before:absolute before:left-[-20px] before:top-2.5 before:bottom-2.5 sitemap-links'>
              {/* {brandItems && (
                  <li
                    key={`brand`}
                    className='relative ml-[35px] before:bg-default before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
                  >
                    <Link href={'/brands'}>
                      <a className='text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'>
                        {'Brands'}
                      </a>
                    </Link>
                    <MenuItemsSiteMap_Brands brandsList={brandItems} />
                  </li>
                )} */}
              {pageSiteMap?.map((topicpage, index) => {
                return topicpage.name == 'Brands' ? (
                  <>
                    <li
                      className='relative ml-[35px] before:bg-default before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
                      key={index}
                    >
                      <Link href={`${topicpage.slug}.html`}>
                        <a
                          title={topicpage.name}
                          className='text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'
                        >
                          {topicpage.name}
                        </a>
                      </Link>
                      <MenuItemsSiteMap_Brands brandsList={brandItems} />
                    </li>
                  </>
                ) : (
                  <></>
                );
              })}

              {categories?.map((cat, index) => {
                return (
                  <li
                    className='relative ml-[35px] before:bg-default before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
                    key={index}
                  >
                    <Link href={`${cat.sename}.html`}>
                      <a
                        title={cat.name}
                        className={`${
                          storeCode === _Store_CODES.UNITi
                            ? 'Primary-link hover:primary-link before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'
                            : 'text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'
                        }`}
                      >
                        {cat.name}
                      </a>
                    </Link>
                    {cat.subRows.length > 0 ? (
                      <MenuItemsSiteMap subRow={cat.subRows} />
                    ) : null}
                  </li>
                );
              })}

              {/* {pageSiteMap.map((topicpage, index) => {
                  return (
                    topicpage.name != 'Brands' ? <>
                    <li
                      className='relative ml-[35px] before:bg-default before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
                      key={index}
                    >
                      <Link href={`${topicpage.slug}.html`}>
                        <a title={topicpage.name} className='text-default hover:text-tertiary before:absolute before:bg-default before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'>
                          {topicpage.name}
                        </a>
                      </Link>
                    </li>
                    </> : <></>
                  );
                })} */}
            </ul>
          </div>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
};

export default SiteMap_Type1;
