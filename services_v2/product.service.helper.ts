/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { logoLocation } from '@constants/enum';
import {
  _Product_SizeQtys,
  _SOM_LogoDetails,
  _state_SelectedProduct,
} from '@redux/slices/product.slice.types';
import {
  _AddToCart_LogoCartItems,
  _AddToCart_Payload,
  _AddToCart_PayloadGenerator_Attributes,
  _CartLogoPersonDetailModel,
  _CartLogoPersonModel,
  _LogoCartItems_LogoDetails,
  _ShoppingCartItemModel,
  _ShoppingCartItemsDetailModel,
} from './product.service.type';

const _default_shoppingCartItemModel: _ShoppingCartItemModel = {
  id: 0,
  price: 0,
  quantity: 0,
  weight: 0,
  productType: 0,
  discountPrice: 0,
  logoTitle: '',
  logogImagePath: '',
  perQuantity: 0,
  appQuantity: 0,
  status: 0,
  discountPercentage: 0,
  productCustomizationId: 0,
  itemNotes: '',
  isEmployeeLoginPrice: 0,
};

export const personalization: {
  defaultLogo: _CartLogoPersonModel;
  defaultLogoDetail: _CartLogoPersonDetailModel;
} = {
  defaultLogo: {
    id: 0,
    attributeOptionId: 0,
    attributeOptionValue: '',
    code: '',
    price: 0,
    quantity: 0,
    estimateDate: new Date(),
    isEmployeeLoginPrice: 0,
  },
  defaultLogoDetail: {
    logoPrice: 0,
    logoQty: 0,
    logoFile: '',
    logoLocation: '',
    logoTotal: 0,
    colorImagePath: '',
    logoUniqueId: '',
    price: 0,
    logoColors: '',
    logoNotes: '',
    logoDate: new Date(),
    logoNames: '',
    digitalPrice: 0,
    logoPositionImage: '',
    oldFilePath: '',
    originalLogoFilePath: '',
    isSewOut: false,
    sewOutAmount: 0,
    reUsableCustomerLogo: 0,
  },
};

export const singleColor_addToCart_PayloadGenerator = async (
  cart: _AddToCart_PayloadGenerator_Attributes,
): Promise<_AddToCart_Payload> => {
  let shoppingCartItemsDetailModel: _ShoppingCartItemsDetailModel[] = [];
  let cartLogoPersonModel: _CartLogoPersonModel[] = [];
  let cartLogoPersonDetailModels: _CartLogoPersonDetailModel[] = [];
  if (cart.cartItems) {
    shoppingCartItemsDetailModel = cart.cartItems.map((item) => item);
  }

  if (cart.personalization.logoCartItems.length > 0) {
    cartLogoPersonModel = cart.personalization.logoCartItems.map((item) => {
      if (item.logo === 'Customize Later') {
        cartLogoPersonDetailModels = [
          {
            ...personalization.defaultLogoDetail,
            colorImagePath: item.product.color.imagePath,
            logoNames: 'Customize Logo',
          },
        ];
      } else {
        cartLogoPersonDetailModels = item.logo.map((logo) => {
          return {
            ...personalization.defaultLogoDetail,
            logoPrice: logo.price,
            logoQty: logo.qty,
            logoFile: logo.filePathUrl,
            logoTotal: logo.total,
            logoLocation: logo.positionImage.name,
            colorImagePath: item.product.color.imagePath,
            logoNames:
              logo.filePathUrl === '' ? 'Add Logo Later' : 'Customize Logos',
            price: logo.price,
            logoDate: new Date(logo.date),
            logoPositionImage: logo.positionImage.path,
            originalLogoFilePath: logo.filePathUrl,
            isSewOut: logo.isSewOut,
            sewOutAmount: logo.sewOutAmount,
            reUsableCustomerLogo: 0,
          };
        });
      }

      return {
        ...personalization.defaultLogo,
        id: 0,
        attributeOptionId: item.product.attributeOptionId,
        attributeOptionValue: item.product.attributeOptionValue,
        price: cart.product.price,
        quantity: item.product.qty,
        estimateDate: item.product.date,
        isEmployeeLoginPrice: 0,
      };
    });
  }

  return {
    addToCartModel: {
      customerId: cart.userId,
      storeId: cart.storeId,
      productId: cart.product.id,
      isempLogin: cart.isEmployeeLoggedIn,
      shoppingCartItemModel: {
        ..._default_shoppingCartItemModel,
        id: cart.cartItemId,
        price: cart.product.price,
        quantity: cart.product.total.qty,
        logoTitle: cart.product.color.altTag,
        logogImagePath: cart.product.color.imageUrl,
        status: cart.product.status,
        itemNotes: cart.product.note,
      },
      shoppingCartItemsDetailModels: shoppingCartItemsDetailModel,
      cartLogoPersonModel: cartLogoPersonModel,
      cartLogoPersonDetailModels: cartLogoPersonDetailModels,
    },
  };
};

export const logoCartItems_Generator = (
  som_logos: _SOM_LogoDetails[] | null,
  product: _state_SelectedProduct,
  sizeQtys: _Product_SizeQtys[],
): _AddToCart_LogoCartItems[] => {
  const newSizeQty = sizeQtys.filter((size) => size.qty > 0);
  const cartItems = newSizeQty.map((size) => {
    let logos: _LogoCartItems_LogoDetails[] = [];

    if (som_logos) {
      logos = som_logos.map((logo) => {
        if (logo.status === logoLocation.submitted) {
          return {
            positionImage: {
              path: logo.location.imageUrl,
              name: logo.location.name,
            },
            filePathUrl: logo.filePath!,
            price: logo.price,
            qty: logo.quantity,
            total: logo.price,
            date: new Date(),
            isSewOut: logo.isSewOut,
            sewOutAmount: logo.sewOutAmount,
            reUsableCustomerLogo: logo.reUsableCustomerLogo,
          };
        }

        return {
          positionImage: {
            path: logo.location.imageUrl,
            name: logo.location.name,
          },
          filePathUrl: '',
          price: logo.price,
          qty: logo.quantity,
          total: logo.price,
          date: new Date(),
          isSewOut: logo.isSewOut,
          sewOutAmount: logo.sewOutAmount,
          reUsableCustomerLogo: logo.reUsableCustomerLogo,
        };
      });
    }

    const item: _AddToCart_LogoCartItems = {
      product: {
        date: new Date(),
        color: {
          imagePath: product.color.imageUrl,
        },
        attributeOptionId: size.attributeOptionId,
        attributeOptionValue: size.size,
        price: size.price,
        qty: size.qty,
      },
      logo: logos.length > 0 ? logos : 'Customize Later',
    };
    return item;
  });
  return cartItems;
};
