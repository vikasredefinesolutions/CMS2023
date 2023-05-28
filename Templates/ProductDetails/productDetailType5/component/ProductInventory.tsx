import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect } from 'react';
import InventoryAvailability from './InventoryAvailability';
import OutOfStockComponent from './OutOfStockComponent';

const Inventory: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
}> = ({ storeCode, attributeOptionId }) => {
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );

  const { updatePrice } = useActions_v2();

  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price?.msrp]);

  return (
    <div className='pt-[15px] text-default-text'>
      <div className='flex flex-wrap items-center bg-light-gray py-[5px] mb-[10px] !font-bold'>
        <div className='px-[15px] w-1/3'>Size</div>
        <div className='px-[15px] w-1/3 text-center'>Availability</div>
        <div className='px-[15px] w-1/3 text-right'>QTY.</div>
      </div>
      {inventory?.inventory
        .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
        .map((elem) => {
          return elem.inventory ? (
            <InventoryAvailability
              size={elem.name}
              qty={elem.inventory}
              price={price?.msrp || 0}
              attributeOptionId={elem.attributeOptionId}
            />
          ) : (
            <OutOfStockComponent elem={elem} />
          );
        })}
    </div>
  );
};

export default Inventory;
