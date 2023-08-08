import { BACARDI } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';

const InStock_Type3: React.FC = () => {
  const [inventory, setInventory] = useState<number | null>(null);

  const productInventory = useTypedSelector_v2(
    (state) => state.product.product.inventory,
  );

  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    const prodArr = productInventory?.inventory.filter((prod) => {
      return (
        prod.colorAttributeOptionId === selectedProduct.color.attributeOptionId
      );
    });

    const inventoryCount = prodArr?.reduce(
      (acc, curr) => acc + curr.inventory,
      0,
    );

    setInventory(inventoryCount ? inventoryCount : 0);
  }, [selectedProduct, productInventory]);

  return (
    <>
      {
        <div className='flex align-top mb-[15px]'>
          <div className={`w-[128px]  text-default-text`}>
            <span className={`font-semibold`}>
              {' '}
              {__pagesText.productInfo.availableColors.stockCheck}
            </span>
          </div>
          <span
            className={`ml-[4px] text-medium-text  ${
              inventory && inventory == 0
                ? storeCode == BACARDI
                  ? 'text-[#ac080e]'
                  : 'text-[#a94442]'
                : '!text-[#006400]'
            } text-quaternary`}
          >
            {selectedProduct && inventory && inventory == 0
              ? 'Out of Stock'
              : `In Stock`}
          </span>
        </div>
      }
    </>
  );
};

export default InStock_Type3;
