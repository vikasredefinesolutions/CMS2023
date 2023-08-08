import NxtImage from '@appComponents/reUsable/Image';
import { brandname, dimax, maxPeter } from '@constants/enum';
import { _SizePriceQtyTableProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';
import EditInput from './EditInput';
// import SelectOrInput from './SelectOrInput';
// import { _SizePriceQtyTableProps } from './productDetailsComponents';
const SizePriceQtyTable4: React.FC<_SizePriceQtyTableProps> = ({
  editDetails,
  isSpecialBrand,
  brandName,
}) => {
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const { color } = useTypedSelector_v2((state) => state.product.selected);
  const view = useTypedSelector_v2((state) => state.store.view);

  return (
    <div className='mt-[15px] text-default-text border border-gray-border'>
      <div className='hidden md:flex flex-wrap gap-y-5 bg-primary text-white'>
        <div className='p-2 w-full md:w-2/12'>
          <div className='font-semibold'>Color</div>
        </div>
        <div
          className={`grid grid-cols-${inventory?.sizes[0]?.sizeArr.length} text-center gap-y-5 w-full md:w-10/12`}
        >
          {inventory?.sizes.map((product) => {
            if (product.colorAttributeOptionId === color.attributeOptionId) {
              return product.sizeArr.map((size, index) => (
                <div key={index} className={` p-2 md:w-full w-2/12`}>
                  <div className='font-semibold'>{size}</div>
                </div>
              ));
            }
            return <></>;
          })}
        </div>
      </div>
      <div
        key={color.attributeOptionId}
        className='flex flex-wrap gap-y-5 border-b last:border-b-0 border-b-gray-300 mb-5 md:mb-0  bg-light-gray'
      >
        <div className='p-2 w-full md:w-2/12 text-center md:text-left'>
          <div className='mb-1 text-center w-10 h-10 mx-auto md:m-0 border-gray-300 p-1 bg-white'>
            <NxtImage
              title={`${color.name}`}
              src={color.imageUrl}
              alt={color.altTag}
              className='max-w-[70px] max-h-[70px]  cursor-pointer'
            />
          </div>
          <div className=''>{color.name}</div>
        </div>
        <div
          className={`flex flex-wrap md:grid md:grid-cols-${inventory?.sizes[0]?.sizeArr.length} justify-evenly text-center gap-y-5 w-full md:w-10/12 tesingclassname`}
        >
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

              return inventory?.inventory > 0 ? (
                <div className='p-2 w-1/2 md:w-auto'>
                  <div className='mb-1 font-semibold md:hidden'>
                    {inventory.name}
                  </div>
                  <div>
                    {brandName == brandname ? (
                      <div className='mb-2'>
                        {inventory.inventory < maxPeter
                          ? inventory.inventory
                          : `${maxPeter}+`}
                      </div>
                    ) : (
                      <div className='mb-2'>
                        {inventory.inventory < dimax
                          ? inventory.inventory
                          : `${dimax}+`}
                      </div>
                    )}
                  </div>
                  <EditInput
                    sizeAttributeOptionId={inventory.attributeOptionId}
                    qty={inventory?.inventory || 0}
                    size={inventory.name}
                    price={
                      price ? price : { msrp: 0, salePrice: 0, ourCost: 0 }
                    }
                    defaultQty={defaultQty}
                    isSpecialBrand={isSpecialBrand}
                  />
                </div>
              ) : (
                <div
                  className={`${
                    view == 'MOBILE' ? '' : 'justify-center flex items-center'
                  } p-2  w-1/2 md:w-auto`}
                >
                  {view == 'MOBILE' && (
                    <div className='mb-1 font-semibold md:hidden'>
                      {inventory.name}
                    </div>
                  )}
                  <div className='border-bottom p-b-10'>
                    <strong className=''> - </strong>{' '}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SizePriceQtyTable4;
