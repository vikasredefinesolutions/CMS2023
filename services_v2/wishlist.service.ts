import { WishlistType } from '@definations/wishlist.type';
import {
  WishlistRequest,
  _AddWishlistApiResponse,
  _DeleteWishlistApiResponse,
} from '@services/wishlist';
import { SendAsync } from '@utils/axios.util';

export const AddToWishlist = async (payload: WishlistRequest) => {
  const url = '/StoreProductWishList/createstoreproductwishlist.json';
  const res = await SendAsync<_AddWishlistApiResponse>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};

export const getWishlist = async (customerId: number) => {
  const url = `/StoreProductWishList/getwishlistbycustomerid/${customerId}.json`;
  const res = await SendAsync<WishlistType>({
    url: url,
    method: 'GET',
  });

  return res;
};

export const removeWishlist = async (wishlistId: number) => {
  const url = '/StoreProductWishList/deletewishlistbyid.json';
  const res = await SendAsync<_DeleteWishlistApiResponse>({
    url: url,
    method: 'POST',
    data: { wishlistId },
  });

  return res;
};
