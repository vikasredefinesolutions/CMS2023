import { __pagesText } from '@constants/pages.text';
import Price from 'appComponents_v2/reUsable/Price';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';
import SelectOrInput from './SelectOrInput';
import { _SizePriceQtyTableProps } from './productDetailsComponents';
const SizePriceQtyTable: React.FC<_SizePriceQtyTableProps> = ({
  editDetails,
  isSpecialBrand,
  brandName,
}) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  // console.log(
  //   editDetails,
  //   customerId,
  //   isSpecialBrand,
  //   editDetails.length,
  //   'editDetails',
  // );
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );

  const { price: discountedPrice } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );

  const { color } = useTypedSelector_v2((state) => state.product.selected);

  return (
    <div className=''>
      <div className='overflow-x-auto max-h-screen'>
        <table
          cellPadding='0'
          cellSpacing='0'
          className='table-auto w-full text-center text-[#191919] text-medium-text'
        >
          <thead className='font-[600] border-b border-neutral-200 text-medium-text'>
            <tr className=''>
              <th className='px-2 py-4 w-32'>
                <div className=''>
                  {' '}
                  {__pagesText.productInfo.startOrderModal.sizePriceQty.size}
                </div>
              </th>
              <th className='px-2 py-4 w-32'>
                <div className=''>
                  {' '}
                  {__pagesText.productInfo.startOrderModal.sizePriceQty.price}
                </div>
              </th>
              <th className='px-2 py-4 w-32 text-left'>
                <div className=''>
                  {' '}
                  {__pagesText.productInfo.startOrderModal.sizePriceQty.qty}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-200' key={editDetails.length}>
            {inventory?.inventory

              .filter(
                (res) => res.colorAttributeOptionId === color.attributeOptionId,
              )

              .map((inventory) => {
                let defaultQty = 0;
                const qtyObj = editDetails.find(
                  (option) => option.optionValue === inventory.name,
                );
                if (qtyObj) {
                  defaultQty = qtyObj.qty;
                }

                return (
                  <tr className='' key={inventory.name}>
                    <td className='px-2 py-4'>
                      <div className=''>{inventory.name}</div>
                    </td>

                    <td className='px-2 py-4'>
                      <div className=''>
                        <Price
                          value={
                            isSpecialBrand &&
                            !customerId &&
                            editDetails.length > 0
                              ? editDetails[0]?.price / editDetails[0]?.qty
                              : discountedPrice
                          }
                        />
                      </div>
                    </td>

                    <SelectOrInput
                      sizeAttributeOptionId={inventory.attributeOptionId}
                      qty={inventory?.inventory || 0}
                      size={inventory.name}
                      price={
                        price ? price : { msrp: 0, salePrice: 0, ourCost: 0 }
                      }
                      defaultQty={defaultQty}
                      isSpecialBrand={isSpecialBrand}
                      brandName={brandName}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizePriceQtyTable;
