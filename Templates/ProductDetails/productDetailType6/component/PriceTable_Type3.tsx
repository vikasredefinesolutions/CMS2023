// import Price from '@appComponents/reUsable/Price';
// import { __pagesText } from '@constants/pages.text';
// import { SubRow } from '@definations/APIs/discountTable.res';
// import { FetchDiscountTablePrices } from '@services/product.service';
// import { c_getSeName } from 'helpers_v2/common.helper';
// import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';

import Price from '@appComponents/Price';
import { __pagesText } from '@constants/pages.text';
import { SubRow } from '@definations/APIs/logo.res';
import { c_getSeName } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchDiscountTablePrices } from '@services/product.service';
import { useEffect } from 'react';

// import React, { useEffect } from 'react';
const QtyPriceTable_Type3: React.FC<{ storeCode: string }> = ({
  storeCode,
}) => {
  const { product_storeData } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { discounts } = useTypedSelector_v2((state) => state.product.product);

  const fillEmptySpaces = (arr: SubRow[]): 'empty'[] | null => {
    return arr.length < 6
      ? new Array(6 - arr.length).fill('empty')
      : arr.length >= 7 && arr.length < 12
      ? new Array(12 - arr.length).fill('empty')
      : null;
  };

  useEffect(() => {
    if (storeId && customerId && selectedColor) {
      FetchDiscountTablePrices({
        storeId: storeId,
        seName: selectedColor.productSEName
          ? selectedColor.productSEName
          : c_getSeName('PRODUCT DETAILS'),
        customerId: customerId ? customerId : 0,
        attributeOptionId: selectedColor.attributeOptionId,
      }).then((res) =>
        product_storeData({
          type: 'DISOCUNT_TABLE_PRICES',
          data: res,
        }),
      );
    }
  }, [customerId, selectedColor.attributeOptionId]);

  return (
    <>
      {customerId !== null && (
        <div className='pt-[15px] text-default-text font-medium'>
          <div className='bg-light-gray py-[5px] text-center'>
            {__pagesText.productInfo.quantity}
          </div>
          <div className='flex flex-wrap justify-center items-center border border-gray-border text-center p-[10px] md:divide-x md:divide-gray-border gap-y-[10px]'>
            {discounts?.subRows?.map((column) => {
              return (
                <div
                  className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'
                  key={column.discountPrice}
                >
                  <div className='px-[10px]'>
                    <div className=''>{column.displayQuantity}</div>
                    <div className=''>
                      <Price value={column.discountPrice} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        // <div className='bg-gray-100 flex flex-wrap text-center border border-gray-300 text-sm'>
        //   <div className='hidden md:block text-left md:w-1/6'>
        //     <div className='p-1 px-2 border-b border-gray-300 font-semibold'>
        //       {__pagesText.productInfo.quantity}
        //     </div>
        //     <div className='p-1 px-2 border-gray-300 font-semibold'>
        //       {__pagesText.productInfo.price}
        //     </div>
        //   </div>

        //   <div className='flex flex-wrap text-center grow md:w-5/6'>
        //     {discounts?.subRows?.map((column) => {
        //       return (
        //         <div className='md:w-1/6' key={column.discountPrice}>
        //           <div className='p-1 px-2 border-b border-gray-300'>
        //             {column.displayQuantity}
        //           </div>
        //           <div className='p-1 px-2'>
        //             <Price value={column.discountPrice} />
        //           </div>
        //         </div>
        //       );
        //     })}

        //     {discounts?.subRows &&
        //       fillEmptySpaces(discounts.subRows)?.map((elem, index) => {
        //         return (
        //           <div className='md:w-1/6' key={index}>
        //             <div className='p-1 px-2 border-b border-gray-300'>
        //               &nbsp;
        //             </div>
        //             <div className='p-1 px-2'></div>
        //           </div>
        //         );
        //       })}
        //   </div>
        // </div>
      )}
    </>
  );
};

export default QtyPriceTable_Type3;
