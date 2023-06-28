// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { useTypedSelector_v2 } from '@hooks_v2/index';
import { Fragment } from 'react';

const Inventory_Type8: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
  setSelectSize: (name: string) => void;
  selectSize: string;
}> = ({ attributeOptionId, setSelectSize, selectSize }) => {
  const { inventory } = useTypedSelector_v2((state) => state.product.product);

  // useEffect(() => {
  //   if (inventory?.inventory) {
  //     for (let i = 0; i < inventory.inventory.length; i++) {
  //       if (inventory.inventory[i].inventory > 0) {
  //         setSelectSize(inventory.inventory[i].name);
  //         break;
  //       }
  //     }
  //   }
  // }, [inventory]);
  return (
    <>
      <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
        <div className='pt-[10px] text-normal-text flex flex-wrap gap-2'>
          <span className='inline-block pt-2'>Select Size(s) :</span>
          <div className='flex flex-wrap items-center gap-[5px]'>
            {inventory?.inventory
              .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
              .map((elem, index) => {
                return (
                  <Fragment key={`${elem.inventoryId}${index}`}>
                    <span
                      className={`inline-block py-2 px-4 rounded-[5px] border relative cursor-pointer  ${
                        selectSize === elem.name
                          ? 'border-primary bg-light-gray '
                          : 'border-gray-border '
                      }  ${elem.inventory ? '' : 'opacity-50'} `}
                      onClick={() => {
                        if (elem.inventory) {
                          setSelectSize(elem.name);
                        }
                      }}
                    >
                      {elem.name}
                      {elem.inventory ? (
                        ''
                      ) : (
                        <span className='absolute text-[30px] z-10 inset-0 flex justify-center bg-gray-50 bg-opacity-70 text-secondary items-center disabled'>
                          X
                        </span>
                      )}
                    </span>
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory_Type8;
