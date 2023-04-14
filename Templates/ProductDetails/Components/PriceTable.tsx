import { __pagesText } from '@constants/pages.text';
import { SubRow } from '@definations/APIs/discountTable.res';
import { FetchDiscountTablePrices } from '@services/product.service';
import Price from 'appComponents_v2/reUsable/Price';
import { c_getSeName } from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect } from 'react';

const QtyPriceTable: React.FC<{ storeCode: string }> = ({ storeCode }) => {
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
        customerId: customerId,
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
        <div className='bg-gray-100 flex flex-wrap text-center border border-gray-300 text-sm'>
          <div className='hidden md:block text-left md:w-1/6'>
            <div className='p-1 px-2 border-b border-gray-300 font-semibold'>
              {__pagesText.productInfo.quantity}
            </div>
            <div className='p-1 px-2 border-gray-300 font-semibold'>
              {__pagesText.productInfo.price}
            </div>
          </div>

          <div className='flex flex-wrap text-center grow md:w-5/6'>
            {discounts?.subRows?.map((column) => {
              return (
                <div className='md:w-1/6' key={column.discountPrice}>
                  <div className='p-1 px-2 border-b border-gray-300'>
                    {column.displayQuantity}
                  </div>
                  <div className='p-1 px-2'>
                    <Price value={column.discountPrice} />
                  </div>
                </div>
              );
            })}

            {discounts?.subRows &&
              fillEmptySpaces(discounts.subRows)?.map((elem, index) => {
                return (
                  <div className='md:w-1/6' key={index}>
                    <div className='p-1 px-2 border-b border-gray-300'>
                      &nbsp;
                    </div>
                    <div className='p-1 px-2'></div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default QtyPriceTable;
