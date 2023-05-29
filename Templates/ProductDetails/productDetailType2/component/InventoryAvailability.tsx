import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useState } from 'react';
interface _props {
  size: string;
  qty: number;
  price: number;
  color?: string;
  attributeOptionId: number;
}
const InventoryAvailability: React.FC<_props> = ({
  size,
  qty,
  price,
  color,
  attributeOptionId,
}) => {
  const { updateQuantities, updateQuantities2 } = useActions_v2();
  const [value, setValue] = useState<number | string>(0);
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const { multipleQuantity } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
    if (+event.target.value > qty) {
      setValue(qty);
    }
    updateQuantities2({
      size: size,
      qty: qty > +event.target.value ? +event.target.value : qty,
      price: price,
      attributeOptionId: attributeOptionId,
      color: color || '',
    });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (multipleQuantity) {
      let updateQty = +event.target.value;
      if (multipleQuantity) {
        updateQty =
          Math.ceil(+event.target.value / multipleQuantity) * multipleQuantity;
      }
      setValue(updateQty);
      if (updateQty > qty) {
        setValue(qty);
      }
      updateQuantities2({
        size: size,
        qty: +value,
        price: price,
        attributeOptionId: attributeOptionId,
        color: color || '',
      });
    }
  };

  return (
    <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
      <div className='w-1/3 pt-[10px] pb-[10px]'>{size}</div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
        {userId ? qty : 'Login to See Inventory'}
      </div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
        <input
          type='number'
          className='form-input !px-[10px] !inline-block !w-[65px]'
          placeholder='0'
          min={0}
          value={value === 0 ? '' : value}
          max={qty}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
export default InventoryAvailability;
