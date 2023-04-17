import { _showConsoles, __fileNames } from '@configs/show.config';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { _ProductBySku } from '@definations/APIs/productDetail.res';
import { conditionalLog_V2, highLightError } from '@helpers/console.helper';
import {
  FetchColors,
  FetchInventoryById,
  FetchProductsBySKUs,
} from '@services/product.service';

export const FetchProductsDetail = async (params: {
  skus: string;
  storeId: number;
  isAttributeSaparateProduct: boolean;
}): Promise<{
  details: _ProductBySku[] | null;
  colors: Array<_ProductColor[] | null> | null;
  inventory: Array<_ProductInventoryTransfomed | null> | null;
}> => {
  const expectedProps: {
    productsDetail: _ProductBySku[] | null;
    productsColor: Array<_ProductColor[] | null> | null;
    productInventory: Array<_ProductInventoryTransfomed | null> | null;
  } = {
    productsDetail: null,
    productsColor: null,
    productInventory: null,
  };

  try {
    expectedProps.productsDetail = await FetchProductsBySKUs({
      storeId: params.storeId,
      SKUs: params.skus,
    });

    if (
      expectedProps.productsDetail &&
      expectedProps.productsDetail.length > 0
    ) {
      const colorsToFetch = expectedProps.productsDetail!.map((product) => {
        return FetchColors({
          productId: product.productId,
          storeId: params.storeId,
          isAttributeSaparateProduct: params.isAttributeSaparateProduct,
        });
      });

      await Promise.allSettled(colorsToFetch).then((values) =>
        values.forEach((value, index) => {
          const colors = value.status === 'fulfilled' ? value.value : null;
          if (expectedProps.productsColor === null) {
            expectedProps.productsColor = [colors];
          }
          expectedProps.productsColor[index] = colors;
        }),
      );

      const sizesToFetch = expectedProps.productsColor!.map((color, index) => {
        const attributeOptionIds = (color &&
          color.map((clr) => clr.attributeOptionId)) || [0];

        return FetchInventoryById({
          productId:
            (expectedProps.productsDetail &&
              expectedProps.productsDetail[index].productId) ||
            0,
          attributeOptionId: [...attributeOptionIds],
        });
      });

      await Promise.allSettled(sizesToFetch).then((values) =>
        values.forEach((value, index) => {
          const inventory = value.status === 'fulfilled' ? value.value : null;
          if (expectedProps.productInventory === null) {
            expectedProps.productInventory = [inventory];
          }
          expectedProps.productInventory[index] = inventory;
        }),
      );
    }
  } catch (error) {
    highLightError({ error, component: `Compare Products Controller` });
  }

  conditionalLog_V2({
    show: _showConsoles.compareProducts,
    data: expectedProps,
    type: 'CONTROLLER',
    name: __fileNames.compareProducts,
  });

  return {
    details: expectedProps.productsDetail,
    colors: expectedProps.productsColor,
    inventory: expectedProps.productInventory,
  };
};
