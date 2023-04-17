import { __console_v2 } from '@configs/console.config';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { _ProductBySku } from '@definations/APIs/productDetail.res';
import { _CompareProducts } from '@definations/compare';
import { conditionalLog_V2 } from '@helpers/console.helper';
import CompareProduct from '@templates/compareProducts';
import * as CompareController from 'controllers_v2/CompareProductsController.async';
import { GetServerSideProps, NextPage } from 'next';
import { _globalStore } from 'store.global';

interface _props {
  products: _CompareProducts | null;
}

const ProductCompare: NextPage<_props> = (props) => {
  return <CompareProduct {...props} />;
};

export default ProductCompare;

interface _ExpectedCompareProductsProps {
  products: null | {
    details: _ProductBySku[] | null;
    colors: Array<_ProductColor[] | null> | null;
    inventory: (_ProductInventoryTransfomed | null)[] | null;
  };
}

interface _StoreType {
  storeId: null | number;
  isAttributeSaparateProduct: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let expectedProps: _ExpectedCompareProductsProps = {
    products: null,
  };
  let store: _StoreType = {
    storeId: null,
    isAttributeSaparateProduct: false,
  };

  const query: {
    SKUs: undefined | string | string[];
  } = {
    SKUs: context.query?.SKU,
  };

  if (typeof query.SKUs === 'string') {
    query.SKUs = query.SKUs;
  } else {
    query.SKUs = undefined;
  }

  try {
    if (_globalStore.storeId) {
      store = {
        storeId: _globalStore.storeId,
        isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
      };
    }

    if (store.storeId && query.SKUs) {
      expectedProps.products = await CompareController.FetchProductsDetail({
        skus: query.SKUs,
        storeId: store.storeId!,
        isAttributeSaparateProduct: store.isAttributeSaparateProduct,
      });
    }
  } catch (error) {
    conditionalLog_V2({
      data: error,
      show: __console_v2.allCatch,
      type: 'CATCH',
      name: 'Product Compare: getServerSideProps - Something went wrong',
    });
  }

  return {
    props: {
      products: expectedProps.products,
    },
  };
};
