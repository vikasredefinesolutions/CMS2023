import { _ProductColor } from '@definations/APIs/colors.res';
import {
  _ProductDetails,
  _ProductsAlike,
  _ProductSEO,
} from '@definations/APIs/productDetail.res';

export interface _ExpectedRequestConsultationProps {
  product: null | {
    details: null | _ProductDetails;
    colors: null | _ProductColor[];
  };
  color: null | _ProductColor;
  alike: null | _ProductsAlike[];
  seo: null | _ProductSEO;
}

export interface _RequestConsultationProps {
  details: null | _ProductDetails;
  color: null | _ProductColor;
  alike: null | _ProductsAlike[];
  seo: null | _ProductSEO;
  store: any;
}
