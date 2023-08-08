import React, { Fragment, useEffect, useRef, useState } from 'react';
// import { GetlAllProductList, _ListingProps } from '../productListing';

import NxtImage from '@appComponents/reUsable/Image';
import { Sorting } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { _NameValuePairs } from '@controllers/slug.extras';
import { ProductList } from '@definations/productList.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _ListingPageProduct } from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';
import PL5_Product from './PL5_Product';
interface _Props {
  pageId: number;
  list: {
    visible: _ListingPageProduct[];
    jumpBy: number;
    currentPage: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
    allProducts: ProductList;
  };
  brandOrCategory: string;
}

const PL5_Listing: React.FC<_Props> = ({ brandOrCategory, pageId, list }) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setShowLoader, update_ListingProperties } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const [products, setVisibleProducts] = useState<{
    visible: ProductList;
    jumpBy: number;
    totalAvailable: number;
    filterOptionforfaceteds: _NameValuePairs[];
    allProducts: ProductList;
    totalPages: number;
    currentPage: number;
    count: number;
  }>({
    ...list,
    allProducts: list.allProducts,
    currentPage: list.currentPage,
    count: list.visible.length,
    totalPages: Math.ceil(list.totalAvailable / list.jumpBy),
  });

  const sortProducts = (sortBy: number, products: _ListingPageProduct[]) => {
    return products.sort((pro1, pro2) => {
      if (sortBy === Sorting.Ascending) {
        return pro1.msrp > pro2.msrp ? 1 : -1;
      } else if (sortBy === Sorting.Descending) {
        return pro1.msrp < pro2.msrp ? 1 : -1;
      } else if (sortBy === Sorting.AtoZ) {
        return pro1.name > pro2.name ? 1 : -1;
      } else if (sortBy === Sorting.ZtoA) {
        return pro1.name < pro2.name ? 1 : -1;
      }
      return 1;
    });
  };

  // const loadMore = () => {
  //   if (products.count === products.totalAvailable) return;
  //   setShowLoader(true);
  //   const pageToCall = products.currentPage + 1;

  //   const filter = {
  //     storeID: storeId,
  //     [brandOrCategory === __pageTypeConstant.brand ? 'brandId' : 'categoryId']:
  //       pageId,
  //     customerId: 0,
  //     pageStartindex: products.jumpBy * (pageToCall - 1) + 1,
  //     pageEndindex: products.jumpBy * pageToCall,
  //     filterOptionforfaceteds: products.filterOptionforfaceteds,
  //   };

  //   FetchFiltersJSON(brandOrCategory, filter)
  //     .then((response) => {
  //       if (!response) return null;

  //       const updatedList = [
  //         ...products.visible,
  //         ...response.getlAllProductList,
  //       ];

  //       let totalAvailable = products.totalAvailable;
  //       if ('totalrecords' in response) {
  //         totalAvailable = (response as CategoryFilter).totalrecords;
  //       }

  //       update_ListingProperties({
  //         type: 'VISIBLE_PRODUCTS',
  //         total: updatedList.length,
  //       });

  //       setVisibleProducts((prev) => ({
  //         ...prev,
  //         currentPage: pageToCall,
  //         totalAvailable: totalAvailable,
  //         count: updatedList.length,
  //         totalPages: Math.ceil(totalAvailable / prev.jumpBy),
  //         visible: sortProducts(+(router.query?.sort || 0), updatedList),
  //       }));
  //     })
  //     .catch(() => {})
  //     .finally(() => {
  //       setShowLoader(false);
  //     });
  // };

  const updateList = (pageToCall: number) => {
    setVisibleProducts((prev) => {
      const updateList = prev.allProducts.slice(0, prev.jumpBy * pageToCall);

      return {
        ...prev,
        currentPage: pageToCall,
        count: updateList.length,
        visible: updateList,
      };
    });
  };
  const loadMore = () => {
    if (products.count === products.totalAvailable) return;
    const pageToCall = products.currentPage + 1;
    updateList(pageToCall);
  };

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
      total: list.visible.length,
    });

    setVisibleProducts({
      ...list,
      count: list.visible.length,
      totalPages: Math.ceil(list.totalAvailable / list.jumpBy),
      currentPage: list.currentPage,
    });
  }, [list]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='mt-8 relative'>
      <div className='relative w-full pb-6 -mb-6'>
        <ul
          role='list'
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8`}
        >
          {products.visible.map((product, index) => (
            <Fragment key={product.id}>
              <PL5_Product
                seType={brandOrCategory}
                pageId={pageId}
                product={product}
              />
            </Fragment>
          ))}
        </ul>
      </div>
      <div className='py-[30px] text-center'>
        <div className=''>
          <div className='mb-[15px]'>
            You've seen {products.count} Products out of{' '}
            {products.totalAvailable}
          </div>
          <div className='h-[2px] w-full max-w-[250px] mx-auto bg-[#808080] mt-2'>
            <div
              className='bg-secondary h-full'
              style={{
                width: `${(products.count * 100) / products.totalAvailable}%`,
              }}
            ></div>
          </div>
        </div>

        {products.totalAvailable > products.count && (
          <button
            // type='submit'
            onClick={loadMore}
            className='mt-[15px] btn btn-lg btn-secondary tracking-[1.4px] font-normal w-full max-w-[550px]'
          >
            <span className='inline-block w-[20px] h-[20px]'>
              <NxtImage
                alt=''
                isStatic={true}
                className='max-h-full'
                src='/assets/images/load-more-arrow.gif'
              />
            </span>
            <span className='ml-[20px] mr-[20px]'>
              {__pagesText.productListing.loadMoreButton}
            </span>{' '}
            <span className='inline-block w-[20px] h-[20px]'>
              <NxtImage
                alt=''
                isStatic={true}
                className='max-h-full'
                src='/assets/images/load-more-arrow.gif'
              />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PL5_Listing;
