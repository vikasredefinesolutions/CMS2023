import { __Error } from '@constants/global.constant';
import { _GetPageType } from '@definations/slug.type';
import { GetlAllProductList } from '@templates/ProductListings/productListing';
import { _ProductDetailsProps } from 'Templates/ProductDetails/productDetailsTypes/productDetail.res';
import { _FeaturedProduct } from 'Templates/ProductDetails/productDetailsTypes/storeDetails.res';

export interface _TopicHomeProps {
  pageData: {
    components: unknown;
  };
  pageType: 'topic';
  slug: string;
}

export interface _SlugServerSide_WentWrong {
  error: __Error.storeIdMissing | __Error.noPageTypeFound;
}

export interface _StoreCache {
  storeCode: string;
  storeTypeId: number;
}

export interface _SlugServerSideProps {
  _store: _StoreCache | null;
  pageMetaData: _GetPageType | null;
  page: {
    productDetails: _ProductDetailsProps | null;
    productListing: _ProductListProps | null;
    topicHome: {
      components: unknown;
    };
    home: {
      featuredItems: null | Array<_FeaturedProduct[] | null>;
    };
  } | null;
}

export interface _ProductListProps {
  brandSEO: _BrandSEO;
  filters: Filter[];
  product: GetlAllProductList[];
  checkedFilters: CheckedFilter[];
  brandId: number;
  bannerType: string;
  templateId: string;
}

export interface _BrandSEO {
  brandId: number;
  brandName: string;
  seName: string;
  seTitle: string;
  seKeyWords: string;
  seDescription: string;
}

export interface FilterOption {
  label: string;
  id: number;
  name: string;
  productCount: number;
  displayOrder: number;
  colorCode: string;
  fromPrice?: number;
  toPrice?: number;
}

export interface Filter {
  label: string;
  options: FilterOption[];
}

export interface GetProductImageOptionList2 {
  id: number;
  imageName: string;
  colorName: string;
  displayorder: number;
  alttag: string;
}

export interface Product {
  getProductImageOptionList: GetProductImageOptionList2[];
  id: number;
  name: string;
  sename: string;
  msrp: number;
  salePrice: number;
  brandlogo: string;
  iswishlist: boolean;
  wishListId: number;
  displayOrder: number;
  blackBrandlogo?: string;
}

export interface CheckedFilter {
  name: string;
  value: string;
}
