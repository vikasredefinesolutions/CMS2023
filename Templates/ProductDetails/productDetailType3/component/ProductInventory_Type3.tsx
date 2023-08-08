// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { _Store } from '@configs/page.config';
import { BACARDI } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { Fragment } from 'react';

const Inventory_Type3: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
  setSelectSize: (name: string) => void;
  selectSize: string;
}> = ({ storeCode, attributeOptionId, setSelectSize, selectSize }) => {
  const { inventory } = useTypedSelector_v2((state) => state.product.product);
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  return (
    <>
      <div className='flex flex-wrap mb-[15px]'>
        <div
          className={`w-[128px] ${
            store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
          } items-center`}
        >
          <span
            className={`${
              store_Code == _Store.type6 ? 'text-sm' : ''
            } font-semibold`}
          >
            Size:
          </span>
        </div>
        <div
          className={`${
            store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
          } flex flex-wrap items-center gap-1`}
        >
          {store_Code !== BACARDI ? (
            inventory?.inventory
              .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
              .map((elem, index) => {
                // border  h-[32px] w-[46px] flex items-center justify-center cursor-pointers  border-gray-border bg-light-gray  hover:border-secondary
                // border  h-[32px] w-[46px] flex items-center justify-center cursor-pointers bg-light-gray border-primary
                return (
                  <Fragment key={`${elem.inventoryId}${index}`}>
                    <button
                      type='button'
                      onClick={() => {
                        setSelectSize(elem.name);
                      }}
                      className={`border  h-[32px] w-[46px] flex items-center justify-center cursor-pointers 454545 ${
                        selectSize === elem.name
                          ? store_Code == _Store.type6
                            ? 'bg-light-gray border-primary'
                            : 'border-secondary'
                          : `border-gray-border bg-light-gray ${
                              store_Code == _Store.type6
                                ? 'hover:border-secondary'
                                : ''
                            } `
                      }  ${
                        elem.inventory
                          ? store_Code == _Store.type6
                            ? ''
                            : 'hover:bg-secondary hover:text-white'
                          : 'opacity-50 outOfStockProduct'
                      } `}
                      disabled={!elem.inventory ? true : false}
                    >
                      {elem.name}
                    </button>
                  </Fragment>
                );
              })
          ) : (
            <select
              id='selectSize'
              name='selectSize'
              className='form-input max-w-sm'
              onChange={(e) => setSelectSize(e.target.value)}
            >
              <option value=''>Select Size</option>
              {inventory?.inventory
                .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
                .map((elem, index) => {
                  return (
                    <Fragment key={`${elem.inventoryId}${index}`}>
                      <option id='selectSize' value={elem.name}>
                        {elem.name}
                      </option>
                    </Fragment>
                  );
                })}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default Inventory_Type3;
