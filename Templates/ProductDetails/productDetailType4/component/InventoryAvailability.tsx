import { _CartItem } from '@definations/startOrderModal';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useState } from 'react';
interface _props {
  size: string;
  qty: number;
  price: number;
  color?: string;
  attributeOptionId: number;
  val: number;
  editDetails?: _CartItem;
}
const InventoryAvailability: React.FC<_props> = ({
  size,
  qty,
  price,
  color,
  attributeOptionId,
  val,
  editDetails,
}) => {
  const { updateQuantities, updateQuantities3 } = useActions_v2();
  const [value, setValue] = useState<number | string>(val);
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const comingprice = useTypedSelector_v2(
    (state) => state.product.toCheckout.price,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
    if (+event.target.value > qty) {
      setValue(qty);
    }
    if (editDetails) {
      updateQuantities({
        size: size,
        qty: qty > +event.target.value ? +event.target.value : qty,
        price: price,
        attributeOptionId: attributeOptionId,
      });
    } else {
      updateQuantities3({
        size: size,
        qty: qty > +event.target.value ? +event.target.value : qty,
        price: comingprice,
        attributeOptionId: attributeOptionId,
        color: color || '',
      });
    }
  };

  return (
    <>
      <div className='mb-1'>{userId ? qty : 'Login to See Inventory'}</div>
      <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
        <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
          <input
            type='number'
            className='form-input !px-[10px] !inline-block !w-[65px]'
            placeholder='0'
            min={0}
            value={value}
            max={qty}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
export default InventoryAvailability;
