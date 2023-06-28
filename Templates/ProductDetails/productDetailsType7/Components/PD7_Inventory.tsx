import {
  _ProductInventory,
  _ProductInventoryTransfomed,
} from '@definations/APIs/inventory.res';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchInventoryById } from '@services/product.service';
import React, { useEffect, useState } from 'react';
import { _SelectedSizeQty } from '..';

let formValidateOnce = false;

interface _Props {
  attributeOptionId: number | null;
  productId: number | null;
  setSelectedSizeQtys: React.Dispatch<React.SetStateAction<_SelectedSizeQty>>;
  selectedSizeQtys: _SelectedSizeQty;
  submitForm: () => Promise<any>;
}

const PD7_Inventory: React.FC<_Props> = ({
  attributeOptionId,
  productId,
  setSelectedSizeQtys,
  selectedSizeQtys,
  submitForm,
}) => {
  const { setShowLoader } = useActions_v2();
  const [inventory, setInventory] =
    useState<null | _ProductInventoryTransfomed>(null);

  const resetQuantities = (inventory: _ProductInventoryTransfomed | null) => {
    if (!inventory) {
      setSelectedSizeQtys({
        colorAttributeOptionId: attributeOptionId!,
        sizesNqtys: [],
        totalQty: 0,
        stockAvailable: false,
      });

      return;
    }

    let totalStock = 0;

    setSelectedSizeQtys({
      colorAttributeOptionId: attributeOptionId!,
      sizesNqtys: inventory.inventory.map((item) => {
        totalStock += item.inventory;
        return {
          size: item.name,
          qty: 0,
          sizeAttributeOptionId: item.attributeOptionId,
        };
      }),
      totalQty: 0,
      stockAvailable: totalStock > 0,
    });
  };

  const fetchInventory = () => {
    setShowLoader(true);
    FetchInventoryById({
      productId: productId!,
      attributeOptionId: [attributeOptionId!],
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: _ProductInventory,
  ) => {
    if (!formValidateOnce) {
      submitForm();
    }

    setSelectedSizeQtys((prev) => {
      let newTotalQty = 0;

      return {
        colorAttributeOptionId: prev.colorAttributeOptionId,
        sizesNqtys: prev.sizesNqtys.map((old) => {
          if (old.size === item.name) {
            newTotalQty += +event.target.value;
            return {
              size: old.size,
              qty: +event.target.value,
              sizeAttributeOptionId: old.sizeAttributeOptionId,
            };
          }

          newTotalQty += old.qty;
          return old;
        }),
        stockAvailable: true,
        totalQty: newTotalQty,
      };
    });
  };

  useEffect(() => {
    if (productId && attributeOptionId) {
      fetchInventory();
    }
  }, [attributeOptionId]);

  if (!inventory) return null;
  // console.log('inventory ===> ', inventory);

  return (
    <div className='pt-[15px] text-default-text flex flex-wrap w-full'>
      <div className='flex flex-wrap items-center bg-tertiary py-[5px] mb-[10px] w-full'>
        <div className='px-[15px] w-1/2 font-semibold'>Size</div>
        <div className='px-[15px] w-1/2 text-right font-semibold'>QTY.</div>
      </div>

      {inventory.inventory.map((item, index) => {
        const outOfStock =
          item.inventory <= 0 || selectedSizeQtys.sizesNqtys.length === 0;

        return (
          <div
            key={index}
            className='flex flex-wrap items-center justify-between border-b border-b-gray-border pl-[10px] w-full' 
          >
            <div className='px-[10px] w-1/2 pt-[10px] pb-[10px]'>{item.name}</div>
            <div className='px-[10px] w-1/2 pt-[10px] pb-[10px] text-right'>
              {outOfStock && (
                <span className='ml-[4px] text-extra-small-text !font-bold !text-[#800000]'>
                  Out Of Stock
                </span>
              )}

              {!outOfStock && (
                <input
                  className='form-input !px-[10px] !inline-block !w-[85px]'
                  min={0}
                  defaultValue={0}
                  max={item.inventory}
                  value={selectedSizeQtys.sizesNqtys[index].qty}
                  onKeyDown={(event) =>
                    ['e', 'E', '+', '-', '.'].includes(event.key) &&
                    event.preventDefault()
                  }
                  onChange={(event) => handleChange(event, item)}
                  type='number'
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PD7_Inventory;
