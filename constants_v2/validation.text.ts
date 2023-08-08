import { __pagesConstant } from './pages.constant';

export const __ValidationText = {
  requestConsultation: {
    firstName: {
      required: 'Enter your first name.',
      minLength: 2,
      maxLength: 40,
    },
    lastName: {
      required: 'Enter your last name.',
      minLength: 2,
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

    itemColor: {
      required: 'Item color is required',
    },

    city: {
      required: 'City is required',
    },

    additionalComments: {
      required: 'Comment is required',
    },

    country: {
      required: 'Country is required',
    },

    stateName: {
      required: 'State is required',
    },
    itemName: {
      required: 'Item name is required',
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

    address: {
      required: 'Address is required',
    },

    needByDate: {
      required: 'Date is required',
    },

    targetAudience: {
      required: 'Target audience field is required',
    },

    giveAway: {
      required: 'Purpose for giveaway is required',
    },

    estimateBudget: {
      required: 'Estimated budget is required',
    },
    requestForGiveAway: {
      required: 'Please select one option',
    },
    requestGiveAway: {
      required: 'Please select one option',
    },
    ideas: {
      required: 'Please enter ideas/items of interest',
    },
    logo: {
      required: 'Please select logo',
    },
    event: {
      required: 'Please choose event name',
    },
    beforeInHandDate: {
      required: 'Please choose date',
    },

    somethingWentWrong: 'Something Went Wrong. Try again, later!!!',
    message: '',
    captcha: 'Captcha is not valid !',
    comment: {
      required: 'Additional comment is required',
    },

    jobTitle: {
      required: 'Job title is required',
    },
    purpose: {
      required: 'Purpose is required',
    },
  },
  signUp: {
    newPassword: {
      required: 'Enter your New Password.',
      minLength: 6,
    },
    confirmNewPassword: {
      required: 'Please Enter New Password Again',
      minLength: 6,
    },
    firstName: {
      required: 'Enter your first name.',
      minLength: 2,
      maxLength: 40,
    },
    lastName: {
      required: 'Enter your last name.',
      minLength: 2,
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
    companyInfo: {
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
    confirmPassword: { mustMatch: 'Your confirm password is not match' },
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
    name: { required: 'Enter your name.', minLength: 2, maxLength: 40 },
    companyName: {
      required: 'Enter your company name.',
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
  organization: { required: 'Please enter School / Organization.' },
  email: { required: 'Please enter your email' },
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
  firstName: {
    required: 'Please Enter First Name.',
    firstNameminLength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Please Enter Last Name.',
    lastNameminLength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },
  companyName: { required: 'Please Enter Company Name.' },
  password: { required: 'Please Enter Password.' },
};

export const CheckoutMessage = {
  firstName: {
    required: 'Please Enter First Name.',
    minLength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Please Enter Last Name.',
    minLength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },
  companyName: { required: 'Please Enter Company Name.' },
  password: { required: 'Please Enter Password.' },
};
