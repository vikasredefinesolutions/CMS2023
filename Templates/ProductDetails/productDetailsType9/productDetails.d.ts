import { _ProductRatings } from "@services/review";

interface _Props {
  details: null | _ProductDetails;
  colors: null | _ProductColor[];
  sizes: null | _SizeChartTransformed;
  SEO: null | _ProductSEO;
  alike: null | _ProductsAlike[];
  sectionView: string[] | [];
  reviews: _ProductReview[] | null;
  productDetailsTemplateId: string;
  storeTypeId: number;
  ratings: _ProductRatings | null
  storeCode: string;
}

export interface _ProductDetailsTemplates {
  type1: React.FC<_Props>;
  type2: React.FC<_Props>;
  type3: React.FC<_Props>;
  type4: React.FC<_Props>;
  type5: React.FC<_Props>;
  type6: React.FC<_Props>;
  type7: React.FC<_Props>;
  type8: React.FC<_Props>;
}
export interface _sbsStore_props {
  id: number;
  productId: number;
  storeId: number;
  name: string;
  customizationCharges: number;
  type: null | any;
  isRequired: boolean;
  recStatus: string;
  isExclusive: boolean;
  isChargePerCharacter: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: string;
  location: string;
  ipAddress: number | string;
  macAddress: string;
}
