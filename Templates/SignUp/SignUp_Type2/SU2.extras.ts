import { __ValidationText } from '@constants/validation.text';
import * as Yup from 'yup';

type _InputNames =
  | 'organizationName'
  | 'departmentName'
  | 'firstname'
  | 'lastName'
  | 'email'
  | 'companyAddress'
  | 'zipCode'
  | 'phoneNumber'
  | 'jobTitle'
  | 'usersMessage'
  | 'cityName';

type _SelectNames = 'industryType' | 'country' | 'state';

interface _Input {
  label: string;
  placeHolder: string;
  name: _InputNames;
  type: 'text' | 'email' | 'number';
  required: boolean;
}

interface _Select {
  label: string;
  placeHolder: string;
  name: _SelectNames;
  type: 'select';
  required: boolean;
  noOptionFound: string;
}

export const _SU2_Fields: Array<_Input | _Select> = [
  {
    label: 'Industry Type',
    placeHolder: '',
    name: 'industryType',
    type: 'select',
    required: true,
    noOptionFound: 'No Industry Found',
  },
  {
    label: `Organization Name`,
    placeHolder: '',
    name: 'organizationName',
    type: 'text',
    required: true,
  },
  {
    label: `Department Name`,
    placeHolder: '',
    name: 'departmentName',
    type: 'text',
    required: true,
  },
  {
    label: `First Name`,
    placeHolder: '',
    name: 'firstname',
    type: 'text',
    required: true,
  },
  {
    label: `Last Name`,
    placeHolder: '',
    name: 'lastName',
    type: 'text',
    required: true,
  },
  {
    label: `Email Address`,
    placeHolder: '',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: `Company Address`,
    placeHolder: '',
    name: 'companyAddress',
    type: 'text',
    required: true,
  },
  {
    label: `Zip Code`,
    placeHolder: '',
    name: 'zipCode',
    type: 'text',
    required: true,
  },
  {
    label: `City`,
    placeHolder: '',
    name: 'cityName',
    type: 'text',
    required: true,
  },

  {
    label: `Country`,
    placeHolder: '',
    name: 'country',
    type: 'select',
    required: true,
    noOptionFound: 'No Country Found',
  },
  {
    label: `State`,
    placeHolder: '',
    name: 'state',
    type: 'select',
    required: true,
    noOptionFound: 'No State Found',
  },
  {
    label: `Phone Number`,
    placeHolder: '',
    name: 'phoneNumber',
    type: 'text',
    required: true,
  },
  {
    label: `Job Title`,
    placeHolder: '',
    name: 'jobTitle',
    type: 'text',
    required: true,
  },
  {
    label: `Please tell us about your company, and how you would
    like to use the Patagonia co-branded gear`,
    placeHolder: '',
    name: 'usersMessage',
    type: 'text',
    required: true,
  },
];

export interface _SU2_InitialValues {
  industryType: string;
  organizationName: string;
  departmentName: string;
  firstname: string;
  lastName: string;
  email: string;
  companyAddress: string;
  zipCode: string;
  cityName: string;
  state: string;
  country: string;
  phoneNumber: string;
  jobTitle: string;
  usersMessage: string;
}

export const su2_initialValues: _SU2_InitialValues = {
  industryType: '',
  organizationName: '',
  departmentName: '',
  firstname: '',
  lastName: '',
  email: '',
  companyAddress: '',
  zipCode: '',
  cityName: '',
  state: '',
  country: '',
  phoneNumber: '',
  jobTitle: '',
  usersMessage: '',
};

export const _Signup2Schema = Yup.object().shape({
  industryType: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyName.required),
  organizationName: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyName.required),
  departmentName: Yup.string()
    .trim()
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  firstname: Yup.string()
    .trim()
    .required(__ValidationText.signUp.firstName.required)
    .min(__ValidationText.signUp.firstName.minLength)
    .max(__ValidationText.signUp.firstName.maxLength),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.signUp.lastName.required)
    .min(__ValidationText.signUp.lastName.minLength)
    .max(__ValidationText.signUp.lastName.maxLength),
  email: Yup.string()
    .trim()
    .email(__ValidationText.signUp.email.valid)
    .required(__ValidationText.signUp.email.required),
  companyAddress: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyName.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  zipCode: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  cityName: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  state: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  country: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  phoneNumber: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
  usersMessage: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyId.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),
});
