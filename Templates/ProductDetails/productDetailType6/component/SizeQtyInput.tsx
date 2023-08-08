// import { useTypedSelector_v2 } from 'hooks_v2';
import { _Store_CODES } from '@constants/global.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

interface _props {
  price?: number;
  size: string;
}

let lastSize_stored: string = '';

const SizeQtyInput: React.FC<_props> = ({ price, size }) => {
  const storeCode = useTypedSelector_v2((store) => store.store.code);
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

  const quantityHandler = (enteredQty: any) => {
    if (!enteredQty) return setQty(enteredQty);
    let newQuantity = 0;

    if (enteredQty >= current[0]?.inventory) {
      newQuantity = current[0].inventory;
      setQty(newQuantity);
    } else {
      newQuantity = +enteredQty;
      setQty(+enteredQty);
    }

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
          <span
            className={`text-default-text font-semibold ${
              storeCode === _Store_CODES.USAAHEALTHYPOINTS && '!font-semibold'
            }`}
          >
            Qty:
          </span>
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
                ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();
              }}
              onChange={(ev) => {
                if (!size) return alert('select One size');
                if (ev.target.value.toString() === '0') {
                  return quantityHandler(1);
                }

                quantityHandler(ev.target.value);
              }}
              onBlur={(event) => {
                if (!event.target.value) {
                  quantityHandler(1);
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
