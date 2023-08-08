// import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';

interface _SelectedSizeQty {
  colorAttributeOptionId: number; // colorId,
  totalQty: number;
  size: string;
  sizeAttributeOptionId: number;
  minQty: number;
  stockAvailable: boolean;
}

interface _props {
  selectedSizeQty: _SelectedSizeQty;
  setSelectedSizeQty: React.Dispatch<React.SetStateAction<_SelectedSizeQty>>;
}

const SizeQtyInputType8: React.FC<_props> = ({
  selectedSizeQty,
  setSelectedSizeQty,
}) => {
  const [qty, setQty] = useState<number>(0);

  const quantityHandler = (enteredQty: any) => {
    setQty(enteredQty);
    if (!enteredQty) return;

    setSelectedSizeQty((prev) => ({
      ...prev,
      totalQty: +enteredQty,
    }));
  };

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
              onKeyDown={(e) => {
                ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();
              }}
              onChange={(ev) => {
                if (!selectedSizeQty.stockAvailable) {
                  alert('select One size');
                  return;
                }
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeQtyInputType8;
