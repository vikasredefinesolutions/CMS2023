import { brandname, dimax, maxPeter } from '@constants/enum';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { useState } from 'react';
interface _props {
  size: string;
  qty: number;
  price: number;
  color?: string;
  attributeOptionId: number;
  val: number;
  editDetails?: _CartItem;
  brandName: string | null | undefined;
  rest: any;
}
const InventoryAvailability: React.FC<_props> = ({
  size,
  qty,
  price,
  color,
  attributeOptionId,
  val,
  editDetails,
  brandName,
  rest,
}) => {
  const { updateQuantities, updateQuantities3 } = useActions_v2();
  const [value, setValue] = useState<number>(val);
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const comingprice = useTypedSelector_v2(
    (state) => state.product.toCheckout.price,
  );

  const { totalQty } = useTypedSelector_v2((state) => state.product.toCheckout);

  const blockInvalidChar = (e: any) =>
    ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

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
        sewOutCharges: 0,
      });
    } else {
      updateQuantities3({
        size: size,
        qty: qty > +event.target.value ? +event.target.value : qty,
        price: +comingprice,
        attributeOptionId: attributeOptionId,
        color: color || '',
        aditionalCharges: rest[0].price,
        totalQty: totalQty,
      });
    }
  };

  const alertHandle = (e: any, qty: number) => {
    if (e.target.value > qty) {
      alert(`Only ${qty} Size Avaliable`);
    }
  };

  return (
    <>
      {brandName == brandname ? (
        <div className='mb-2'>{qty < maxPeter ? qty : `${maxPeter}+`}</div>
      ) : (
        <div className='mb-2'>{qty < dimax ? qty : `${dimax}+`}</div>
      )}
      <div className=''>
        <input
          type='number'
          onKeyDown={blockInvalidChar}
          className='form-input !px-[10px] !inline-block !w-[65px]'
          placeholder='0'
          min={0}
          value={value > 0 ? value : ''}
          max={qty}
          onInput={(e) => alertHandle(e, qty)}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
export default InventoryAvailability;
