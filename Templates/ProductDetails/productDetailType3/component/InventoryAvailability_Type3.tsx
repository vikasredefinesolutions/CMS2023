import { pkhealthmax } from '@constants/enum';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
interface _props {
  size: string;
  inventoryInStock: number;
  price: number;
  color?: string;
  attributeOptionId: number;
}
const InventoryAvailability_Type3_2: React.FC<_props> = ({
  size,
  inventoryInStock,
  price,
  color,
  attributeOptionId,
}) => {
  const { updateQuantities2, updateQuantities3 } = useActions_v2();
  const [value, setValue] = useState<number | string>(0);
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { multipleQuantity } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { sizeQtys } = useTypedSelector_v2((state) => state.product.toCheckout);
  const { empId } = useTypedSelector_v2((state) => state.employee);

  useEffect(() => {
    if (sizeQtys && sizeQtys?.length) {
      const fetchOldValue =
        sizeQtys.find((item) => item.attributeOptionId === attributeOptionId)
          ?.qty || 0;
      setValue(fetchOldValue);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredQty = +event.target.value;

    if (enteredQty > inventoryInStock) {
      setValue(inventoryInStock);
      updateQuantities2({
        size: size,
        qty: inventoryInStock,
        price: price,
        attributeOptionId: attributeOptionId,
        color: color || '',
      });
      return;
    }

    setValue(enteredQty);
    updateQuantities2({
      size: size,
      qty: enteredQty,
      price: price,
      attributeOptionId: attributeOptionId,
      color: color || '',
    });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmployeeLoggedIn) return;

    if (!multipleQuantity) return;

    let enteredQty = +event.target.value;
    enteredQty = Math.ceil(enteredQty / multipleQuantity) * multipleQuantity;

    if (enteredQty > inventoryInStock) {
      setValue(inventoryInStock);
      updateQuantities2({
        size: size,
        qty: +value,
        price: price,
        attributeOptionId: attributeOptionId,
        color: color || '',
      });
    }

    setValue(enteredQty);
    updateQuantities2({
      size: size,
      qty: +value,
      price: price,
      attributeOptionId: attributeOptionId,
      color: color || '',
    });
  };

  const inventoryText = () => {
    if (isEmployeeLoggedIn) {
      return '250+';
    }

    if (userId) {
      if (inventoryInStock > pkhealthmax) {
        return '250+';
      }
      return inventoryInStock;
    }

    return 'Login to See Inventory';
  };

  const inputMaxCalculator = () => {
    if (isEmployeeLoggedIn) {
      return 99999;
    }

    return inventoryInStock;
  };

  return (
    <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
      <div className='w-1/3 pt-[10px] pb-[10px]'>{size}</div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
        {inventoryText()}
      </div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
        <input
          type='number'
          className='form-input !px-[10px] !inline-block !w-[65px]'
          placeholder='0'
          min={0}
          value={value === 0 ? '' : value}
          max={inputMaxCalculator()}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-', '.'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
export default InventoryAvailability_Type3_2;
