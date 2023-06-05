import NxtImage from '@appComponents/reUsable/Image';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { useEffect } from 'react';
import InventoryAvailability from './InventoryAvailability';
const Inventory: React.FC<{
  storeCode: string;
  productId: undefined | number;
  editDetails?: _CartItem;
}> = ({ storeCode, productId, editDetails }) => {
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
  const { brand } = useTypedSelector_v2((state) => state.product.product);

  return (
    <div className='mt-[15px] text-default-text border border-gray-border'>
      <div className='hidden md:flex flex-wrap gap-y-5 bg-primary text-white'>
        <div className='p-2 w-full md:w-2/12'>
          <div className='font-semibold'>Color</div>
        </div>
        <div
          className={`lex flex-wrap md:grid md:grid-cols-${
            inventory?.sizes[0]?.sizeArr.length
          } justify-evenly  gap-y-5 w-full md:w-10/12 ${
            inventory?.sizes[0]?.sizeArr.length ? 'text-left' : 'text-center'
          }`}
        >
          {inventory?.sizes.map((product) => {
            if (product.colorAttributeOptionId === color.attributeOptionId) {
              return product.sizeArr.map((size, index) => (
                <div key={index} className={` p-2 w-1/2 md:w-auto`}>
                  <div className='font-semibold'>{size} </div>
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
          className={` flex flex-wrap gap-y-5 border-b last:border-b-0 border-gray-border mb-5 md:mb-0 bg-light-gray`}
        >
          <div className='p-2 w-full md:w-2/12 text-center md:text-left'>
            <div className='mb-1 text-center w-10 h-10 mx-auto md:m-0 border-gray-300 p-1 bg-white'>
              <NxtImage
                title={`${color.name}`}
                src={color.imageUrl}
                alt={color.altTag}
                className='max-h-full inline-block cursor-pointer'
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
                  return inv > 0 ? (
                    <div
                      key={index}
                      className={`p-2 w-1/2 md:w-auto ${
                        inventory?.sizes[0]?.sizeArr.length
                          ? 'text-left'
                          : 'text-center'
                      }`}
                    >
                      <InventoryAvailability
                        size={size}
                        qty={inv}
                        price={price?.msrp || 0}
                        color={color.name}
                        attributeOptionId={foundedSize[0].attributeOptionId}
                        val={0}
                        editDetails={editDetails}
                        brandName={brand?.name}
                      />
                    </div>
                  ) : (
                    <div className='p-2 w-1/2 md:w-auto'>
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
