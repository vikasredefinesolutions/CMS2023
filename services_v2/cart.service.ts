import { SendAsync } from '@utils/axios.util';
import {
  AddPromoCodeReq,
  AddPromoCodeResponse,
  CartPersonalizationReq,
  CartReq,
  DeleteCartItemResponse,
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  _CartItem,
  removeLogoRes,
  removeParticularSizeProductRes,
  sbsStore,
  updateCartQuantityRes,
} from './cart';
import { _AddToCart_Payload } from './product.service.type';

export const getCartDetails = async (
  customerId: number,
  isEmpLoggedIn: boolean,
): Promise<_CartItem[]> => {
  const url = `Store/GetShoppingCartItemsDetail/${customerId}/${isEmpLoggedIn}.json`;
  const response = await SendAsync<_CartItem[]>({
    url,
    method: 'GET',
  });
  return response;
};

export const deleteItemCart = async (
  cartItemId: number,
): Promise<DeleteCartItemResponse> => {
  const url = `/Store/RemoveRegisterCart/${cartItemId}.json`;
  const res = await SendAsync<DeleteCartItemResponse>({
    url: url,
    method: 'GET',
  });
  return res;
};

export const addPromoCode = async (
  req: AddPromoCodeReq,
): Promise<AddPromoCodeResponse['data']> => {
  const url = `/Store/CouponCode/GetCouponDetails.json`;

  const res = await SendAsync<AddPromoCodeResponse['data']>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const addToCart = async (req: CartReq): Promise<number | string> => {
  const url = `/Store/addtocart.json`;
  const res = await SendAsync<number | string>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const addSubStore = async (req: sbsStore): Promise<number | string> => {
  const url = `/ShoppingCartItemsCustomField/addcustomfiledvalues.json`;
  const res = await SendAsync<number | string>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const updateCartPersonalization = async (
  req: CartPersonalizationReq,
): Promise<number> => {
  const url = `/Store/updatepersonalize.json`;
  const res = await SendAsync<number>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};
export const updateCartQuantity = async (
  req: updateCartQuantityRes,
): Promise<number> => {
  const url = `/Store/updatequantity.json`;
  const res = await SendAsync<number>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const removeParticularSizeProduct = async (
  req: removeParticularSizeProductRes,
): Promise<number> => {
  const url = `/Store/deletecartlogoperson.json`;
  const res = await SendAsync<number>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const removeLogo = async (req: removeLogoRes): Promise<number> => {
  const res = await SendAsync<number>({
    url: `/Store/deletecartlogopersondetail.json`,
    method: 'POST',
    data: req,
  });
  return res;
};

export const updateCartByNewUserId = async (
  oldCustomerId: number,
  newCustomerId: number,
) => {
  const url = `/Store/MoveRegisterCart/${newCustomerId}/${oldCustomerId}.json`;
  const res = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const AddItemsToTheCart = async (payload: _AddToCart_Payload) => {
  const url = `/Store/addtocart.json`;
  const res: number = await SendAsync({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
export type _ShoppingCartAPIs = 'FetchCartDetails';

export type _ShoppingCartService = {
  service: 'ShoppingCart';
  api: _ShoppingCartAPIs;
};

export const getPersonalizationFont = async (storeId: number) => {
  const url = `/PersonalizationFont/getbystoreidlist.json?StoreId=${storeId}`;
  const res: PersonalizationFont[] | [] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const getPersonalizationLocation = async (storeId: number) => {
  const url = `/PersonalizationLocation/getbystoreidlist.json?StoreId=${storeId}`;
  const res: PersonalizationLocation[] | [] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const getPersonalizationColor = async (storeId: number) => {
  const url = `/PMSColor/getbystoreidlist.json?StoreId=${storeId}`;
  const res: PersonalizationColor[] | [] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};
