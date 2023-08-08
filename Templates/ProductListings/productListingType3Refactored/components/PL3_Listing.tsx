import React, { Fragment, useEffect, useRef, useState } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import { _NameValuePairs } from '@controllers/slug.extras';
import { ProductList } from '@definations/productList.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _ListingPageProduct } from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';
import PL3_Product from './PL3_Product';
interface _Props {
  pageId: number;
  list: {
    visible: _ListingPageProduct[];
    jumpBy: number;
    currentPage: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
  };
  brandOrCategory: string;
}

const PL3_Listing: React.FC<_Props> = ({ brandOrCategory, pageId, list }) => {
  const router = useRouter();
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setShowLoader, update_ListingProperties } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const productView = useTypedSelector_v2((state) => state.listing.listingView);

  const [skuList, setSkuList] = useState<string | []>([]);
  const [products, setVisibleProducts] = useState<{
    visible: ProductList;
    jumpBy: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
    //
    totalPages: number;
    currentPage: number;
    count: number;
  }>({
    ...list,
    currentPage: 1,
    count: list.totalAvailable,
    totalPages: 1,
  });

  const handleScroll = () => {
    let x = document.querySelector('#loadmore');
    if (x instanceof HTMLElement) {
      if (
        window.pageYOffset + document.documentElement.clientHeight >=
        x?.offsetTop
      ) {
        if (buttonRef.current) {
          // buttonRef?.current.click();
        }
      }
    }
  };

  useEffect(() => {
    update_ListingProperties({
      type: 'VISIBLE_PRODUCTS',
      total: list.totalAvailable,
    });

    setVisibleProducts({
      ...list,
      count: list.totalAvailable,
      totalPages: 1,
      currentPage: 1,
    });
  }, [list]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='mt-[32px] relative'>
      <div className='relative w-full pb-[24px] mb-[-24px]'>
        <ul
          role='list'
          className={
            productView === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-[32px]'
              : 'grid grid-cols-1 gap-6 lg:gap-8 mb-8'
          }
        >
          {products.visible.map((product, index) => (
            <Fragment key={product.id}>
              <PL3_Product
                seType={brandOrCategory}
                pageId={pageId}
                product={product}
                skuList={skuList}
                setSkuList={setSkuList}
              />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PL3_Listing;
