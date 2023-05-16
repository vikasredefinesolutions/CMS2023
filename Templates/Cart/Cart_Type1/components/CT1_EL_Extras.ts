import {
  CartLogoPersonDetailModel,
  CartLogoPersonModel,
  CartObject,
  ShoppingCartLogoPersonViewModel,
} from '@services/cart';

export interface _SetState_Details {
  totalQty: number;
  totalPrice: number;
  sizesWithPriceNQty: {
    id: number;
    size: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    attributeOptionId: number;
  }[];
  updateCart: boolean;
  lastUpdate: number;
}

export const initialSizeWithPriceNQtyGetter = (
  items: CartObject['shoppingCartItemDetailsViewModels'],
): {
  id: number;
  size: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  attributeOptionId: number;
}[] => {
  const extraction = items.map((item) => ({
    id: item.id,
    unitPrice: item.price / item.qty,
    totalPrice: item.price,
    qty: item.qty,
    size: item.attributeOptionValue,
    attributeOptionId: item.attributeOptionId,
  }));

  return extraction;
};

export const create_cartLogoPersonDetailModels = (args: {
  colorImagePath: string;
  totalQtys: number;
  details: ShoppingCartLogoPersonViewModel[];
}): CartLogoPersonDetailModel[] => {
  return args.details.map((item) => ({
    id: item.id,
    logoPrice: item.logoPrice,
    logoQty: item.qty,
    logoFile: item.logoImagePath, //
    logoLocation: item.logoLocation,
    logoTotal: item.logoPrice * args.totalQtys, // Always questionable
    colorImagePath: args.colorImagePath,
    logoUniqueId: '', //
    price: item.logoPrice, //
    logoColors: '', //
    logoNotes: '', //
    logoDate: new Date(),
    logoNames: item.logoName,
    digitalPrice: 0, //
    logoPositionImage: item.logoPositionImage,
    oldFilePath: '', // Leave empty
    originalLogoFilePath: item.logoImagePath,
    isSewOut: item.isSewOut,
    sewOutAmount: item.sewOutAmount,
    reUsableCustomerLogo: 0, //
  }));
};

export const create_cartLogoPersonModel = (args: {
  details: {
    id: number;
    size: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    attributeOptionId: number;
  }[];
}): CartLogoPersonModel[] => {
  return args.details.map((item) => ({
    id: item.id,
    attributeOptionId: item.attributeOptionId,
    attributeOptionValue: item.size,
    code: '', //
    price: item.unitPrice,
    quantity: item.qty,
    estimateDate: new Date(),
    isEmployeeLoginPrice: item.unitPrice, //
  }));
};