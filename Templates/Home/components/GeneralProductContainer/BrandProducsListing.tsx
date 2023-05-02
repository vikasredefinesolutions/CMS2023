import FeaturedSkeleton from '@appComponents/Loading/Skeleton';
import { newFetauredItemResponse } from '@definations/productList.type';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import BrandProduct from './BrandProduct';

interface _props {
  brandId: number;
  brandsData: newFetauredItemResponse[];
  loading: boolean;
  recentBrand: string;
  totalBrands: { value: number | string; label: string }[];
}

const BrandProductListing: React.FC<_props> = ({
  brandId,
  brandsData,
  loading,
  recentBrand,
  totalBrands,
}) => {
  const colorChangeHandler = (
    productId: number | undefined,
    seName: string | undefined,
    color: string | undefined | null,
  ) => {
    const storageString = localStorage.getItem('selectedProducts');
    const selectedProducts: Array<{
      productId: number | undefined;
      seName: string | undefined;
      color: string | undefined | null;
    }> = storageString ? JSON.parse(storageString) : [];
    const index = selectedProducts.findIndex(
      (product) => product.productId === productId,
    );

    const productObject = {
      productId,
      seName,
      color,
    };

    if (index > -1) {
      selectedProducts[index] = productObject;
    } else {
      selectedProducts.push(productObject);
    }
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  };
  const cacheData = useTypedSelector_v2((state) => state.cache.cacheData);

  return (
    <>
      <div aria-labelledby='products-heading' className=''>
        <div className='relative gridlistview' id='gridview'>
          <div className='relative w-full'>
            <ul
              role='list'
              className={
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] pt-[60px]'
              }
            >
              {cacheData[recentBrand] && !loading
                ? cacheData[recentBrand].map(
                    (product: newFetauredItemResponse, index: number) => (
                      <BrandProduct
                        brandId={brandId}
                        key={index}
                        product={product}
                        colorChangeHandler={colorChangeHandler}
                        style='Flex'
                      />
                    ),
                  )
                : totalBrands.map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <li className='text-center relative border border-gray-200 border-solid'>
                          <FeaturedSkeleton />
                        </li>
                      </React.Fragment>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandProductListing;
