import {
  CartLogoPersonDetailModel,
  CartLogoPersonModel,
  ShoppingCartLogoPersonViewModel,
  _CartItem,
} from '@services/cart';

export interface _SetState_Details {
  totalQty: number;
  totalPrice: number;
  sizesWithPriceNQty: {
    id: number;
    size: string;
    qty: number;
    unitPrice: string;
    totalPrice: number;
    attributeOptionId: number;
  }[];
  updateCart: boolean;
  lastUpdate: number;
}

export const initialSizeWithPriceNQtyGetter = (
  items: _CartItem['shoppingCartItemDetailsViewModels'],
): {
  id: number;
  size: string;
  qty: number;
  unitPrice: string;
  totalPrice: number;
  attributeOptionId: number;
}[] => {
  const extraction = items.map((item) => ({
    id: item.id,
    unitPrice: (item.price / item.qty).toFixed(2),
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
    logoPrice: item?.logoPrice ? item.logoPrice / item.qty : 0,
    logoQty: args.totalQtys || 0,
    logoFile: item.logoImagePath, //
    logoLocation: item.logoLocation,
    logoTotal:
      item.logoPrice && item.qty
        ? (item.logoPrice / item.qty) * args.totalQtys
        : 0, // Always questionable
    colorImagePath: args.colorImagePath,
    logoUniqueId: '', //
    price: item.logoPrice && item.qty ? item.logoPrice / item.qty : 0, //
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
    unitPrice: string;
    totalPrice: number;
    attributeOptionId: number;
  }[];
}): CartLogoPersonModel[] => {
  return args.details.map((item) => ({
    id: item.id,
    attributeOptionId: item.attributeOptionId,
    attributeOptionValue: item.size,
    code: '', //
    price: +item.unitPrice,
    quantity: item.qty,
    estimateDate: new Date(),
    isEmployeeLoginPrice: 1, //
  }));
};
