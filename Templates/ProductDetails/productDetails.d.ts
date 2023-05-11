interface _Props {
  details: null | _ProductDetails;
  colors: null | _ProductColor[];
  sizes: null | _SizeChartTransformed;
  SEO: null | _ProductSEO;
  alike: null | _ProductsAlike[];
  sectionView: string[] | [];
  productDetailsTemplateId: string;
  storeTypeId: number;
  storeCode: string;
}

export interface _ProductDetailsTemplates {
  type1: React.FC<_Props>;
  type2: React.FC<_Props>;
  type3: React.FC<_Props>;
  type4: React.FC<_Props>;
  type5: React.FC<_Props>;
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
