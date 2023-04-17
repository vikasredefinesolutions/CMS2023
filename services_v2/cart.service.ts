import { SendAsync } from '@utils/axios.util';
import {
  AddPromoCodeReq,
  AddPromoCodeResponse,
  CartReq,
  DeleteCartItemResponse,
  getCartListResponse,
} from './cart';
import { _AddToCart_Payload } from './product.service.type';

export const getCartDetails = async (
  customerId: number,
  isEmpLoggedIn: boolean,
): Promise<getCartListResponse> => {
  const url = `Store/GetShoppingCartItemsDetail/${customerId}/${isEmpLoggedIn}.json`;
  const response = await SendAsync<getCartListResponse>({
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
): Promise<AddPromoCodeResponse> => {
  const url = `/Store/CouponCode/GetCouponDetails.json`;
  const res = await SendAsync<AddPromoCodeResponse>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};

export const addToCart = async (req: CartReq): Promise<number> => {
  const url = `/Store/addtocart.json`;
  const res = await SendAsync<number>({
    url: url,
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
