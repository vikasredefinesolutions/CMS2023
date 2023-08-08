import { __console_v2 } from '@configs/console.config';
import {
  _CustomContent,
  _DynamicContent,
  _NoneContent,
  _StoreMenu,
} from '@definations/header.type';
import { _StoreReturnType } from '@definations/store.type';
import { conditionalLog_V2 } from '@helpers/console.helper';
import { GetAdminAppConfigs, GetStoreID } from '@services/app.service';
import * as HeaderService from '@services/header.service';

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// TYPEs ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

type _menu_ = {
  items: null | _StoreMenu[];
  items_content:
    | (_CustomContent | _DynamicContent | _NoneContent | null)[]
    | null;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// USUAL FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const getCustomContent = async (
  item: _StoreMenu,
): Promise<_CustomContent | null> => {
  if (item.category === 'category') {
    return {
      title: item.title || 'Category',
      seName: item.se_Name,
      items: item.menu_Info,
      type: 'CATEGORY',
    };
  }
  if (item.category === 'topic') {
    return {
      title: item.title || 'Topic',
      seName: item.se_Name,
      items: item.menu_Info,
      type: 'TOPIC',
    };
  }

  return null;
};

const getDynamicContent = async (
  item: _StoreMenu,
  storeId: number,
  storeCode?: string,
): Promise<_DynamicContent | null> => {
  if (item.category === 'category' && storeCode == 'GG') {
    const res = await HeaderService.FetchMenuCategoriesWithBrand({
      categoryId: item.topic_Id,
      storeId: storeId,
    });

    return {
      title: item.title || 'Category',
      seName: item.se_Name,
      items: res?.dataType === 'CATEGORIES' ? res : null,
      type: 'CATEGORY',
    };
  }
  if (item.category === 'category') {
    const res = await HeaderService.FetchMenuCategories({
      categoryId: item.topic_Id,
      storeId: storeId,
    });

    return {
      title: item.title || 'Category',
      seName: item.se_Name,
      items: res?.dataType === 'CATEGORIES' ? res : null,
      type: 'CATEGORY',
    };
  }

  if (item.category === 'topic') {
    if (item.menu_Type === 'brands') {
      const res = await HeaderService.FetchBrands({ storeId });

      return {
        type: 'BRANDS',
        title: 'Brands',
        seName: item.se_Name,
        items: res,
      };
    }
  }

  return null;
};

const getNoneContent = async (
  item: _StoreMenu,
): Promise<_NoneContent | null> => {
  if (item.category === 'topic') {
    return {
      type: 'TOPIC',
      title: item.title || 'Topic',
      items: null,
      seName: item.se_Name,
    };
  }

  if (item.category === 'category') {
    return {
      type: 'CATEGORY',
      title: item.title || 'Category',
      items: null,
      seName: item.se_Name,
    };
  }

  return null;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// SERVER SIDE FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const fetchMenuContents = async (
  menuItems: null | _StoreMenu[],
  storeId: number,
  storeCode: string,
): Promise<
  (_CustomContent | _DynamicContent | _NoneContent | null)[] | null
> => {
  if (menuItems && menuItems.length > 0) {
    const itemsToFetch = menuItems.map((item) => {
      if (item.type === 'custom') {
        return getCustomContent(item);
      }
      if (item.type === 'dynamic') {
        return getDynamicContent(item, storeId, storeCode);
      }
      if (item.type === 'none') {
        return getNoneContent(item);
      }

      return null;
    });

    return await Promise.allSettled(itemsToFetch).then((values) => {
      return values.map((value) =>
        value.status === 'fulfilled' ? value.value : null,
      );
    });
  }

  return null;
};

export const fetchMenuItems = async (
  storeId: number,
): Promise<null | _StoreMenu[]> => {
  try {
    const menuItems = await HeaderService.FetchStoreMenu({ storeId });

    return menuItems;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      type: 'CATCH',
      name: '_AppController: fetchMenuItems - Something went wrong',
      show: __console_v2.allCatch,
    });
    return null;
  }
};

export const fetchStoreDetails = async (
  domain: string,
): Promise<{
  store: _StoreReturnType;
  adminConfig: {
    blobUrlRootDirectory: string;
    blorUrl: string;
  };
} | null> => {
  const store: _StoreReturnType = {
    storeId: null,
    pageType: '',
    code: '',
    imageFolderPath: '',
    storeTypeId: null,
    storeName: '',
    isAttributeSaparateProduct: false,
    cartCharges: null,
    urls: {
      logo: '',
      favicon: '',
    },
    sewOutCharges: 0,
    firstLineCharges: 0,
    secondLineCharges: 0,
    mediaBaseUrl: '',
    isSewOutEnable: false,
    shippingChargeType: 0,
    email_address: '',
    phone_number: '',
    company_address: '',
    thirdPartyLogin: false,
    bothLogin: false,
    logoUrl: '',
    isLinepersonalization: false,
    firstLogoCharge: 0,
    secondLogoCharge: 0,
    storeXPaymetnOptionListViewModels: [
      { paymentOptionId: 0, paymentOptionName: '' },
    ],
  };
  const adminConfigs: {
    blobUrlRootDirectory: string;
    blorUrl: string;
  } = {
    blobUrlRootDirectory: '',
    blorUrl: '',
  };

  try {
    // console.log(domain, 'doman is this');
    await Promise.allSettled([GetStoreID(domain), GetAdminAppConfigs()]).then(
      (response) => {
        if (response[0].status === 'fulfilled' && response[0].value) {
          const res = response[0].value;
          let paymentMethod: {
            paymentOptionId: number;
            paymentOptionName: any;
          }[] = [];
          res.storeXPaymetnOptionListViewModels.map((el: any) =>
            paymentMethod.push({
              paymentOptionId: el.paymentOptionId,
              paymentOptionName: el.paymentOptionName,
            }),
          );

          store.storeXPaymetnOptionListViewModels = paymentMethod;
          store.storeId = res.id;
          store.firstLogoCharge = res.firstLogoCharge;
          store.secondLogoCharge = res.secondLogoCharge;
          store.code = res.code;
          store.isAttributeSaparateProduct = res.isAttributeSaparateProduct;
          store.cartCharges = {
            isSmallRun: res.isSmallRun,
            smallRunLimit: res.smallRunLimit,
            smallRunFeesCharges: res.smallRunFeesCharges,
            isLogoSetupCharges: res.isLogoSetupCharges,
            logoSetupCharges: res.logoSetupCharges,
          };
          store.storeTypeId = res.storeTypeId;
          store.storeName = res.name;
          store.urls = {
            logo: res.logoUrl,
            favicon: res.favicon,
          };
          store.isSewOutEnable = res.isSewOutEnable;
          store.sewOutCharges = res.sewOutCharges;
          store.firstLineCharges = res.firstLineCharges;
          store.secondLineCharges = res.secondLineCharges;
          store.shippingChargeType = res.shippingChargeType;
          store.thirdPartyLogin = res.thirdPartyLogin;
          store.bothLogin = res.bothLogin;
          store.isLinepersonalization = res.isLinepersonalization;
        }
        if (response[1].status === 'fulfilled' && response[1].value) {
          adminConfigs.blorUrl = response[1].value['azure:BlobUrl'];
          adminConfigs.blobUrlRootDirectory =
            response[1].value['cdn:RootDirectory'];
        }
      },
    );

    return {
      store: store,
      adminConfig: adminConfigs,
    };
  } catch (error) {
    conditionalLog_V2({
      data: error,
      show: __console_v2.allCatch,
      type: 'CATCH',
      name: '_AppController - Something went wrong',
    });
    return null;
  }
};
