import { _Store } from '@configs/page.config';
import { BACARDI } from '@constants/global.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

interface _props {
  price?: number;
  size: string;
  setShowSingleInv?: (args: boolean) => void;
}

let lastSize_stored: string = '';

const SizeQtyInput: React.FC<_props> = (props) => {
  const { price, size, setShowSingleInv } = props;
  const { updateQuantitieSingle } = useActions_v2();
  const [qty, setQty] = useState<number>(0);
  const inventory = useTypedSelector_v2(
    (state) => state.product.product.inventory?.inventory,
  );
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  const { color } = useTypedSelector_v2((state) => state.product.selected);
  const current: any = inventory?.filter(
    (res) =>
      res.name === size &&
      res.colorAttributeOptionId === color.attributeOptionId,
  );
  const quantityHandler = (enteredQty: number) => {
    let newQuantity = 0;

    if (enteredQty >= current[0].inventory) {
      newQuantity = current[0].inventory;
    } else {
      newQuantity = enteredQty;
    }

    setQty(newQuantity);
    updateQuantitieSingle({
      attributeOptionId: current[0].attributeOptionId,
      size: size,
      qty: newQuantity,
      price: price ? price : 0,
    });
  };

  useEffect(() => {
    setQty(1);
    if (!size) return;

    setQty(1);
    updateQuantitieSingle({
      attributeOptionId: current[0].attributeOptionId,
      size: lastSize_stored || size,
      qty: 1,
      price: price ? price : 0,
    });
    lastSize_stored = size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <>
      <div className='flex flex-wrap items-center mb-[15px]'>
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
            Qty:
          </span>
        </div>
        <div
          className={`${
            store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
          }`}
        >
          <div className='w-[112px]'>
            <input
              type='number'
              className='form-input bg-light-gray'
              id='QTY'
              value={qty}
              min={1}
              max={size ? current[0].inventory : 0}
              onKeyDown={(e) => {
                ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();
              }}
              onChange={(ev) => {
                if (size) {
                  quantityHandler(+ev.target.value);
                } else {
                  alert('select One size');
                }
              }}
              placeholder=''
              // disabled
            />
          </div>
        </div>
        {store_Code == BACARDI && (
          <div
            onClick={() => {
              setShowSingleInv && setShowSingleInv(false);
            }}
          >
            <a href='javascript:void(0);' className='' id='ShowMultipleSize'>
              Click here to add multiple sizes
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default SizeQtyInput;
