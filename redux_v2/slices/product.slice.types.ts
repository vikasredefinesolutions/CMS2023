import { logoLocation } from '@constants/enum';
import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductDiscountTable } from '@definations/APIs/discountTable.res';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { _SizeChartTransformed } from '@definations/APIs/sizeChart.res';

export interface _LogoDetails_IfSubmitted {
  status: logoLocation.submitted;
  location: {
    imageUrl: string;
    name: string;
    value: string;
  };
  date: string | Date;
  price: number;
  quantity: number;
  title: string | undefined;
  filePath: string | null;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
}

export interface _LogoDetails_WillSubmitLater {
  status: logoLocation.submitLater;
  location: {
    imageUrl: string;
    name: string;
    value: string;
  };
  date: string;
  price: number;
  quantity: number;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
}

export interface _AvailableLocationDetails {
  value: string;
  label: string;
  image: {
    url: string;
    alt: string;
  };
  price: number;
  cost: number;
}

export interface _Product_UpdateLogoDetails_Actions {
  payload:
    | {
        type: 'Upload_Logo';
        logo:
          | 'Customize Later'
          | _LogoDetails_IfSubmitted
          | _LogoDetails_WillSubmitLater;
      }
    | {
        type: 'Allow_Next_Logo';
        allow: boolean;
      }
    | {
        type: 'Update_Logo_Image';
        data: {};
      }
    | {
        type: 'Reset_Locations';
        data: _AvailableLocationDetails[];
        allowNextLogo?: boolean;
      }
    | {
        type: 'Update_Location_Options';
        location: {
          value: string;
          label: string;
          addOrRemove: 'ADD' | 'REMOVE';
          image: {
            url: string;
            alt: string;
          };
          price: number;
          cost: number;
        };
      }
    | {
        type: 'Update_TotalPrice_ByLogo';
        logo: {
          addOrSubtract: 'add' | 'subtract';
          price: 'FREE' | number;
          index: number;
          logoStatus: null | 'submitted' | 'later';
        };
      }
    | {
        type: 'Location_Update_Pending';
        pending: string | null;
      }
    | {
        type: 'Remove_SOM_logo';
        logoIndex: number;
        logoStatus: null | 'submitted' | 'later';
      }
    | {
        type: 'Set_Logo_Details';
        data: any[];
      };
}
export interface _Product_UpdateFirstLogoPrice {
  payload: {
    firstLogoPrice: number;
  };
}
export interface _Product_UpdateSewOutCharges {
  payload:
    | {
        type: 'Add_Charges';
        logo: {
          sewOutCharges: number;
          isSewOut: boolean;
          index: number;
        };
      }
    | {
        type: 'Subtract_Charges';
        logo: {
          sewOutCharges: number;
          isSewOut: boolean;
          index: number;
        };
      };
}

export type _SOM_LogoDetails =
  | _LogoDetails_IfSubmitted
  | _LogoDetails_WillSubmitLater;

export interface _LogoDetail {
  no: number;
  logo: {
    url: string;
    name: string;
  };
  location: _AvailableLocationDetailsOtherStores;
}

export interface _Product_SizeQtys {
  attributeOptionId: number;
  id?: number;
  size: string;
  qty: number;
  price: number;
  color?: string | undefined;
  aditionalCharges?: number | undefined;
}

export interface _AvailableLocationDetailsOtherStores {
  logoLocationDetailId: number;
  reusableLocationId: number;
  name: string;
  image: string;
  threeDImage: string;
  threeDLogoLocationClass: string;
  price: number;
  cost: number;
  brandGuideLines: boolean;
}

export interface _state_productToCheckout {
  allowAddToCart: boolean;
  minQty: number;
  totalQty: number;
  price: number;
  totalPrice: number;
  additionalLogoCharge: number;
  additionalSewOutCharges: number;
  availableOptions: _AvailableLocationDetailsOtherStores[] | null;
  sizeQtys: _Product_SizeQtys[] | null;
  logo: {
    price: Array<number | 'FREE'> | null;
  };
  firstLogoPrice: number;
  logos: null | _LogoDetail[];
  allowNextLogo: boolean;
  lines:
    | {
        line1: string;
        line2: string;
        color: string;
        font: string;
        price: number;
      }[]
    | null;
  minQtyShouldNotBeMoreThanOne: boolean;
}

export interface _state_SelectedProduct {
  productId: number;
  image: {
    id: number;
    imageUrl: string;
    altTag: string;
  };
  color: _ProductColor;
  inventory: null | _ProductInventoryTransfomed;
  sbState: any;
  presentQty: number;
}

export interface _state_SOM_Logos_Container {
  prices: null | Array<number | 'FREE'>;
  details: null | _SOM_LogoDetails[];
  allowNextLogo: boolean;
  availableOptions: _AvailableLocationDetails[] | null;
  additionalLogoCharge: number;
  choosedLogoCompletionPending: string | null;
}
export interface _ProductStore {
  pinterestImagePath: string;
  selected: _state_SelectedProduct;
  product: {
    id: number | null;
    sizes: string;
    sku: string;
    discounts: _ProductDiscountTable | null;
    sizeChart: _SizeChartTransformed | null;
    inventory: null | _ProductInventoryTransfomed;
    price: {
      msrp: number;
      ourCost: number;
      salePrice: number;
    } | null;
    customization: boolean;
    name: string | null;
    colors: _ProductColor[] | null;
    brand: {
      id: number | null;
      name: string | null;
      url: string | null;
      url2: string | null;
      url3: string | null;
      brandSEname: string | null;
    } | null;
    categoryName?: string;
  };
  toCheckout: _state_productToCheckout;
  som_logos: _state_SOM_Logos_Container;
  offlineProductSelected: string;
  categoryArr: string[];
}

export interface _updateDiscountTablePrices {
  type: 'DISOCUNT_TABLE_PRICES';
  data: _ProductDiscountTable | null;
}

export interface _updateInventoryList {
  type: 'INVENTORY_LIST';
  data: null | _ProductInventoryTransfomed;
}

export interface _updateDiscountTablePrices_cleanUp {
  type: 'DISOCUNT_TABLE_PRICES_CLEANUP';
}

export interface _updateInventoryList_cleanUp {
  type: 'INVENTORY_LIST_CLEANUP';
}

export interface _UpdateProperties_Action {
  payload:
    | _updateInventoryList
    | _updateInventoryList_cleanUp
    | _updateDiscountTablePrices
    | _updateDiscountTablePrices_cleanUp;
}

export interface _SetValue_MinQty {
  type: 'MINIMUM_QTY';
  data: {
    qty: number;
  };
}

export interface _SetValue_ProductPrice_OnEdit {
  type: 'PRICE_ON_EDIT';
  data: {
    unitPrice: number;
  };
}

export interface _CategoryArr {
  type: 'ADD';
  arr: string[];
}

export interface _CategoryArr_Action {
  payload: _CategoryArr;
}

export interface _UpdateSelectedValue_Color {
  type: 'COLOR';
  data: _ProductColor;
}

export interface _UpdateSelectedValue_Reset_All {
  type: 'RESET_ALL';
}

export interface _UPDATE_BASIC_PRODUCT_DETAILS {
  type: 'BASIC_PRODUCT_DETAILS';
  prop: {
    sku?: string;
  };
}

export interface _Product_UpdateSelectedValeus_Action {
  payload:
    | _UpdateSelectedValue_Color
    | {
        type: 'PINTERESET_IMAGE_PATH';
        path: string;
      }
    | _UpdateSelectedValue_Reset_All
    | _UPDATE_BASIC_PRODUCT_DETAILS
    | {
        type: 'PRICES';
        price: {
          msrp: number;
          ourCost: number;
          salePrice: number;
        };
      };
}

export interface _Product_SetValues_Action {
  payload: _SetValue_MinQty | _SetValue_ProductPrice_OnEdit;
}
