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
}
