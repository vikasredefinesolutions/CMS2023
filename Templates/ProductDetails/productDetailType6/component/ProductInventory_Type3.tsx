// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { useTypedSelector_v2 } from '@hooks_v2/index';
import { Fragment } from 'react';

const Inventory_Type3: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
  setSelectSize: (name: string) => void;
  selectSize: string;
}> = ({ storeCode, attributeOptionId, setSelectSize, selectSize }) => {
  const { inventory } = useTypedSelector_v2((state) => state.product.product);

  return (
    <>
      <div className='flex flex-wrap mb-[15px]'>
        <div className='w-[128px] text-default-text items-center'>
          <span className='text-default-text font-semibold'>Size:</span>
        </div>
        <div className='text-default-text flex flex-wrap items-center gap-1'>
          {inventory?.inventory
            .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
            .map((elem, index) => {
              return (
                <Fragment key={`${elem.inventoryId}${index}`}>
                  <button
                    type='button'
                    onClick={() => {
                      setSelectSize(elem.name);
                    }}
                    className={`border border-gray-border h-[32px] w-[32px] flex items-center justify-center cursor-pointers  ${
                      selectSize === elem.name && 'border-secondary bg-primary'
                    }  ${elem.inventory ? 'hover:bg-primary' : 'opacity-50'} `}
                    disabled={!elem.inventory ? true : false}
                  >
                    {elem.name}
                  </button>
                </Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Inventory_Type3;
