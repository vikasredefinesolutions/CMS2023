export const addressMessages = {
  firstName: {
    required: 'First Name is required',
    minlength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Last Name is required',
    minlength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },
  email: {
    required: 'Email is required',
  },
  address1: {
    required: 'Address is required',
  },
  city: {
    required: 'City is required',
  },
  state: {
    required: 'State is required',
  },
  postalCode: {
    required: 'Postal Code is required',
  },
  phone: {
    required: 'Phone is required',
  },
  fax: {
    required: 'Fax is required',
  },
  countryName: {
    required: 'Country Name is required',
  },
  companyName: {
    required: 'Company Name is required',
  },
};

export const addUserMessages = {
  firstName: {
    required: 'First Name is required',
    minLength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Last Name is required',
    minLength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },

  email: {
    required: 'Email is required',
    valid: 'Enter a valid email address',
  },
  role: { required: 'Role is required' },
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
export const checkoutUserLoginMessages = {
  email: {
    email: 'Invalid email address format',
    required: 'Email is required',
  },
};

export const checkoutPasswordMessages = {
  password: {
    min: 'Password must be 3 characters at minimum',
    required: 'Password is required',
  },
};

export const checkoutNewAccountPasswordMessages = {
  password: {
    min: 'Password must be 3 characters at minimum',
    required: 'Password is required',
  },
  passwordConfirmation: { mustMatch: 'Passwords must match' },
};

export const signupPageMessages = {
  firstname: { required: 'Enter your first name.' },
  lastName: { required: 'Enter your last name.' },
  Gender: { required: 'Select gender' },
  companyName: { required: 'Enter your company name' },
  companyId: { required: 'Select an Industry' },
  email: { required: 'Enter your email.' },
  password: { required: 'Please Enter more than 6 character' },
  confirmPassword: { mustMatch: 'Enter your confirm password.' },
  storeCustomerAddress: {
    address1: { required: 'Enter your address.' },
    address2: { required: 'Enter your address.' },
    city: { required: 'Enter your city.' },
    state: { required: 'Select your state.' },
    postalCode: { required: 'Enter your zipcode.' },
    phone: { required: 'Enter your phone Number.' },
    countryName: { required: 'Required' },
  },
  teamGender: {
    required: 'Enter team gender',
  },
  timeOfYearPurchase: {
    required: 'Time of year purchase is required',
  },
  primaryColor: {
    required: 'Primary color is required',
  },
  position: {
    required: 'Position is required',
  },
  organizationType: {
    required: 'Organization type is required',
  },
  mascot: {
    required: 'Mascot is required',
  },
  primarySport: {
    required: 'Primary sport is required',
  },
  birthDate: {
    min: 'Minimum 16 years of age is required',
  },
};

export const __QuoteRequestMessages = {
  name: { required: 'Please enter Name.' },
  organization: { required: 'Enter your last name.' },
  email: { required: 'Please enter School / Organization.' },
  sport: { required: 'Please enter Sport.' },
};

export const OTFItemValidation = {
  otfItemNo: {
    required: 'Please enter OTF Item No.',
  },
  otfItemVariant: {
    required: 'Please enter OTF Item Variant.',
  },
  ourSKU: {
    required: 'Please enter SKU.',
  },
  name: {
    required: 'Please enter Name.',
  },
  color: {
    required: 'Please enter Color.',
  },
  size: {
    required: 'Please enter Size.',
  },
  price: {
    required: 'Please enter Price.',
  },
  qty: {
    required: 'Please enter Quantity.',
  },
};

export const contactPageMessage = {
  name: { required: 'Enter your name.' },
  email: { required: 'Enter your Email.' },
  companyName: { required: 'Enter your Company name / ASI# or PPAI# .' },
  message: { required: 'Enter your name.' },
};

export const CustomRequestMessage = {
  firstName: {
    required: 'First name is required',
    minlength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Last name is required',
    minlength: 2,
    minValidation: 'Last name must be at least 2 characters',
  },
  organizationName: {
    required: 'Organization name is required',
  },
  phone: {
    required: 'Phone number is required',
  },
  email: {
    required: 'Email is required',
  },
  firstNameAddress: {
    required: 'First name is required',
  },
  lastNameAddress: {
    required: 'Last name is required',
  },
  address1: {
    required: 'Address is required',
  },
  address2: {
    required: 'Address is required',
  },
  zipCode: {
    required: 'Zip code is required',
  },
  city: {
    required: 'City is required',
  },
  country: {
    required: 'Country is required',
  },
  state: {
    required: 'State is required',
  },
  itemName: {
    required: 'Item name is required',
  },
  budget: {
    required: 'Budget is required',
  },
  itemColor: {
    required: 'Item color is required',
  },
  sizeQty: {
    required: 'Size and quantity is required',
  },
  needByDate: {
    required: 'Need by date is required',
  },
};

export const consultationProofMessages = {
  firstName: {
    required: 'First name is required',
    minLength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Last name is required',
    minLength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },
  organization: {
    required: 'Organization name is required',
  },

  email: {
    required: 'Email is required',
    invalid: 'Email is invalid',
  },
  state: {
    required: 'State is required',
  },
  city: {
    required: 'City is required',
  },
  approximateQuantity: {
    required: 'Quantity is required',
  },
  teamSport: {
    required: 'TeamSport is required',
  },
};

export const giftCardValidation = {
  email: {
    invalid: 'Invalid email address format',
    required: 'Email is required',
  },
  name: {
    required: `Recipient's Name is required`,
  },
  message: {
    required: 'Please enter message',
  },
};
