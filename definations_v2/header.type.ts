import { _Brand } from '@definations/brand';
import { NextPage } from 'next';

export interface _StoreMenu {
  id: number;
  type: 'custom' | 'dynamic' | 'none';
  category: 'topic' | 'category';
  title?: string;
  topic_Id: number;
  open_In_New_Tab: string;
  menu_Info: string;
  store_Id: number;
  created_By: string;
  created_Date: null;
  modified_By: string;
  modified_Date: null;
  se_Name: string;
  menu_Type: 'brands';
}

export interface _t_Brands {
  dataType: 'BRANDS';
  brands: _Brand[] | null;
}
export interface _MenuCategory {
  id: number;
  categoryName: string;
  seName: string;
  customSEName: null | string;
}
export interface _BrandWithCategories {
  id: number;
  brandId?: number;
  brandName: string;
  seName: string;
  brandColorImageUrl: string;
  brandCollectionUrl: null;
  brandBlackColorImageUrl: string;
  isBrandOnline: boolean;
}
export interface _MenuCategoryWithBrand {
  brandDetails: _BrandWithCategories[];
  categoryDetails: _MenuCategory[];
}

export interface _t_MenuCategory {
  dataType: 'CATEGORIES';
  categories: _MenuCategory[] | null;
}
export interface _t_MenuCategoryWithBrand {
  dataType: 'CATEGORIES';
  categories: _MenuCategoryWithBrand[] | null;
}

export interface _MenuTopic {
  id: number;
  title: string;
  page_type: string;
  pass_required: string;
  password: null;
  pass_expiry_period: null;
  status: string;
  tag: string;
  author: string;
  preview_as: string;
  store_id: number;
  slug: string;
  topic_title: string;
  meta_description: string;
  meta_keywords: string;
  template_id: number;
  head_html: null;
  footer_html: null;
  canonical_url: null;
  publish_duration: string;
  publish_date: null;
  publish_time: null;
  unpublish_date: null;
  unpublish_time: null;
  schedule_unpublish: string;
  redirect_page_id: null;
  publish_status: string;
  created_by: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
  template: { id: number; title: string; image_src: null };
}

export interface _t_MenuTopic {
  dataType: 'TOPIC';
  topic: _MenuTopic | null;
}

export type _DynamicContent = {
  type: 'BRANDS' | 'CATEGORY';
  title: string;
  seName: string | null;
  items: _t_Brands | _t_MenuCategory | null;
};
export type _DynamicContentWithBrand = {
  type: 'BRANDS' | 'CATEGORY';
  title: string;
  seName: string | null;
  items: _t_Brands | _t_MenuCategoryWithBrand | null;
};

export type _NoneContent = {
  type: 'TOPIC' | 'CATEGORY';
  title: string;
  seName: string | null;
  items: _t_MenuTopic | null;
};

export type _CustomContent = {
  type: 'TOPIC' | 'CATEGORY';
  title: string;
  seName: string | null;
  items: string | null;
};

export type _MenuItems = {
  items: null | _StoreMenu[];
  items_content:
    | (_CustomContent | _DynamicContent | _NoneContent | null)[]
    | null;
};

export type _MenuItemsWithBrand = {
  items: null | _StoreMenu[];
  items_content:
    | (_CustomContent | _DynamicContentWithBrand | _NoneContent | null)[]
    | null;
};

export interface _HeaderPropsWithBrand {
  // id: number;
  storeCode: string;
  logoUrl: {
    desktop: string;
  };
  menuItems: _MenuItems | _MenuItemsWithBrand | null;
  headerBgColor: string;
  headerTextColor: string;
  headerTransparent: boolean;
  headerContainer: boolean;
}
export interface _HeaderProps {
  // id: number;
  storeCode: string;
  logoUrl: {
    desktop: string;
  };
  menuItems: _MenuItems | null | _MenuItemsWithBrand;
  headerBgColor: string;
  headerTextColor: string;
  headerTransparent: boolean;
  headerContainer: boolean;
}

export interface _AnnouncementRow {
  isVisible: boolean;
  leftsideText?: string | undefined;
  rightSideText?: string | undefined;
  textColor?: string;
  backgroundColor?: string;
  leftSideText?: string;
}

export interface _HeaderTemplates {
  type1: NextPage<_HeaderProps, _HeaderProps>;
  type2: NextPage<_HeaderProps, _HeaderProps>;
  type3: NextPage<_HeaderProps, _HeaderProps>;
  type4: NextPage<_HeaderProps, _HeaderProps>;
  type5: NextPage<_HeaderProps, _HeaderProps>;
  type6: NextPage<_HeaderProps, _HeaderProps>;
  type7: NextPage<_HeaderProps, _HeaderProps>;
  type8: NextPage<_HeaderProps, _HeaderProps>;
  type9: NextPage<_HeaderProps, _HeaderProps>;
  type10: NextPage<_HeaderProps, _HeaderProps>;
}
