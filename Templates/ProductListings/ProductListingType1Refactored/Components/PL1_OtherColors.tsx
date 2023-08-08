import NxtImage from '@appComponents/reUsable/Image';
import { listing_max_showcolors } from '@constants/common.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  GetProductImageOptionList,
  GetlAllProductList,
} from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;
const mediaExtraUrlListingThumbNail =
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_LISTING_THUMBNAIL;

interface _Props {
  product: GetlAllProductList;
  currentProduct: GetProductImageOptionList;
  setMainImageUrl: Dispatch<SetStateAction<string>>;
  setCurrentProduct: Dispatch<SetStateAction<GetProductImageOptionList>>;
}

const PL1_OtherColors: React.FC<_Props> = ({
  product,
  currentProduct,
  setMainImageUrl,
  setCurrentProduct,
}) => {
  let flag: boolean = false;
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  const store = useTypedSelector_v2((state) => state.store);
  mediaBaseUrl = mediaBaseUrl || store.mediaBaseUrl;
  const getProductsColorCount = () => {
    if (isAttributeSaparateProduct && product.splitproductList) {
      return product.splitproductList?.length - listing_max_showcolors + 1;
    } else if (product?.getProductImageOptionList) {
      return product.getProductImageOptionList.length - listing_max_showcolors;
    }
    return '';
  };

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

  return (
    <ul
      role='list'
      className='flex flex-wrap items-center mt-[12px] justify-center space-x-1'
    >
      {isAttributeSaparateProduct &&
      product.splitproductList &&
      product?.splitproductList?.length > 0 ? (
        <>
          <Link key={product.id} href={`/${product.sename}.html`}>
            <li
              className={`w-[28px] h-[28px] border-2 border-secondary hover:border-secondary cursor-pointer`}
            >
              <NxtImage
                src={currentProduct?.imageName}
                alt=''
                className='max-h-full m-auto'
                title={currentProduct?.colorName}
                extraUrlPath={mediaExtraUrlListingThumbNail}
                extraUrl={true}
              />
            </li>
          </Link>

          {product?.splitproductList?.map((subRow, index) =>
            index < listing_max_showcolors - 1 ? (
              <Link
                key={`${index}_${subRow.prodcutId}`}
                href={`/${subRow.seName}.html`}
              >
                <li
                  className={`w-[28px] h-[28px]  border-2 hover:border-light-gray cursor-pointer`}
                  onMouseOver={() => setMainImageUrl(subRow.imageurl)}
                  onMouseLeave={() =>
                    setMainImageUrl(
                      currentProduct?.imageName
                        ? currentProduct?.imageName
                        : '',
                    )
                  }
                >
                  <NxtImage
                    src={subRow?.imageurl || null}
                    alt=''
                    className='max-h-full m-auto'
                    title={subRow.colorName}
                    extraUrl={true}
                    extraUrlPath={mediaExtraUrlListingThumbNail}
                  />
                </li>
              </Link>
            ) : (
              <>{(flag = true)}</>
            ),
          )}
        </>
      ) : (
        product.getProductImageOptionList &&
        product.getProductImageOptionList.map((subRow, index) =>
          index < listing_max_showcolors ? (
            <li
              className={`w-7 h-7 border-2 hover:border-light-gray cursor-pointer ${
                subRow.id === currentProduct?.id
                  ? ' border-secondary'
                  : 'border-light-gray'
              }`}
              onMouseOver={() => setMainImageUrl(subRow?.imageName ?? '')}
              onMouseLeave={() =>
                setMainImageUrl(
                  currentProduct?.imageName ? currentProduct?.imageName : '',
                )
              }
              onClick={() => {
                colorChangeHandler(
                  product.id,
                  product.sename || '',
                  subRow.colorName,
                );
                setCurrentProduct(subRow);
              }}
              key={`${index}_${subRow.id}`}
            >
              <NxtImage
                src={subRow.imageName || null}
                alt=''
                className='max-h-full m-auto'
                title={subRow.colorName}
                extraUrl={true}
                extraUrlPath={mediaExtraUrlListingThumbNail}
              />
            </li>
          ) : (
            <>{(flag = true)}</>
          ),
        )
      )}
      {flag ? (
        <Link key={product.id} href={`/${product.sename}.html`}>
          <li className='w-[28px] h-[28px] border-2 border-light-gray hover:border-secondary relative cursor-pointer'>
            <span
              className='absolute inset-0 bg-primary text-xs bg-[#003a70] font-semibold flex items-center justify-center text-[#ffffff]'
              title={` See Additional ${getProductsColorCount()} Colors`}
            >
              +{getProductsColorCount()}
            </span>
          </li>
        </Link>
      ) : null}
    </ul>
  );
};

export default PL1_OtherColors;
