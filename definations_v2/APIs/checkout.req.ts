export interface AddOrderRequest {
  id: number;
  storeID: number;
  isNew: boolean;
  shoppingCartID: number;
  customerID: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  notes: string;
  billingEqualsShipping: boolean;
  billingEmail: string;
  billingFirstName?: string;
  billingLastName?: string;
  billingCompany?: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingPhone: string;
  shippingEmail: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingCompany?: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingSuite: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: string;
  shippingMethod: string;
  okToEmail: boolean;
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  couponCode: string;
  couponDiscountAmount: number;
  giftCertiSerialNumber: string;
  giftCertificateDiscountAmount: number;
  quantityDiscountAmount: number;
  levelDiscountPercent: number;
  levelDiscountAmount: number;
  customDiscount: number;
  orderSubtotal: number;
  orderTax: number;
  orderShippingCosts: number;
  orderTotal: number;
  authorizationCode: string;
  authorizationResult: string;
  authorizationPNREF: string;
  transactionCommand: string;
  lastIPAddress: string;
  paymentGateway: string;
  paymentMethod: string;
  orderStatus: string;
  transactionStatus: string;
  avsResult: string;
  captureTxCommand: string;
  captureTXResult: string;
  authorizedOn: Date;
  capturedOn: Date;
  orderDate: Date;
  deleted: boolean;
  referrer: string;
  refundedAmount: number;
  chargeAmount: number;
  authorizedAmount: number;
  adjustmentAmount: number;
  orderNotes: string;
  isGiftWrap: boolean;
  giftWrapAmt: number;
  inventoryWasReduced: boolean;
  refOrderID: string;
  isMobileOrder: boolean;
  batchId: number;
  shippingLabelCost: number;
  shippingLabelWeight1: number;
  shippingLabelPackageHeight: number;
  shippingLabelPackageWidth: number;
  shippingLabelPackageLength: number;
  noOfLabels: number;
  salesAgentId: number;
  isApproved: boolean;
  dimensionValue: number;
  giftWrapPrice: number;
  shipPromotionDiscount: number;
  isFullFillment: boolean;
  isAmazonuplaod: boolean;
  cvvResult: string;
  isMailSend: boolean;
  shippedByStamps: boolean;
  logoFinalTotal: number;
  lineFinalTotal: number;
  isExport: boolean;
  inHandDate: Date;
  storeCredit: number;
  chargeHostedPaymentID: string;
  sewout: boolean;
  sewoutTotal: number;
  digitalTotal: number;
  empSourceName: string;
  empSourceMedium: string;
  gclid: string;
  isPayLater: boolean;
  orderCheckoutNote: string;
  empSalesRap: string;
  employeeID: number;
  isCreditLimit: boolean;
  endUserName: string;
  decorationDate: Date;
  orderSmallRunFee: number;
  orderLogoSetupFee: number;
  orderSubType?: string;
}
