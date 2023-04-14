import { SendAsync } from '@utils/axios.util';
import {
  ProductReviewCounts,
  ProductReviewDetailsRes,
  ProductReviewType,
  ReviewHelpfull,
} from './review';

export const AddProductReview = async (payload: ProductReviewType) => {
  const url = `/StoreProduct/createproductreview.json`;
  const res = await SendAsync({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
export const FetchProductReview = async (payload: number) => {
  const url = `/StoreProduct/getproductreviews/${payload}.json`;
  const res: ProductReviewCounts = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const FetchProductReviewDetails = async (payload: number) => {
  const url = `/StoreProduct/getproductreviewsdetail/${payload}.json`;
  const res: ProductReviewDetailsRes[] = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};

export const createstoreproductreviewcount = async (
  payload: ReviewHelpfull,
) => {
  const url = `/StoreProduct/createstoreproductreviewcount.json`;
  const res: ReviewHelpfull = await SendAsync({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
