export const queryParam = {
  TEAM: 'team',
  INDIVIDUAL: 'individual',
};

export const defaultRoute = '/';

export const paths = {
  HOME: defaultRoute,
  PRODUCT: '/product',
  DISCOUNTED: '/discontinued.html',
  SPECIAL_REQUEST: '/special_request',
  PRODUCT_LISTING: '/product-list',
  NOT_FOUND: '/not-found',
  CHECKOUT: '/Checkout/Index',
  GIFT_CARDS: '/giftcards',
  GIFT_CARD_DETAILS: '/giftcards/:giftId',
  loggedInMenu: {
    title: '/myaccount/accountsettings',
    order: '/Orders',
    settings: '/myaccount/accountsettings',
    help: '/help',
    manageLogo: '/ManageLogo/ManageLogo',
  },
  myAccount: {
    account_settings: '/myaccount/accountsettings',
    user_management: '/myaccount/UserManagement',
    manage_logo: '/myaccount/ManageLogo',
    orders: '/Orders',
    order_details: 'Orders/Orderdetails',
    address: '/myaccount/Address',
    edit_shipping_address: '/myaccount/edit-shipping-address',
    edit_billing_address: '/myaccount/edit-billing-address',
    editShippingAddress: 'edit-shipping-address',
    editBillingAddress: 'edit-billing-address',
  },
  SIGN_UP: '/CreateAccount/SignUp',
  THANK_YOU: '/Orders/Thankyou',
  thankYou: {
    notAuthorized: defaultRoute,
  },
  CART: '/cart/IndexNew.html',
  cart: {
    keepShopping: defaultRoute,
  },
  BRAND: '/brands.html',
  WISHLIST: '/wishlist',
  WRITE_A_REVIEW: '/writereview/writereview',
  REQUEST_CONSULTATION: '/Itempage/RequestConsultationProof',
  CUSTOMIZE_LOGO: '/customize',
  PRODUCT_COMPARE: '/Itempage/ProductComapre',
  Contact: '/Contact',
  ThankYou: '/Thankyou',
  STORIES: '/stories',
  PRIVACY_POLICY: '/privacy-policy.html',
  TERMS_OF_USE: '/terms-and-conditions.html',
};

export const __SpecialBreadCrumbsPaths = [
  {
    path: [
      paths.myAccount.account_settings,
      paths.myAccount.user_management,
      paths.myAccount.manage_logo,
      paths.myAccount.order_details,
      paths.myAccount.orders,
      paths.myAccount.address,
    ],
    directTo: null,
    name: 'My Account',
  },
  {
    path: [paths.CART],
    name: null,
    directTo: null,
  },
  {
    path: [paths.SIGN_UP],
    name: 'Create New Customer Account',
    directTo: null,
  },
  {
    path: [paths.WISHLIST],
    name: 'Wishlist',
    directTo: null,
  },
];
