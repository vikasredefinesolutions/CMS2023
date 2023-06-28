import { _ProductColor } from './APIs/colors.res';
import { _ProductDiscountTable } from './APIs/discountTable.res';
import { _ProductInventoryTransfomed } from './APIs/inventory.res';
import { _ProductDetails, _ProductSEO } from './APIs/productDetail.res';
import { _SizeChartTransformed } from './APIs/sizeChart.res';
import { _StoreReturnType } from './store.type';

export type _LogoSteps =
  | 'SELECT_LOCATION'
  | 'SHARE_LATER'
  | 'SELECT_NOW'
  | 'DONE';

export type _modals =
  | 'requiredQty'
  | 'sizeChart'
  | 'availableInventory'
  | 'login'
  | 'forgot'
  | 'personalizationFonts'
  | 'qouteRequest'
  | 'startOrder'
  | 'guestLogin'
  | 'InventoryLimit';

export interface _Reviews {}

export interface _ShowProduct {}

export interface _productImage {
  _uid: string;
  url: string;
  label: string;
}

// export interface _SelectedProduct {
//   _uid: string;
//   sizeQtys:
//     | {
//         id?: number | undefined;
//         attributeOptionId: number;
//         price: number;
//         qty: number;
//         size: string;
//         color?: string | undefined;
//       }[];
// }
export interface _Selectedproduct {
  _uid: string;
}
export interface _Selectedproduct_v2 {
  color: _ProductColor;
  sizeQtys:
    | {
        id?: number | undefined;
        attributeOptionId: number;
        price: number;
        qty: number;
        size: string;
        color?: string | undefined;
      }[];
  image: {
    id: number;
    imageUrl: string;
    altTag: string;
  };
  productId: number;
  inventory: _ProductInventoryTransfomed | null;
  attributeOptionId?: number;
  productName?: string;
  productQty: number;
}

// --------------------
export interface _ProductReturnType {
  details: null | _ProductDetails;
  colors: null | _ProductColor[];
}

export interface _ExpectedProductProps {
  product: {
    details: null | _ProductDetails;
    colors: null | _ProductColor[];
    sizes: null | _SizeChartTransformed;
    discount: null | _ProductDiscountTable;
    SEO: null | _ProductSEO;
  } | null;
  store?: _StoreReturnType | null;
}

export interface _GiftDetailsProps {
  giftData: {
    id: number;
    seName: string;
    storeId: number;
    name: string;
    description: string;
    shortDescription: string;
    ourCost: string;
    salePrice: string;
    sku: string;
    imageName: string;
    giftCardEnddate: string;
  };
}
