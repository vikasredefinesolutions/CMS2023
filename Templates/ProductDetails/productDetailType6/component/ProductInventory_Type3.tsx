// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { _Store_CODES } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { Fragment } from 'react';

const Inventory_Type3: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
  setSelectSize: (name: string) => void;
  selectSize: string;
}> = ({ storeCode, attributeOptionId, setSelectSize, selectSize }) => {
  const sCode = useTypedSelector_v2((store) => store.store.code);
  const { inventory } = useTypedSelector_v2((state) => state.product.product);

  return (
    <>
      <div className='flex flex-wrap mb-[15px]'>
        <div className='w-[128px] text-default-text items-center mt-[5px]'>
          <span
            className={`text-default-text font-semibold ${
              sCode === _Store_CODES.USAAHEALTHYPOINTS && '!font-semibold'
            }`}
          >
            Size:
          </span>
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
                    className={
                      sCode === _Store_CODES.USAAHEALTHYPOINTS
                        ? `border  h-[32px] w-[46px] flex items-center justify-center cursor-pointers  ${
                            selectSize === elem.name
                              ? 'border-secondary bg-secondary text-white'
                              : 'border-gray-border bg-light-gray'
                          }  ${
                            elem.inventory
                              ? 'hover:bg-primary hover:text-white'
                              : 'opacity-50'
                          } `
                        : `border h-[32px] w-[32px] flex items-center justify-center cursor-pointers  ${
                            selectSize === elem.name && 'border-secondary'
                          }  ${
                            elem.inventory
                              ? 'hover:border-primary'
                              : 'opacity-50'
                          } `
                    }
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
