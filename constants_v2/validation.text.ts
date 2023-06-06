import { __pagesConstant } from './pages.constant';

export const __ValidationText = {
  requestConsultation: {
    firstName: {
      required: 'Enter your first name.',
      minLength: 3,
      maxLength: 40,
    },
    lastName: {
      required: 'Enter your last name.',
      minLength: 3,
      maxLength: 40,
    },
    companyName: {
      required: 'Enter your company name',
      minLength: 3,
      maxLength: 40,
    },
    email: {
      required: 'Enter an email address.',
      validRequest: 'Please enter a valid email address.',
      invalid: '',
    },

    phone: {
      required: 'Enter your phone Number.',
      valid: 'Phone number is not valid',
      length: 10,
    },
    preferedContactMethod: 'Please Select Contact Method.',
    desiredQty: {
      minQty: __pagesConstant._requestConsultation.minimumDesiredQtyToSelect,
      minText: `Minimum ${__pagesConstant._requestConsultation.minimumDesiredQtyToSelect} quantity required.`,
      required: 'Enter desired quantity.',
    },
    inHandDate: {
      typeError: 'In hands Date is required in mm/dd/yyyy format',
      required: 'In hands Date is required',
      min: 'In Hand Date Cannot be Past date',
    },
    message: '',
    captcha: 'Captcha is not valid !',
  },
  signUp: {
    firstName: {
      required: 'Enter your first name.',
      minLength: 3,
      maxLength: 40,
    },
    lastName: {
      required: 'Enter your last name.',
      minLength: 3,
      maxLength: 40,
    },
    Gender: { required: 'Select gender' },
    jobTitle: {
      required: 'Please enter job title',
    },
    companyName: {
      required: 'Enter your company name',
      minLength: 3,
      maxLength: 40,
    },
    industryType: {

      required: 'Select Industry Type.',

    },
    companyId: { required: 'Select an Industry' },
    email: {
      required: 'Enter your email.',
      valid: 'Enter a valid email address',
    },
    password: {
      required: 'Please Enter more than 6 character',
      minLength: 6,
      maxLength: 40,
    },
    confirmPassword: {
      mustMatch: 'Confirm password does not match',
      required: 'Enter your confirm password.',
    },
    storeCustomerAddress: {
      address1: { required: 'Enter your address.' },
      address2: { required: 'Enter your address.' },
      city: { required: 'Enter your city.' },
      state: { required: 'Select your state.' },
      postalCode: { required: 'Enter your zipcode.', maxLength: 9 },
      phone: {
        required: 'Enter your phone Number.',
        valid:
          'Enter Valid Phone Number. Format xxx-xxx-xxxx, xxx xxx xxxx, xxx.xxx.xxxx, xxxxxxxxxx',
        length: 10,
      },
      countryName: { required: 'Required country name' },
    },
  },
  resetPassword: {
    password: { required: 'Please Enter more than 6 character' },
    confirmPassword: { mustMatch: 'Enter your confirm password.' },
  },
  email: {
    required: 'Please enter a valid email address.',
    validRequest: 'Please enter a valid email address.',
    invalid: '',
  },
  password: {
    invalid: '',
    required: 'Please enter a valid password',
  },
  credentials: {
    invalid: 'The username or password is incorrect.',
  },
  contactRequest: {
    name: { required: 'Enter your name.', minLength: 3, maxLength: 40 },
    companyName: {
      required: 'Enter your company name',
      minLength: 3,
      maxLength: 40,
    },
    email: {
      required: 'Enter an email address.',
      validRequest: 'Please enter a valid email address.',
      invalid: '',
    },
    message: {
      required: 'Enter a message.',
      minLength: 3,
    },
  },
};

export const __QuoteRequestMessages = {
  name: { required: 'Please enter Name.' },
  organization: { required: 'Enter your last name.' },
  email: { required: 'Please enter School / Organization.' },
  sport: { required: 'Please enter Sport.' },
};

export const addReviewMessages = {
  comment: {
    min: 'Comment must be 3 characters at minimum',
    max: 'Comment cannot be exceed more than 200 character maximum',
    required: 'Comment is required',
  },
  commentHeading: {
    min: 'Heading must be 3 characters at minimum',
    max: 'Heading cannot be exceed more than 60 character maximum',
    required: 'Heading is required',
  },
};
export const editAccountMessage = {
  firstName: 'Please enter first name.',
  lastName: 'Please enter last name.',
  companyName: 'Please enter company name.',
  password: 'Please enter password.',
};
