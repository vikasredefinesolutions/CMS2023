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

  const attributeOptionId: any = inventory?.filter((res) => res.name === size);
  const quantityHandler = (enteredQty: number) => {
    let newQuantity = 0;

    if (enteredQty >= 0) {
      newQuantity = enteredQty;
    }

    setQty(newQuantity);
    updateQuantitieSingle({
      attributeOptionId: attributeOptionId[0].attributeOptionId,
      size: size,
      qty: newQuantity,
      price: price ? price : 0,
    });
  };

  useEffect(() => {
    if (!size) return;

    setQty(0);
    updateQuantitieSingle({
      attributeOptionId: attributeOptionId[0].attributeOptionId,
      size: lastSize_stored || size,
      qty: 0,
      price: price ? price : 0,
    });
    lastSize_stored = size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <>
      <div className='flex flex-wrap items-center mb-4'>
        <div className='w-32 text-sm items-center'>
          <span className='text-sm font-semibold'>Qty:</span>
        </div>
        <div className='text-sm'>
          <div className='w-20'>
            <input
              type='number'
              className='form-input'
              id='QTY'
              value={qty}
              onChange={(ev) => quantityHandler(+ev.target.value)}
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
