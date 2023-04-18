import { _ProductInventory } from '@definations/APIs/inventory.res';
import { useState } from 'react';
interface _props {
  elem: _ProductInventory;
}
const InventoryAvailability: React.FC<_props> = ({ elem }: any) => {
  const [productQuantity, setProductQuantity] = useState(false);
  const [productValue, setProductValue] = useState(0);
  return (
    <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
      <div className='w-1/3 pt-[10px] pb-[10px]'>{elem.name}</div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
        {elem.inventory}
      </div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
        <input
          type='number'
          className='form-input !px-[10px] !inline-block !w-[65px]'
          placeholder='0'
          min={0}
          max={elem.inventory}
          style={{
            border: productQuantity ? '1px solid red' : '',
          }}
          onChange={(e) => {
            if (+e.target.value > +e.target.max) {
              setProductQuantity(true);
              e.target.value = e.target.max;
            } else {
              setProductQuantity(false);
            }
          }}
        />
      </div>
    </div>
  );
};
export default InventoryAvailability;
