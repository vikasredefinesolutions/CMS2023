import { FetchProductList } from '@services/product.service';

export const fetchProducts = async (storeId: string) => {
  try {
    const store = await FetchProductList(storeId);
    return { store };
  } catch (error) {
    throw new Error('No store found!!!');
  }
};
