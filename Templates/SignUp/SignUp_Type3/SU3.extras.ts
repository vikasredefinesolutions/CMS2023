import { __ValidationText } from '@constants/validation.text';
import * as Yup from 'yup';
export interface _SU3_InitialValues {
  firstname: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  jobTitle: string;
}

export type FieldType = 'email' | 'password' | 'number' | 'text' | 'dropdown';

export interface Option {
  name: string;
  id: string | number;
  value: string;
}

export interface _SU3_Field {
  name: string;
  required: boolean;
  placeholder: string;
  label: string;
  type: FieldType;
  options?: Option[];
}
export const su3_initialValues: _SU3_InitialValues = {
  firstname: '',
  lastName: '',
  email: '',
  companyName: '',
  password: '',
  confirmPassword: '',
  address1: '',
  address2: '',
  zipCode: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  jobTitle: '',
};

export const _Signup3Schema = Yup.object().shape({
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
  companyName: Yup.string()
    .trim()
    .required(__ValidationText.signUp.companyName.required)
    .min(__ValidationText.signUp.companyName.minLength)
    .max(__ValidationText.signUp.companyName.maxLength),

  email: Yup.string()
    .trim()
    .email(__ValidationText.signUp.email.valid)
    .required(__ValidationText.signUp.email.required),
  phone: Yup.string().required(
    __ValidationText.signUp.storeCustomerAddress.phone.required,
  ),
  jobTitle: Yup.string().required(__ValidationText.signUp.jobTitle.required),
  password: Yup.string()
    .required(__ValidationText.signUp.password.required)
    .min(__ValidationText.signUp.password.minLength)
    .max(__ValidationText.signUp.password.maxLength),
  confirmPassword: Yup.string()
    .required(__ValidationText.signUp.password.required)
    .oneOf(
      [Yup.ref('password'), null],
      __ValidationText.signUp.confirmPassword.mustMatch,
    ),
});

export const _SU3_Fields: _SU3_Field[] = [
  {
    label: `First Name`,
    placeholder: 'Enter Your First Name',
    name: 'firstname',
    type: 'text',
    required: true,
  },
  {
    label: `Last Name`,
    placeholder: 'Enter Your Last Name',
    name: 'lastName',
    type: 'text',
    required: true,
  },
  {
    label: ` Company Name`,
    placeholder: 'Enter Your Company Name',
    name: 'companyName',
    type: 'text',
    required: true,
  },

  {
    label: `Phone Number`,
    placeholder: 'Enter Your Phone Number',
    name: 'phone',
    type: 'text',
    required: true,
  },
  {
    label: ` Email Address`,
    placeholder: 'Enter Email Address',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: `Job Title`,
    placeholder: 'Enter Your Job Title',
    name: 'jobTitle',
    type: 'text',
    required: true,
  },

  {
    label: `Password`,
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    required: true,
  },

  {
    label: 'Confirm Password',
    placeholder: 'Password',
    name: 'confirmPassword',
    type: 'password',
    required: true,
  },

  {
    label: `Address 1`,
    placeholder: 'Enter Your Address 1',
    name: 'address1',
    type: 'text',
    required: false,
  },

  {
    label: `Address 2`,
    placeholder: 'Enter Your Address 2',
    name: 'address2',
    type: 'text',
    required: false,
  },

  {
    label: `Zip Code`,
    placeholder: 'Zip Code',
    name: 'zipCode',
    type: 'text',
    required: false,
  },

  {
    label: `City`,
    placeholder: 'Enter Your City',
    name: 'city',
    type: 'text',
    required: false,
  },

  {
    label: `State`,
    placeholder: '',
    name: 'state',
    type: 'dropdown',
    required: false,
  },

  {
    label: `Country`,
    placeholder: '',
    name: 'country',
    type: 'dropdown',
    required: false,
  },
];
