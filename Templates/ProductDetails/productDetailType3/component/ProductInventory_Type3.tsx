// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
import SizeQtyInput from './SizeQtyInput';

const Inventory_Type3: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
}> = ({ storeCode, attributeOptionId }) => {
  const [selectSize, setSelectSize] = useState('');
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );

  const { updatePrice } = useActions_v2();

  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price?.msrp]);

  return (
    <>
      <div className='flex flex-wrap mb-[15px]'>
        <div className='w-[128px] text-sm items-center'>
          <span className='text-sm font-semibold'>Size:</span>
        </div>
        <div className='text-sm flex flex-wrap items-center gap-1'>
          {inventory?.inventory
            .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
            .map((elem) => {
              return (
                <>
                  <button
                    type='button'
                    onClick={() => {
                      setSelectSize(elem.name);
                    }}
                    className={`border border-gray-border h-[32px] w-[32px] flex items-center justify-center cursor-pointers ${
                      selectSize === elem.name && 'border-secondary'
                    }  ${
                      elem.inventory ? 'hover:border-secondary' : 'opacity-50'
                    } `}
                    disabled={!elem.inventory ? true : false}
                  >
                    {elem.name}
                  </button>
                </>
              );
            })}

          {/* <div className='flex flex-wrap items-center bg-light-gray py-[5px] mb-[10px]'>
        <div className='px-[15px] w-1/3'>Size</div>
        <div className='px-[15px] w-1/3 text-center'>Availability</div>
        <div className='px-[15px] w-1/3 text-right'>QTY.</div>
      </div>
      {inventory?.inventory
        .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
        .map((elem) => {
          return elem.inventory ? (
            <InventoryAvailability_Type3
              size={elem.name}
              qty={elem.inventory}
              price={price?.msrp || 0}
              attributeOptionId={elem.attributeOptionId}
            />
          ) : (
            <OutOfStockComponent_Type3 elem={elem} />
          );
        })} */}

          {/* <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
        <div className='w-1/3 pt-[10px] pb-[10px]'>3XL</div>
        <div className='w-1/3 pt-[10px] pb-[10px] text-center text-red-700 font-[600]'>
          OUT OF STOCK
        </div>
        <div className='w-1/3 pt-[10px] pb-[10px] text-right'>-</div>
      </div> */}
        </div>
      </div>
      <SizeQtyInput price={price?.msrp} size={selectSize} />
    </>
  );
};

export default Inventory_Type3;
