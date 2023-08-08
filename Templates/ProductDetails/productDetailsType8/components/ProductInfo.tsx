import Price from '@appComponents/Price';
// import StartOrderModal from '@appComponents/modals/startOrderModal/startOrderModal';
import { __pagesText } from '@constants/pages.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDetails } from '@definations/APIs/productDetail.res';

import AvailableColorsType8 from '@templates/ProductDetails/productDetailsType8/components/AvailableColorsType8';
import BuyNowHandlerType8 from '@templates/ProductDetails/productDetailsType8/components/BuyNowHandlerType8';
import Inventory_Type8 from '@templates/ProductDetails/productDetailsType8/components/ProductInventory_Type8';
import SizeQtyInputType8 from '@templates/ProductDetails/productDetailsType8/components/SizeQtyInput';
import React, { useState } from 'react';

interface _Props {
  details: _ProductDetails;
  colors: _ProductColor[];
  activeColor: _ProductColor;
  setActiveColor: React.Dispatch<React.SetStateAction<_ProductColor>>;
}

interface _SelectedSizeQty {
  colorAttributeOptionId: number; // colorId,
  totalQty: number;
  size: string;
  sizeAttributeOptionId: number;
  minQty: number;
  stockAvailable: boolean;
}

const ProductInfo: React.FC<_Props> = ({
  details: product,
  activeColor,
  colors,
  setActiveColor,
}) => {
  const [selectedSizeQty, setSelectedSizeQty] = useState<_SelectedSizeQty>({
    colorAttributeOptionId: 0,
    totalQty: 0,
    size: '',
    minQty: 0,
    sizeAttributeOptionId: 0,
    stockAvailable: true,
  });

  const numbers = {
    totalQty: selectedSizeQty.totalQty,
    grandTotal: selectedSizeQty.totalQty * product.salePrice,
  };

  const priceToShow = () => {
    if (numbers.grandTotal === 0) {
      return product?.salePrice || 0;
    }

    return numbers.grandTotal;
  };

  return (
    <div className='col-span-1 mt-[15px] pl-[8px] pr-[8px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
      <div className='hidden md:flex flex-wrap'>
        <div className='w-full'>
          <h1 className='font-[600] text-large-text'>{product.name}</h1>
        </div>
        <div className='w-full'>
          <div className=''>
            <div className='pt-[3px] text-default-text'>
              <span className='font-[600] inline-block w-[43px]'>SKU</span>
              <span>:</span> <span className='ml-[4px]'>{product.sku}</span>
            </div>
          </div>
        </div>
      </div>
      <AvailableColorsType8
        selectedColor={activeColor}
        setSelectedColor={setActiveColor}
        colors={colors}
      />
      <Inventory_Type8
        productId={activeColor.productId}
        attributeOptionId={activeColor.attributeOptionId}
        selectedSizeQty={selectedSizeQty}
        setSelectedSizeQty={setSelectedSizeQty}
      />
      <SizeQtyInputType8
        selectedSizeQty={selectedSizeQty}
        setSelectedSizeQty={setSelectedSizeQty}
      />
      <div className='m-[10px] mt-[18px]'>
        <div className='mb-[12px] text-title-text'>
          {__pagesText.productInfo.description}
        </div>
        <div
          className={`relative text-sm text-default-text div_description transition-all`}
        >
          <div
            className=''
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        </div>
      </div>
      <div>
        <div className={`p-[10px] mb-[20px]`}>
          <div
            className={`
             text-default-text
          flex flex-wrap items-center`}
          >
            <div
              className={`
               mr-[20px]
               w-[112px]`}
            >
              <span className=''>You Pay</span>
            </div>
            <div className=''>
              <span className='text-2xl tracking-wider'>
                <Price value={priceToShow()} />
              </span>
            </div>
          </div>
          <div className='w-full text-left flex justify-end mt-[10px]'>
            <BuyNowHandlerType8
              details={product}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              selectedSizeQty={selectedSizeQty}
              setSelectedSizeQty={setSelectedSizeQty}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
