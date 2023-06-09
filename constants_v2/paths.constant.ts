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
    editaddress: '/myaccount/edit-shipping-address',
    billingeditaddress: '/myaccount/edit-billing-address',
    additionalTab: '/myaccount/[edit]',
  },
  SIGN_UP: '/CreateAccount/SignUp',
  SIGNUP_TEAM: '/CreateAccount/SignupTeams',
  THANK_YOU: '/Orders/Thankyou',
  thankYou: {
    notAuthorized: defaultRoute,
  },
  CART: '/cart/IndexNew.html',
  CATALOGS: '/catalogs.html',
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
  PRIVACY_POLICY: '/privacy-policy.html', ///privacy-policy.html',
  TERMS_OF_USE: '/terms-and-conditions.html',
  PKHGTERMS_OF_USE: '/termsandcondition.html',
  PATAGONIA_CUSTOM_REQUEST_FORM: '/Custom-Requests',
  REQUEST_THANKYOU: '/request-thankyou.html',
  SB_PRODUCT_LISTING: '/ItemList/Index',
  CONTACT_US: '/contact-us.html',
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
  {
    path: [paths.PATAGONIA_CUSTOM_REQUEST_FORM],
    name: 'Patagonia Special Request Form',
    directTo: null,
  },
  {
    path: [paths.REQUEST_THANKYOU],
    name: 'Request Thankyou',
    directTo: null,
  },
  {
    path: ['/myaccount/edit-billing-address'],
    name: 'Billing Address',
    directTo: null,
  },
  {
    path: ['/myaccount/edit-shipping-address'],
    name: 'Shipping Address',
    directTo: null,
  },
  {
    path: ['/gift-cards/listing'],
    name: 'Gift Card',
    directTo: null,
  },
  {
    path: ['/gift-cards/[giftId]'],
    name: 'Gift Card {}',
    directTo: null,
  },
];
