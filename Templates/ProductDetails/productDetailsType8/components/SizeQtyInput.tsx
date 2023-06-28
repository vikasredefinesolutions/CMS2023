// import { useTypedSelector_v2 } from 'hooks_v2';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

interface _props {
  price?: number;
  size: string;
}

let lastSize_stored: string = '';

const SizeQtyInputType8: React.FC<_props> = ({ price, size }) => {
  const { updateQuantitieSingle } = useActions_v2();
  const [qty, setQty] = useState<number>(1);
  const inventory = useTypedSelector_v2(
    (state) => state.product.product.inventory?.inventory,
  );
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
      <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
        <div className='pt-[10px] text-normal-text flex flex-wrap gap-2'>
          <span className='inline-block pt-2'>Qty :</span>
          <div className='flex flex-wrap items-center gap-[5px]'>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeQtyInputType8;
