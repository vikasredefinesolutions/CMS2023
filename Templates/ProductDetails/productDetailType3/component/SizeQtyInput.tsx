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
  const selected = useTypedSelector_v2((state) => state.product.selected);
  const { updateQuantitieSingle, clearToCheckout } = useActions_v2();
  const [qty, setQty] = useState<number>(0);
  const inventory = useTypedSelector_v2(
    (state) => state.product.product.inventory?.inventory,
  );
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  const { color } = useTypedSelector_v2((state) => state.product.selected);
  const [current, setCurrent] = useState<any>([]);

  useEffect(() => {
    let filtered = inventory?.filter(
      (el) => el.colorAttributeOptionId == selected.color.attributeOptionId,
    );
    setCurrent(filtered ? filtered : []);
  }, [inventory, selected]);

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

    const currentOptionId = inventory?.find((el) => el.name === size);

    updateQuantitieSingle({
      attributeOptionId: +(currentOptionId?.attributeOptionId || 0),
      size: currentOptionId?.name || size,
      qty: newQuantity,
      price: price ? price : 0,
    });
  };
  // const selectedColor = useTypedSelector_v2(
  //   (state) => state.product.selected.color,
  // );
  useEffect(() => {
    setQty(1);
    if (!inventory || inventory.length === 0 || !size) return;

    setQty(1);
    const currentOptionId = inventory.find((el) => el.name === size);

    updateQuantitieSingle({
      attributeOptionId: +(currentOptionId?.attributeOptionId || 0),
      size: currentOptionId?.name || size,
      qty: 1,
      price: price ? price : 0,
    });
    lastSize_stored = size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);
  // selectedColor
  // console.log(qty, 'qtyqtyqtqyqyq');

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
            } font-bold`}
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
              max={size ? current[0]?.inventory : 0}
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
        {store_Code == BACARDI && current.length > 1 && (
          <div
            className='ml-[10px]'
            onClick={() => {
              clearToCheckout();
              setShowSingleInv && setShowSingleInv(false);
            }}
          >
            <a
              href='javascript:void(0);'
              className={`${
                store_Code == BACARDI ? 'text-default hover:text-default' : ''
              }`}
              id='ShowMultipleSize'
            >
              Click here to add multiple sizes
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default SizeQtyInput;
