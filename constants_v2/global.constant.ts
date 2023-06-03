import { Option } from '@templates/consultation/Consultation_Type1/components/ConsultationInput';
import { commonMessage } from './successError.text';

/* eslint-disable no-unused-vars */
export const __Login = {
  something_went_wrong: commonMessage.somethingWentWrong,
};

export enum __Cookie {
  loggedIn = 'loggedIn',
  userId = 'userId',
  storeInfo = 'storeInfo',
  tempCustomerId = 'tempCustomerId',
  empData = 'emp_data',
  companyId = 'companyId',
  customScripts = 'customScripts',
  googleTags = 'googleTags',
}

// cookie_expiry in days
export const __Cookie_Expiry = {
  userId: 2,
  storeBuilder: {
    tempCustomerId: 7,
  },
  Session: 'Session',
};

export enum __Error {
  storeIdMissing = 'STORE_ID is missing',
  noPageTypeFound = 'PageType is missing',
}

export const __LocalStorage = {
  recetlyViewedProducts: '_rcvwp',
  compareProducts: '_cmpPdts',
  tempCustomerId: 'tempCustomerId',
  empData: 'empData',
};

export const __Params = {
  giftId: 'giftId',
};

export const __UserMessages = {
  signUpPage: {
    SomethingWentWrong: commonMessage.somethingWentWrong,
    SuccessFullyAccountCreated: 'Account Created Successfully!!!',
  },
};
export const perPageCount = 18;
export const maximumWordsForChestLogoPersonalization: number = 26;
export const maximumWordsForSleeveLogoPersonalization: number = 20;

export const employeeData = {
  secretPass: 'XkhZG4fW2t2W',
};

export const showcolors = 4;
export const listing_max_showcolors = 7;
export const zeroValue = 0;
export const fallbackStoreId = 1;
export const maximumItemsForFetch = 4;

export const CustomizeLater =
  'A Gear Expert will contact you to discuss the customization of this product.';

export const cartRemoveConfirmMessage = 'Are you sure want to remove?';
export const cartQuantityUpdateConfirmMessage =
  'Are you sure want to update the product quantity';

export enum __pageTypeConstant {
  blog = 'blog',
  stories = 'stories',
  brand = 'brand',
  category = 'category',
  notFound = '404',
  productDetails = 'product',
  cmsPages = 'topic',
}

//Regex for multiple phone number pattern test
export const phonePattern1 = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/; //Matches xxx-xxx-xxxx
export const phonePattern2 = /^\(?([0-9]{3})\)?[.]([0-9]{3})[.]([0-9]{4})$/; //Matches xxx.xxx.xxxx
export const phonePattern3 = /^\(?([0-9]{3})\)?[ ]([0-9]{3})[ ]([0-9]{4})$/; //Matches xxx xxx xxxx
export const phonePattern4 = /^[0-9]{10}$/; //Matches xxxxxxxxxx

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const CG_STORE_CODE = 21;
export const GG_STORE_CODE = 2;

export const states: Option[] = [
  { text: 'State/Provice *', value: '' },
  { text: 'Alabama', value: '1' },
  { text: 'Alaska', value: '2' },
  { text: 'American Samoa', value: '3' },
  { text: ' Armed Forces Americas (except Canada)', value: '4' },
  { text: '  Armed Forces Eur., Mid. East, Africa, Canada', value: '5' },
  { text: 'Armed Forces Pacific', value: '6' },
  { text: 'Arizona', value: '7' },
  { text: 'Arkansas', value: '8' },
  { text: 'California', value: '9' },
  { text: 'Colorado', value: '10' },
  { text: 'Connecticut', value: '11' },
  { text: 'Delaware', value: '12' },
  { text: 'District of Columbia', value: '13' },
  { text: 'Federated States of Micronesia', value: '14' },
  { text: 'Florida', value: '15' },
  { text: 'Georgia', value: '16' },
  { text: 'Guam', value: '17' },
  { text: 'Hawaii', value: '18' },
  { text: 'Idaho', value: '19' },
  { text: 'Illinois', value: '20' },
  { text: 'Indiana', value: '21' },
  { text: 'Iowa', value: '22' },
  { text: 'Kansas', value: '23' },
  { text: 'Kentucky', value: '24' },
  { text: 'Louisiana', value: '25' },
  { text: 'Maine', value: '26' },
  { text: 'Marshall Islands', value: '27' },
  { text: 'Maryland', value: '28' },
  { text: 'Massachusetts', value: '29' },
  { text: 'Michigan', value: '30' },
  { text: 'Minnesota', value: '31' },
  { text: 'Mississippi', value: '32' },
  { text: 'Missouri', value: '33' },
  { text: 'Montana', value: '34' },
  { text: 'Northern Mariana Islands', value: '35' },
  { text: 'Nebraska', value: '36' },
  { text: 'Nevada', value: '37' },
  { text: 'New Hampshire', value: '38' },
  { text: 'New Jersey', value: '39' },
  { text: 'New Mexico', value: '40' },
  { text: 'New York', value: '41' },
  { text: 'North Carolina', value: '42' },
  { text: 'North Dakota', value: '43' },
  { text: 'Ohio', value: '44' },
  { text: 'Oklahoma', value: '45' },
  { text: 'Oregon', value: '46' },
  { text: 'Palau', value: '47' },
  { text: 'Pennsylvania', value: '48' },
  { text: 'Puerto Rico', value: '49' },
  { text: 'Rhode Island', value: '50' },
  { text: 'South Carolina', value: '51' },
  { text: 'South Dakota', value: '52' },
  { text: 'Tennessee', value: '53' },
  { text: 'Texas', value: '54' },
  { text: 'Utah', value: '55' },
  { text: 'Vermont', value: '56' },
  { text: 'Virgin Islands', value: '57' },
  { text: 'Virginia', value: '58' },
  { text: 'Washington', value: '59' },
  { text: 'West Virginia', value: '60' },
  { text: 'Wisconsin', value: '61' },
  { text: 'Wyoming', value: '62' },
];

export const GDG_RequestQuote_DesiredQuantities = [
  { text: 'Select Quantity*', value: '' },
  { text: '10-24', value: '1' },
  { text: '25-49', value: '2' },
  { text: '50-99', value: '3' },
  { text: '100+', value: '4' },
];

export const formFields: any = [
  {
    name: 'firstName',
    label: 'First Name:',
    placeholder: 'First Name *',
    isRequired: true,
  },
  {
    name: 'lastName',
    label: 'Last Name:',
    placeholder: 'Last Name *',
    isRequired: true,
  },
  {
    name: 'email',
    label: 'Email Address:',
    placeholder: 'Email *',
    isRequired: true,
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number:',
    placeholder: 'Phone Number',
    type: 'number',
    isRequired: false,
  },
  {
    name: 'organization',
    label: 'School/Organization:',
    placeholder: 'School/Organization *',
    isRequired: true,
  },
  {
    name: 'teamSport',
    label: 'Your Team Sport:',
    placeholder: 'YourTeamSport *',
    isRequired: true,
  },
  {
    name: 'city',
    label: 'City:',
    placeholder: 'City *',
    isRequired: true,
  },
  {
    name: 'state',
    label: 'STATE',
    type: 'dropdown',
    options: states,
    placeholder: '',
    isRequired: true,
  },
  {
    name: 'approximateQuantity',
    label: ' Approximate Quantity',
    type: 'dropdown',
    options: GDG_RequestQuote_DesiredQuantities,
    placeholder: '',
    isRequired: true,
  },
  {
    name: 'teamLogo',
    label: '',
    type: 'file',
    placeholder: '',
    isRequired: false,
  },
  {
    name: 'message',
    label: ' How can we help you?',
    type: 'textarea',
    placeholder:
      'Tell us more about your custom order. The more information the better such as product names, colors and any order requirements.',
    isRequired: false,
  },
];
