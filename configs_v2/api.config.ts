import { _globalStore } from 'store.global';

let mediaBaseUrl = _globalStore.blobUrl;
export interface _Config {
  baseUrl: {
    klaviyo: string;
    klaviyo2: string;
    googleFonts: string;
    media: string;
  };
}

export const cssApis = {
  1: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/corporategear/main-new-cg.css`,
  21: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/corporategear/main-new-cg.css`,
  10: `https://ystore.us/HTML/RedefineCommerce/RedefineCommerce-front/bbcprod/main.css`,
  3: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/pkhealthgear/main-new-pkh.css`,
  23: `https://ystore.us/HTML/RedefineCommerce/Ecom-front/gamedaygear/main.css`,
  108: `https://ystore.us/HTML/RedefineCommerce/Ecom-front/usaa/main.css`,
  134: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/bacarditogo/main.css`,
  135: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/bbcprod/main.css`,
  139: `https://www.ystore.us/HTML/RedefineCommerce/Ecom-front/bain/main.css`,
  27: `http://ystore.us/HTML/RedefineCommerce/Ecom-front/bain/main.css`,
  22: `http://ystore.us/HTML/RedefineCommerce/Ecom-front/gamedaygear/main.css`,
};

const dev: _Config = {
  baseUrl: {
    klaviyo: `https://static.klaviyo.com/onsite/js/klaviyo.js`,
    klaviyo2: 'https://a.klaviyo.com/',
    googleFonts: 'https://fonts.googleapis.com/',
    media: mediaBaseUrl,
  },
};

const stage: _Config = {
  baseUrl: {
    klaviyo: `https://static.klaviyo.com/onsite/js/klaviyo.js`,
    klaviyo2: 'https://a.klaviyo.com/',
    googleFonts: 'https://fonts.googleapis.com/',
    media: mediaBaseUrl,
  },
};

const prod: _Config = {
  baseUrl: {
    klaviyo: `https://static.klaviyo.com/onsite/js/klaviyo.js`,
    klaviyo2: 'https://a.klaviyo.com/',
    googleFonts: 'https://fonts.googleapis.com/',
    media: mediaBaseUrl,
  },
};

let config: _Config;

switch (process.env.REACT_APP_STAGE) {
  case 'stagging':
    config = dev;
    break;
  case 'staging':
    config = stage;
    break;
  case 'production':
    config = prod;
    break;
  default:
    config = dev;
    break;
}
export default config;
