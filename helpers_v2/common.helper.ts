import { __domain } from '@configs/page.config';
import { CG_STORE_CODE, __Cookie, __Params } from '@constants/global.constant';
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
import {
  getGTMHomeScript,
  getGTMScriptForAllStore,
  postGTMScript,
  postGTMScriptForAllStore,
} from '@services/header.service';
import { FetchPageThemeConfigs } from '@services/product.service';
import { conditionalLog_V2 } from './console.helper';

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// TYPEs ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

declare global {
  interface Window {
    dataLayer: any;
    openWidget: any;
    _learnq: any;
    __klKey: string;
  }
}

interface _ExtractCookies {
  userId: null | number;
  loggedIN: boolean;
  storeInfo: null | _StoreInfoCookies['value'];
  tempCustomerId: string | null;

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
    imageFolderP: string;
  };
}

interface _NextJsSetCookie {
  res: ServerResponse<IncomingMessage>;
  cookie: _StoreInfoCookies;
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// FUNCTIONS ---------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const extractFromLocalStorage = <T>(key: string): T | null => {
  let dataToReturn: null | T = null;
  const data = localStorage.getItem(key);

  if (data) {
    const decodedString = decodeURIComponent(data);
    return JSON.parse(decodedString);
  }

  return dataToReturn;
};

export const isNumberKey = (event: React.ChangeEvent<HTMLInputElement>) => {
  let keyAllowed = false;

  if ((event.nativeEvent as any).inputType === 'deleteContentBackward') {
    keyAllowed = true;
  }

  switch ((event.nativeEvent as any).data) {
    case 'Backspace':
      keyAllowed = true;
      break;
    case '.':
      keyAllowed = true;
      break;
    case 'Enter':
      keyAllowed = true;
      break;
    case '0':
      keyAllowed = true;
      break;
    case '1':
      keyAllowed = true;
      break;
    case '2':
      keyAllowed = true;
      break;
    case '3':
      keyAllowed = true;
      break;
    case '4':
      keyAllowed = true;
      break;
    case '5':
      keyAllowed = true;
      break;
    case '6':
      keyAllowed = true;
      break;
    case '7':
      keyAllowed = true;
      break;
    case '8':
      keyAllowed = true;
      break;
    case '9':
      keyAllowed = true;
      break;
    default:
      break;
  }
  return keyAllowed;
};

export const isStringyNumberKey = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  let keyAllowed = false;

  if ((event.nativeEvent as any).inputType === 'deleteContentBackward') {
    keyAllowed = true;
  }

  switch ((event.nativeEvent as any).data) {
    case 'Backspace':
      keyAllowed = true;
      break;
    case 'Enter':
      keyAllowed = true;
      break;
    case '0':
      keyAllowed = true;
      break;
    case '1':
      keyAllowed = true;
      break;
    case '2':
      keyAllowed = true;
      break;
    case '3':
      keyAllowed = true;
      break;
    case '4':
      keyAllowed = true;
      break;
    case '5':
      keyAllowed = true;
      break;
    case '6':
      keyAllowed = true;
      break;
    case '7':
      keyAllowed = true;
      break;
    case '8':
      keyAllowed = true;
      break;
    case '9':
      keyAllowed = true;
      break;
    case ',':
      keyAllowed = true;
      break;
    default:
      break;
  }
  return keyAllowed;
};

export const Logout = (
  logInUser: ActionCreatorWithPayload<
    | {
        id: number | null;
      }
    | 'CLEAN_UP',
    'userDetails/logInUser'
  >,
) => {
  setCookie(__Cookie.userId, '', 'EPOCH');
  logInUser('CLEAN_UP');
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

    const encodedStoreInfo = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.storeInfo)
      ?.split('=')[1];

    const tempCustomerId = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.tempCustomerId)
      ?.split('=')[1];

    const encodedEmpData = _cookiesArr
      .find((cookie) => cookie.split('=')[0] === __Cookie.empData)
      ?.split('=')[1];

    if (encodedStoreInfo) {
      const decodedStoreInfo = decodeURIComponent(encodedStoreInfo);
      const parsedStoreInfo: null | _StoreInfoCookies['value'] =
        (decodedStoreInfo && JSON.parse(decodedStoreInfo)) || null;
      expectedCookies.storeInfo = parsedStoreInfo;
    }

    return {
      userId: userId ? +userId : null,
      loggedIN: Boolean(userId),
      storeInfo: expectedCookies.storeInfo,
      tempCustomerId: tempCustomerId || null,
      adminConfigs: {
        companyId: expectedCookies.storeInfo?.companyId || 0,
        blobUrl: expectedCookies.storeInfo?.blobUrl || '',
        blobUrlDirectory: expectedCookies.storeInfo?.blobUrlRootDirectory || '',
        imageFolderPath: expectedCookies.storeInfo?.imageFolderP || '',
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
    cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;');
}

export const nextJsSetCookie = ({ res, cookie }: _NextJsSetCookie) => {
  let cValue: unknown = cookie.value;

  if (cookie.name === __Cookie.storeInfo) {
    cValue = JSON.stringify(cookie.value);
  }
  const encodedCValue = encodeURIComponent(cValue as string);
  res.setHeader('set-cookie', `${cookie.name}=${encodedCValue}; Path=/;`);
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

export const extractSlugName = (
  contextParam?: ParsedUrlQuery,
): { seName: string; otherParams: string[] | null } => {
  if (contextParam) {
    let params = contextParam['slug-id'] as string[];

    if (params && params.length > 0) {
      const lastElementIndex = params.length - 1;
      params[lastElementIndex] = params[lastElementIndex].replace('.html', '');
      const seName = params[lastElementIndex];

      if (seName.includes('.svg') || seName.includes('.png')) {
        return {
          seName: '/',
          otherParams: null,
        };
      }

      if (params.length === 1) {
        return {
          seName: seName,
          otherParams: null,
        };
      }

      return { seName: seName, otherParams: params };
    }
  }

  return {
    seName: '/',
    otherParams: null,
  };
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
  ipAddress: string;
  isForm: boolean;
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
  price?: number;
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
    price,
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
        logoNames: logoLocation.customizeLater,
        id: 0,
        sewOutAmount: 0,
        isSewOut: false,
        reUsableCustomerLogo: 0,
      },
    ];
  } else {
    cartLogoPersonDetailModels = logos.map((logo) => {
      return {
        ...personalization.defaultLogoDetail,
        logoUniqueId: '',
        id: 0,
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
          logo.logo.url === '' ? logoLocation.addLogoLater : 'Customize Logo',
        price: logo.location.cost,
        logoDate: new Date(),
        logoPositionImage: logo.location.image,
        originalLogoFilePath: logo.logo.url || '',
      };
    });
  }

  sizeQtys?.map((res) => {
    if (res !== null)
      cartLogoPersonModel.push({
        id: res.id || 0,
        attributeOptionId: res.attributeOptionId,
        attributeOptionValue: res.size,
        code: '',
        price: price ? price : res.price,
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
      ipAddress: '192.168.1.1',
      isForm: false,
      shoppingCartItemModel: {
        id: shoppingCartItemId ? shoppingCartItemId : 0,
        price: price ? price : totalPrice / totalQty,
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
        isEmployeeLoginPrice: false,
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
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
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

export const KlaviyoScriptHelper = (data: any) => {
  const __klaviyoKey = window?.__klKey || null;
  if (!__klaviyoKey) return;
  const _learnq = window?._learnq || [];
  _learnq.push(data);
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

export const getPageType = async (
  storeid: number,
  configname: 'productListing' | 'productDetail' | 'cartPage' | 'myAccountPage',
) => {
  let res = await FetchPageThemeConfigs('' + storeid, configname);
  return res;
};

//Track GA event using APIs for CG
export const GoogleAnalyticsTrackerForCG = async (
  eventScript: string,
  storeId: string | number,
  payload: Record<string, any>,
) => {
  if (Number(storeId) !== CG_STORE_CODE) return;
  if (!eventScript) {
    if (payload) {
      pushToDataLayerUtil(payload);
    }
    return;
  }
  const eventResponse = await postGTMScript(eventScript, payload);
  if (eventResponse) {
    pushToDataLayerUtil(eventResponse);
  }
};

export const GTMHomeScriptForCG = async (
  eventScript: string,
  storeId: number,
  customerId: number,
) => {
  if (Number(storeId) !== CG_STORE_CODE) return;
  const eventResponse = await getGTMHomeScript(
    storeId,
    eventScript,
    customerId,
  );
  if (eventResponse) {
    pushToDataLayerUtil(eventResponse);
  }
};

//Track GA event using APIs for all store expect CG
export const GoogleAnalyticsTrackerForAllStore = async (
  eventScript: string,
  storeId: string | number,
  payload: Record<string, any>,
) => {
  if (Number(storeId) === CG_STORE_CODE) return;
  if (!eventScript) {
    if (payload) {
      pushToDataLayerUtil(payload);
    }
    return;
  }
  const eventResponse = await postGTMScriptForAllStore(eventScript, payload);
  if (eventResponse) {
    pushToDataLayerUtil(eventResponse);
  }
};

export const GTMHomeScriptForAllStores = async (
  eventScript: string,
  storeId: number,
  customerId: number,
) => {
  if (Number(storeId) === CG_STORE_CODE) return;

  const eventResponse = await getGTMScriptForAllStore(
    storeId,
    eventScript,
    customerId,
  );
  if (eventResponse) {
    pushToDataLayerUtil(eventResponse);
  }
};

const pushToDataLayerUtil = (payload: Record<string, any>) => {
  const dataLayer = window?.dataLayer || null;
  if (dataLayer) {
    if (payload?.pageDataLayer)
      dataLayer.push({ ...JSON.parse(payload?.pageDataLayer) });
    if (payload?.pageDataLayer2)
      dataLayer.push({ ...JSON.parse(payload?.pageDataLayer2) });
    if (payload?.pageDataLayer3)
      dataLayer.push({ ...JSON.parse(payload?.pageDataLayer3) });
    if (payload?.pageItemDetails)
      dataLayer.push({ ...JSON.parse(payload?.pageItemDetails) });
  }
};

export const set_EnduserName = (endUserNameS: string) => {
  localStorage.setItem('endusername', endUserNameS);
};
export const remove_EnduserName = (key: string) => {
  localStorage.removeItem(key);
};
