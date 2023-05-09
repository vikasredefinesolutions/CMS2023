import { __domain } from '@configs/page.config';
import { __Cookie, __Params } from '@constants/global.constant';
import { EmployeeDataObject } from '@controllers/EmployeeController';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';
import { CartLogoPersonDetailModel, CartLogoPersonModel } from '@services/cart';
import {
  _CartLogoPersonDetailModel,
  _CartLogoPersonModel,
} from '@services/product.service.type';
import { IncomingMessage, ServerResponse } from 'http';
import { StaticImageData } from 'next/image';
import router from 'next/router';
import { __StaticImg } from 'public/assets/images.asset';
import { ParsedUrlQuery } from 'querystring';

import { logoLocation } from '@constants/enum';
import { CartReq } from '@definations/APIs/cart.req';
import {
  _LogoDetail,
  _Product_SizeQtys,
} from '@redux/slices/product.slice.types';
import { FetchConfig } from '@services/product.service';
import { conditionalLog_V2 } from './console.helper';

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// TYPEs ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

declare global {
  interface Window {
    dataLayer: any;
  }
}

interface _ExtractCookies {
  userId: null | number;
  loggedIN: boolean;
  storeInfo: null | _StoreInfoCookies['value'];
  tempCustomerId: string | null;
  empData: EmployeeDataObject | null;
  customScripts: null | _CustomScriptsCookies['value'];
  googleTags: null | _GoogleTagsCookies['value'];
  adminConfigs: null | {
    imageFolderPath: string;
    blobUrl: string;
    blobUrlDirectory: string;
    companyId: number;
  };
}

interface _StoreInfoCookies {
  name: 'storeInfo';
  value: {
    storeId: number;
    isAttributeSaparateProduct: boolean;
    domain: string;
    storeCode: string;
    storeTypeId: number;
    favicon: string;
    logoUrl: string;
    companyId: number;
    blobUrl: string;
    blobUrlRootDirectory: string;
    imageFolderPath: string;
  };
}

export interface _CustomScriptsCookies {
  name: 'customScripts';
  value: {
    googleFonts: string;
    customHeadScript: string;
    customFooterScript: string;
    customGlobalBodyScript: string;
    customGoogleVerification: string;
  };
}
export interface _GoogleTagsCookies {
  name: 'googleTags';
  value: string;
}

interface _NextJsSetCookie {
  res: ServerResponse<IncomingMessage>;
  cookie: _StoreInfoCookies | _CustomScriptsCookies | _GoogleTagsCookies;
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const Logout = (
  logInUser: ActionCreatorWithPayload<
    {
      id: number | null;
    },
    'userDetails/logInUser'
  >,
) => {
  setCookie(__Cookie.userId, '', 'EPOCH');
  logInUser({ id: null });
  router.push('/');
  return;
};

export const isItServer = (): boolean => {
  return !(typeof window != 'undefined' && window.document);
};

//////////////////////////////////////////////////////////////////////
//////// COOKIES Related  --------------------------------////////////

export const extractCookies = (
  cookies: string | undefined,
  type: 'browserCookie' | 'serverCookie' = 'serverCookie',
): _ExtractCookies => {
  let _cookies = cookies;

  const expectedCookies: _ExtractCookies = {
    userId: null,
    loggedIN: false,
    storeInfo: null,
    tempCustomerId: null,
    empData: null,
    customScripts: null,
    googleTags: null,
    adminConfigs: null,
  };

  const server = isItServer();

  if (type === 'browserCookie' && !server) {
    _cookies = document.cookie;
  }

  if (_cookies) {
    const _cookiesArr = _cookies.split('; ');

    const userId = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.userId)
      ?.split('=')[1];

    const storeInfo = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.storeInfo)
      ?.split('=')[1];

    const tempCustomerId = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.tempCustomerId)
      ?.split('=')[1];

    const empData = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.empData)
      ?.split('=')[1];

    const customScripts = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.customScripts)
      ?.split('=')[1];

    const googleTags = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.googleTags)
      ?.split('=')[1];

    const parsedStoreInfo: null | _StoreInfoCookies['value'] =
      (storeInfo && JSON.parse(storeInfo)) || null;

    const parsedCustomScripts: null | _CustomScriptsCookies['value'] =
      (customScripts && JSON.parse(customScripts)) || null;

    return {
      userId: userId ? +userId : null,
      loggedIN: Boolean(userId),
      storeInfo: parsedStoreInfo,
      tempCustomerId: tempCustomerId || null,
      empData: (empData && JSON.parse(empData)) || null,
      customScripts: parsedCustomScripts || null,
      googleTags: googleTags || '',
      adminConfigs: {
        companyId: parsedStoreInfo?.companyId || 0,
        blobUrl: parsedStoreInfo?.blobUrl || '',
        blobUrlDirectory: parsedStoreInfo?.blobUrlRootDirectory || '',
        imageFolderPath: parsedStoreInfo?.imageFolderPath || '',
      },
    };
  }
  return expectedCookies;
};

const personalization: {
  defaultLogo: _CartLogoPersonModel;
  defaultLogoDetail: _CartLogoPersonDetailModel;
} = {
  defaultLogo: {
    id: 0,
    attributeOptionId: 0,
    attributeOptionValue: '',
    code: '',
    price: 0,
    quantity: 0,
    estimateDate: new Date(),
    isEmployeeLoginPrice: 0,
  },
  defaultLogoDetail: {
    logoPrice: 0,
    logoQty: 0,
    logoFile: '',
    logoLocation: '',
    logoTotal: 0,
    colorImagePath: '',
    logoUniqueId: '',
    price: 0,
    logoColors: '',
    logoNotes: '',
    logoDate: new Date(),
    logoNames: '',
    digitalPrice: 0,
    logoPositionImage: '',
    oldFilePath: '',
    originalLogoFilePath: '',
    isSewOut: false,
    sewOutAmount: 0,
    reUsableCustomerLogo: 0,
  },
};
export function setCookie(
  cName: string,
  cValue: string,
  expDays: number | 'EPOCH' | 'Session',
) {
  let date = new Date();
  if (expDays === 'EPOCH') {
    date.setTime(0);
  }
  if (typeof expDays === 'number') {
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  }
  let expires = 'expires=' + date.toUTCString();
  if (expDays === 'Session') {
    expires = expDays;
  }
  document.cookie = cName + '=' + cValue + '; ' + expires + `Path=/; `;
}

export function deleteCookie(cookieName: string) {
  return (document.cookie =
    cookieName + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; ');
}

export const nextJsSetCookie = ({ res, cookie }: _NextJsSetCookie) => {
  let cValue: unknown = cookie.value;

  if (cookie.name === __Cookie.storeInfo) {
    cValue = JSON.stringify(cookie.value);
  }

  if (cookie.name === __Cookie.customScripts) {
    cValue = JSON.stringify(cookie.value);
  }

  res.setHeader('set-cookie', `${cookie.name}=${cValue}; Path=/;`);
};

//////////////////////////////////////////////////////////////////////
//////// Functionalities Realted  ------------------------////////////

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeDuplicates(arr: any[]) {
  return arr.filter(
    (arr, index, self) =>
      index === self.findIndex((t) => t.seName === arr.seName),
  );
}

export function addCustomEvents(name: 'localStorage') {
  if (name === 'localStorage') {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;
    const addItemEvent = new Event('itemInserted');
    const removeItemEvent = new Event('itemRemoved');

    localStorage.setItem = function (key, value) {
      document.dispatchEvent(addItemEvent);
      originalSetItem.apply(this, [key, value]);
    };
    localStorage.removeItem = function (key) {
      document.dispatchEvent(removeItemEvent);
      originalRemoveItem.apply(this, [key]);
    };
  }
}

//////////////////////////////////////////////////////////////////////
//////// Store Related  ----------------------------------////////////

export function domainToShow(payload: {
  domain: string | undefined;
  showProd: boolean;
}): string {
  let domain = __domain.localDomain; // DEFAULT DOMAIN

  if (payload.showProd && payload.domain) {
    domain = payload.domain;
  }

  conditionalLog_V2({
    show: !payload.domain,
    type: 'SPECIAL_FUNCTION',
    name: 'domainToShow',
    data: payload.domain,
  });

  return domain;
}

export const c_getSeName = (
  component: 'PRODUCT DETAILS' | 'PRODUCT COMPARE',
) => {
  const pathName = window.location.pathname;
  let slug = '';

  if (component === 'PRODUCT DETAILS') {
    const withoutHTML = pathName.split('.')[0];
    slug = withoutHTML.split('/')[1];
  }

  if (component === 'PRODUCT COMPARE') {
    slug = '';
  }

  return slug;
};

export const extractSlugName = (contextParam?: ParsedUrlQuery) => {
  let slug = '';
  let slugID: string[] = [];
  if (contextParam) {
    slugID = contextParam['slug-id'] as string[];
    if (slugID) {
      slug = slugID.at(-1)?.replace('.html', '') || '';
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const paramsSlug = contextParam!;

      slug = paramsSlug
        ? (paramsSlug?.slug as string).replace('.html', '')
        : '';
    }
  }
  return { slug, slugID };
};

interface _ParamsReturn {
  giftId: string | null;
}

export const extractIdFromPathName = (
  contextParam: ParsedUrlQuery | undefined,
): _ParamsReturn => {
  const params: _ParamsReturn = {
    giftId: null,
  };

  if (contextParam) {
    const giftId = contextParam[__Params.giftId];
    if (giftId && typeof giftId === 'string') {
      params.giftId = giftId;
    }
  }

  return {
    giftId: params.giftId,
  };
};

type _Props = {
  userId: number;
  note: string;
  storeId: number;
  isEmployeeLoggedIn: boolean;
  sizeQtys: Array<_Product_SizeQtys | null> | null;
  productDetails: {
    productId: number;
    color: {
      altTag: string;
      imageUrl: string;
      name: string;
      attributeOptionId: number;
    };
    inventory: null | _ProductInventoryTransfomed;
  };
  total: {
    totalPrice: number;
    totalQty: number;
  };
  shoppingCartItemId: number;
  logos: _LogoDetail[] | null;
  isSewOutEnable: boolean;
  sewOutCharges: number;
};

export const getAddToCartObject = async (product: _Props): Promise<CartReq> => {
  const {
    userId,
    note,
    sizeQtys,
    productDetails,
    total,
    shoppingCartItemId,
    storeId,
    logos,
    isSewOutEnable,
    sewOutCharges,
    isEmployeeLoggedIn,
  } = product;
  const { totalPrice, totalQty } = total;
  let cartLogoPersonModel: CartLogoPersonModel[] = [];
  let cartLogoPersonDetailModels: CartLogoPersonDetailModel[] = [];

  // if (logos.length > 0) {
  if (!logos || logos.length === 0) {
    cartLogoPersonDetailModels = [
      {
        ...personalization.defaultLogoDetail,
        colorImagePath: productDetails.color.imageUrl,
        logoNames: logoLocation.customizeLogo,
      },
    ];
  } else {
    cartLogoPersonDetailModels = logos.map((logo) => {
      return {
        ...personalization.defaultLogoDetail,
        logoUniqueId: '',
        logoColors: '',
        logoNotes: '',
        digitalPrice: 0,
        oldFilePath: '',
        isSewOut: isSewOutEnable,
        sewOutAmount: sewOutCharges,
        reUsableCustomerLogo: 0,
        logoPrice: logo.location.cost,
        logoQty: totalQty,
        logoFile: logo.logo.url || '',
        logoTotal: totalQty * logo.location.cost,
        logoLocation: logo.location.name,
        colorImagePath: productDetails.color.imageUrl,
        logoNames:
          logo.logo.url === '' ? logoLocation.addLogoLater : logo.logo.name,
        price: logo.location.cost,
        logoDate: new Date(),
        logoPositionImage: logo.location.image,
        originalLogoFilePath: logo.logo.url || '',
      };
    });
  }

  sizeQtys?.map((res) => {
    console.log(res, 'resssss');
    if (res !== null)
      cartLogoPersonModel.push({
        id: res.id || 0,
        attributeOptionId: res.attributeOptionId,
        attributeOptionValue: res.size,
        code: '',
        price: res.price,
        quantity: res.qty,
        estimateDate: new Date(),
        isEmployeeLoginPrice: 0,
      });
  });

  const cartObject: CartReq = {
    addToCartModel: {
      customerId: userId,
      productId: productDetails.productId,
      storeId: storeId,
      isempLogin: isEmployeeLoggedIn,

      shoppingCartItemModel: {
        id: shoppingCartItemId ? shoppingCartItemId : 0,
        price: totalPrice / totalQty,
        quantity: totalQty,
        weight: 0,
        productType: 0,
        discountPrice: 0,
        logoTitle: productDetails.color.altTag,
        logogImagePath: productDetails.color.imageUrl,
        perQuantity: 0,
        appQuantity: 0,
        status: 2,
        discountPercentage: 0,
        productCustomizationId: 0,
        itemNotes: note || '',
        isEmployeeLoginPrice: 0,
      },
      shoppingCartItemsDetailModels: [
        {
          attributeOptionName: 'Color',
          attributeOptionValue: productDetails.color.name,
          attributeOptionId: +productDetails.color.attributeOptionId,
        },
      ],
      cartLogoPersonModel: cartLogoPersonModel,
      cartLogoPersonDetailModels: cartLogoPersonDetailModels, // for corporate it will be []
    },
  };

  return cartObject;
};

export const generateImageUrl = (
  src: null | string | StaticImageData,
  isStatic: boolean,
  mediaBaseUrl: string,
): string | StaticImageData => {
  if (src === null) return __StaticImg.product;

  if (isStatic) {
    return src;
  }

  if (typeof src === 'string') {
    const with_or_without_HTTP = src.includes('http');
    if (with_or_without_HTTP) return src;
    if (with_or_without_HTTP === false) return `${mediaBaseUrl}${src}`;
  }

  return __StaticImg.noImageFound;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

var special = [
  'zeroth',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelvth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
];

var deca = [
  'twent',
  'thirt',
  'fourt',
  'fift',
  'sixt',
  'sevent',
  'eight',
  'ninet',
];

export const numberToOrdinalString = (n: number) => {
  if (n < 20) return capitalizeFirstLetter(special[n]);
  if (n % 10 === 0)
    return capitalizeFirstLetter(deca[Math.floor(n / 10) - 2] + 'ieth');
  return capitalizeFirstLetter(
    deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10],
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KlaviyoScriptTag = (data: any) => {
  const newScript = document.createElement('script');
  newScript.setAttribute('type', 'text/javascript');

  const inlineScript = document.createTextNode(
    `var _learnq = _learnq || [];
_learnq.push(${JSON.stringify(data)}); 
`,
  );
  newScript.appendChild(inlineScript);
  document.head.appendChild(newScript);
};

export const getPrice = ({
  loggedIn,
  msrp = 0,
  salePrice = 0,
}: {
  loggedIn: boolean;
  msrp: number;
  salePrice: number;
}) => {
  let priceToDisplay = msrp;

  if (loggedIn && salePrice < msrp) {
    priceToDisplay = salePrice;
  }

  if (isNaN(priceToDisplay)) {
    priceToDisplay = 0;
  }
  return priceToDisplay;
};

export const extractAPIErrors = (errors: { [key: string]: string }) => {
  const err: string[] = [];
  for (const key in errors) {
    err.push(errors[key]);
  }
  return err;
};

export const _Logout = (
  logInUser: ActionCreatorWithPayload<
    {
      id: number | null;
    },
    'userDetails/logInUser'
  >,
) => {
  setCookie(__Cookie.userId, '', 'EPOCH');
  logInUser({ id: null });
  router.push('/');
  return;
};

export const getPageType = async (storeid: number, configname: string) => {
  let res = await FetchConfig('' + storeid, configname);
  return res;
};

export const CaptureGTMEvent = (payload: any) => {
  const dataLayer = window?.dataLayer || null;
  if (dataLayer) {
    dataLayer.push({ ecommerce: null });
    dataLayer.push({ ...payload });
  }
};
