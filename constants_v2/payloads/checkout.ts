export const AddOrderDefault = {
  id: 0,
  storeID: 0,
  isNew: true,
  shoppingCartID: 0,
  customerID: 0,
  firstName: '',
  lastName: '',
  email: '',
  notes: '',
  billingEqualsShipping: true,
  billingEmail: '',
  billingFirstName: '',
  billingLastName: '',
  billingCompany: '',
  billingAddress1: '',
  billingAddress2: '',
  billingSuite: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  billingCountry: '',
  billingPhone: '',
  shippingEmail: '',
  shippingFirstName: '',
  shippingLastName: '',
  shippingCompany: '',
  shippingAddress1: '',
  shippingAddress2: '',
  shippingSuite: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  shippingCountry: '',
  shippingPhone: '',
  shippingMethod: '',
  okToEmail: true,
  cardName: '',
  cardType: '',
  cardNumber: '',
  cardVarificationCode: '',
  cardExpirationMonth: '',
  cardExpirationYear: '',
  couponCode: '',
  couponDiscountAmount: 0,
  giftCertiSerialNumber: '',
  giftCertificateDiscountAmount: 0,
  quantityDiscountAmount: 0,
  levelDiscountPercent: 0,
  levelDiscountAmount: 0,
  customDiscount: 0,
  orderSubtotal: 0,
  orderTax: 0,
  orderTotal: 0,
  authorizationCode: '',
  authorizationResult: '',
  authorizationPNREF: '',
  transactionCommand: '',
  lastIPAddress: '',
  paymentGateway: '',
  orderStatus: '',
  transactionStatus: '',
  avsResult: '',
  captureTxCommand: '',
  captureTXResult: '',
  authorizedOn: new Date(),
  capturedOn: new Date(),
  orderDate: new Date(),
  deleted: true,
  referrer: '',
  refundedAmount: 0,
  chargeAmount: 0,
  authorizedAmount: 0,
  adjustmentAmount: 0,
  orderNotes: '',
  isGiftWrap: true,
  giftWrapAmt: 0,
  inventoryWasReduced: true,
  refOrderID: '',
  isMobileOrder: true,
  batchId: 0,
  shippingLabelCost: 0,
  shippingLabelWeight1: 0,
  shippingLabelPackageHeight: 0,
  shippingLabelPackageWidth: 0,
  shippingLabelPackageLength: 0,
  noOfLabels: 0,
  salesAgentId: 0,
  isApproved: true,
  dimensionValue: 0,
  giftWrapPrice: 0,
  shipPromotionDiscount: 0,
  isFullFillment: true,
  isAmazonuplaod: true,
  cvvResult: '',
  isMailSend: true,
  shippedByStamps: true,
  logoFinalTotal: 0,
  lineFinalTotal: 0,
  inHandDate: new Date(),
  storeCredit: 0,
  chargeHostedPaymentID: '',
  sewout: true,
  sewoutTotal: 0,
  digitalTotal: 0,
  gclid: '',
  isPayLater: true,
  orderCheckoutNote: '',
  isCreditLimit: false,
  endUserName: '',
  decorationDate: new Date(),
  isExport: false,

  // EMPLOYEE LOGIN
  orderShippingCosts: 0, // editable
  paymentMethod: '', // PAYMENTPENDING
  // EMPLOYEE LOGIN SPECIFIC
  empSalesRap: '',
  employeeID: 0,
  salesRepName: '',
  empSourceName: '',
  empSourceMedium: '',
  isAllowPo: false,
  formId: '',
};

export const addAddress = {
  id: 0,
  rowVersion: '',
  location: '',
  ipAddress: '',
  macAddress: '00-00-00-00-00-00',
  customerId: 0,
  firstname: '',
  lastName: '',
  companyName: '',
  email: '',
  address1: '',
  address2: '',
  suite: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  fax: '',
  countryName: '',
  countryCode: '',
  addressType: '',
  isDefault: false,
  recStatus: 'A',
};
