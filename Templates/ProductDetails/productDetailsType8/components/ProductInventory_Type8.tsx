// import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
// import { useEffect } from 'react';
// import InventoryAvailability from './InventoryAvailability_Type3';
// import OutOfStockComponent from './OutOfStockComponent_Type3';

import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchInventoryById } from '@services/product.service';
import { Fragment, useEffect, useState } from 'react';

interface _SelectedSizeQty {
  colorAttributeOptionId: number; // colorId,
  totalQty: number;
  size: string;
  sizeAttributeOptionId: number;
  minQty: number;
  stockAvailable: boolean;
}

interface _Props {
  attributeOptionId: number;
  productId: number;
  selectedSizeQty: _SelectedSizeQty;
  setSelectedSizeQty: React.Dispatch<React.SetStateAction<_SelectedSizeQty>>;
}

const Inventory_Type8: React.FC<_Props> = ({
  attributeOptionId,
  selectedSizeQty,
  setSelectedSizeQty,
  productId,
}) => {
  const { setShowLoader } = useActions_v2();

  const [inventory, setInventory] = useState<_ProductInventoryTransfomed>();

  const resetQuantities = (inventory: _ProductInventoryTransfomed | null) => {
    if (!inventory) {
      setSelectedSizeQty((prev) => ({
        colorAttributeOptionId: attributeOptionId!,
        totalQty: 0,
        size: '',
        sizeAttributeOptionId: 0,
        minQty: 0,
        stockAvailable: false,
      }));

      return;
    }

    setSelectedSizeQty({
      colorAttributeOptionId: attributeOptionId!,
      totalQty: 0,
      size: inventory.inventory[0].name,
      sizeAttributeOptionId: inventory.inventory[0].attributeOptionId,
      minQty: inventory.inventory[0].minQuantity,
      stockAvailable: inventory.inventory[0].inventory > 0,
    });
  };

  const fetchInventory = () => {
    setShowLoader(true);
    FetchInventoryById({
      productId: productId,
      attributeOptionId: [attributeOptionId],
    })
      .then((response) => {
        if (!response) return;
        setInventory(response);
        resetQuantities(response);
      })
      .catch(() => {
        console.log('Inventory not found ===>', productId, attributeOptionId);
        resetQuantities(null);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (productId && attributeOptionId) {
      fetchInventory();
    }
  }, [attributeOptionId]);

  if (!inventory) return null;
  return (
    <>
      <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
        <div className='pt-[10px] text-normal-text flex flex-wrap gap-2'>
          <span className='inline-block pt-2'>Select Size(s) :</span>
          <div className='flex flex-wrap items-center gap-[5px]'>
            {inventory?.inventory.map((elem, index) => {
              const activeClass =
                selectedSizeQty.size === elem.name
                  ? 'border-primary bg-light-gray '
                  : 'border-gray-border ';

              const inventoryExist = elem.inventory > 0 ? '' : 'opacity-50';

              return (
                <Fragment key={`${elem.name}${index}`}>
                  <span
                    className={`inline-block py-2 px-4 rounded-[5px] border relative cursor-pointer ${activeClass}  ${inventoryExist} `}
                    onClick={() => {
                      setSelectedSizeQty({
                        colorAttributeOptionId: attributeOptionId!,
                        totalQty: 0,
                        size: elem.name,
                        sizeAttributeOptionId: elem.attributeOptionId,
                        minQty: elem.minQuantity,
                        stockAvailable: elem.inventory > 0,
                      });
                    }}
                  >
                    {elem.name}
                    {elem.inventory > 0 ? null : (
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
