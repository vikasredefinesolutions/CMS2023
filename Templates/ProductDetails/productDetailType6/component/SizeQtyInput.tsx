// import { useTypedSelector_v2 } from 'hooks_v2';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

interface _props {
  price?: number;
  size: string;
}

let lastSize_stored: string = '';

const SizeQtyInput: React.FC<_props> = ({ price, size }) => {
  const { updateQuantitieSingle } = useActions_v2();
  const [qty, setQty] = useState<number>(0);
  const inventory = useTypedSelector_v2(
    (state) => state.product.product.inventory?.inventory,
  );
  const { showModal } = useActions_v2();

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
    // const result = test.filter

    setQty(newQuantity);
    updateQuantitieSingle({
      attributeOptionId: current[0].attributeOptionId,
      size: size,
      qty: newQuantity,
      price: price ? price : 0,
    });
  };

  useEffect(() => {
    if (!size) return;

    setQty(0);
    updateQuantitieSingle({
      attributeOptionId: current[0].attributeOptionId,
      size: lastSize_stored || size,
      qty: 0,
      price: price ? price : 0,
    });
    lastSize_stored = size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <>
      <div className='flex flex-wrap items-center mb-[15px]'>
        <div className='w-[128px] text-default-text items-center'>
          <span className='text-default-text font-semibold'>Qty:</span>
        </div>
        <div className='text-default-text'>
          <div className='w-[112px]'>
            <input
              type='number'
              className='form-input'
              id='QTY'
              value={qty}
              max={size ? 1 : 1}
              onKeyDown={(e) => {
                if (!/[^0-9]/.test(e.key)) {
                  return;
                }
              }}
              onChange={(ev) => {
                if (size) {
                  quantityHandler(1);
                } else {
                  alert('select One size');
                }
              }}
              placeholder=''
              // disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeQtyInput;
