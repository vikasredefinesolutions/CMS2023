import { useTypedSelector_v2 } from '@hooks_v2/index';
import InventoryAvailability from './InventoryAvailability';
import OutOfStockComponent from './OutOfStockComponent';

const Inventory: React.FC<{
  storeCode: string;
  attributeOptionId: string | number;
}> = ({ storeCode, attributeOptionId }) => {
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  console.log(inventory?.inventory);

  return (
    <div className='pt-[15px] text-default-text'>
      <div className='flex flex-wrap items-center bg-light-gray py-[5px] mb-[10px]'>
        <div className='px-[15px] w-1/3'>Size</div>
        <div className='px-[15px] w-1/3 text-center'>Availability</div>
        <div className='px-[15px] w-1/3 text-right'>QTY.</div>
      </div>
      {inventory?.inventory
        .filter((el) => el.colorAttributeOptionId == +attributeOptionId)
        .map((elem) => {
          return elem.inventory ? (
            <InventoryAvailability elem={elem} />
          ) : (
            <OutOfStockComponent elem={elem} />
          );
        })}

      {/* <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
        <div className='w-1/3 pt-[10px] pb-[10px]'>3XL</div>
        <div className='w-1/3 pt-[10px] pb-[10px] text-center text-red-700 font-[600]'>
          OUT OF STOCK
        </div>
        <div className='w-1/3 pt-[10px] pb-[10px] text-right'>-</div>
      </div> */}
    </div>
  );
};

export default Inventory;
