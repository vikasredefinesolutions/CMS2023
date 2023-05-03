import NxtImage from '@appComponents/reUsable/Image';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect } from 'react';
import InventoryAvailability from './InventoryAvailability';

const Inventory: React.FC<{
  storeCode: string;
  productId: string | number;
}> = ({ storeCode, productId }) => {
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const { color } = useTypedSelector_v2((state) => state.product.selected);
  const { updatePrice } = useActions_v2();
  const colors = useTypedSelector_v2((state) => state.product.product.colors);
  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price?.msrp]);
  console.log(inventory, color, 'inventory');
  return (
    <div className='mt-[15px] text-default-text border border-gray-border'>
      <div className='hidden md:flex flex-wrap gap-y-5 bg-light-gray'>
        <div className='p-2 w-full md:w-2/12'>
          <div className='font-semibold'>Color</div>
        </div>
        <div
          className={`grid grid-cols-${inventory?.sizes[0]?.sizeArr.length} text-center gap-y-5 w-full md:w-10/12`}
        >
          {inventory?.sizes.map((product) => {
            if (product.colorAttributeOptionId === color.attributeOptionId) {
              return product.sizeArr.map((size, index) => (
                <div key={index} className='p-2 w-full md:w-2/12'>
                  <div className='font-semibold'>{size}</div>
                </div>
              ));
            }

            return <></>;
          })}
        </div>
      </div>

      {colors?.map((color) => (
        <div
          key={color.attributeOptionId}
          className='flex flex-wrap gap-y-5 border-b last:border-b-0 border-b-gray-300 mb-5 md:mb-0'
        >
          <div className='p-2 w-full md:w-2/12 text-center md:text-left'>
            <div className='md:hidden font-semibold text-center mb-1'>
              Color:
            </div>
            <div className='mb-1 text-center w-10 h-10 mx-auto md:m-0 border-gray-300 p-1 bg-white'>
              <NxtImage
                title={`${color.name}`}
                src={color.imageUrl}
                alt={color.altTag}
                // className='w-full object-center object-cover cursor-pointer'
                className='max-w-[70px] max-h-[70px]  cursor-pointer'
              />
            </div>
            <div className=''>{color.name}</div>
          </div>
          <div
            className={`flex flex-wrap md:grid md:grid-cols-${inventory?.sizes[0]?.sizeArr.length} justify-evenly text-center gap-y-5 w-full md:w-10/12`}
          >
            {' '}
            {/*flex flex-wrap justify-evenly text-center gap-y-5 w-full md:w-10/12*/}
            {inventory?.sizes.map((product) => {
              if (product.colorAttributeOptionId === color.attributeOptionId) {
                return product.sizeArr.map((size, index) => {
                  const inv =
                    inventory.inventory.find(
                      (int) =>
                        int.colorAttributeOptionId ===
                          color.attributeOptionId && int.name === size,
                    )?.inventory || 0;
                  const foundedSize = inventory.inventory.filter(
                    (item) =>
                      item.colorAttributeOptionId === color.attributeOptionId &&
                      item.name === size,
                  );
                  console.log(foundedSize, 'founded size');

                  return inv > 0 ? (
                    <div key={index} className='p-2 w-1/2 md:w-auto'>
                      <InventoryAvailability
                        size={size}
                        qty={inv}
                        price={price?.msrp || 0}
                        color={color.name}
                        attributeOptionId={foundedSize[0].attributeOptionId}
                      />
                    </div>
                  ) : (
                    <div className='p-2 w-1/2 md:w-1/6'>
                      <div className='border-bottom p-b-10'>
                        <strong className='text-center center'> - </strong>{' '}
                      </div>
                    </div>
                  );
                });
              }
              return <></>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
