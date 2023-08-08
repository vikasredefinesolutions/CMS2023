import defaultProductImage from './images/newNavy.png';

const defaultImages = {
  logoWillComeHere: defaultProductImage,
  product: defaultProductImage,
};

export const __StaticImg = {
  loggedInMenu: {
    help: { src: './assets/images/header-help-icon.png' },
    order: { src: './assets/images/header-order-icon.png' },
    settings: { src: './assets/images/header-setting-icon.png' },
    signOut: { src: './assets/images/header-sign-out.png' },
  },
  loaderGif: './assets/images/loading-load.gif',
  noImageFound: defaultImages.product,
  product: defaultImages.product,
  orderDetails: {
    logoWillComeHere: defaultImages.logoWillComeHere,
  },
};
