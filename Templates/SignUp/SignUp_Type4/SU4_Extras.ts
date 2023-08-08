import { signupPageMessages } from '@constants/validationMessages';
import * as Yup from 'yup';

import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { __ValidationText } from '@constants/validation.text';
import getLocation from '@helpers/getLocation';
import { _CreateNewAccount_Payload } from '@services/payloads/createNewAccount.payload';
import { CreateNewAccount } from '@services/user.service';
// import parse from 'date-fns/parse';

import { minAgerequired } from '@constants/common.constant';
import { _SU3_Field } from '../SignUp_Type3/SU3.extras';

export const signupFourInitialFormValues = {
  firstname: '',
  lastName: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  primarysport: '',
  organizationId: 0,
  position: '',
  timeOfYearPurchase: '',
  teamGender: '',
  mascotId: 0,
  memberFrom: 0,
  memberTo: 0,
  phoneAddress: '',
  primaryColor: '',
  organizationEmail: '',
  storeCustomerAddress: [
    {
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
    },
    {
      address1: '',
      address2: '',
      suite: '',
      city: '',
      state: '',
      postalCode: '',
      fax: '',
      countryName: '',
      countryCode: '',
    },
  ],
  jobTitle: '',
  rowVersion: '',
  companyName: '',
  navCustomerId: '',
};
export const SignupFourSchema = Yup.object().shape({
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
  gender: Yup.string().required(signupPageMessages.Gender.required),
  email: Yup.string()
    .trim()
    .email()
    .required(signupPageMessages.email.required),
  password: Yup.string().required(signupPageMessages.password.required),
  teamGender: Yup.string().required(signupPageMessages.teamGender.required),
  timeOfYearPurchase: Yup.string().required(
    signupPageMessages.timeOfYearPurchase.required,
  ),
  primaryColor: Yup.string()
    .trim()
    .required(signupPageMessages.primaryColor.required),
  companyName: Yup.string()
    .trim()
    .required(signupPageMessages.companyName.required),
  organizationId: Yup.number().test(
    'not zero',
    signupPageMessages.organizationType.required,
    (val) => val !== undefined && val > 0,
  ),
  birthDate: Yup.date()
    .typeError('The value must be a date (MM/DD/YYYY)')
    .max(
      new Date(
        new Date().setFullYear(new Date().getFullYear() - minAgerequired),
      ),
      signupPageMessages.birthDate.min,
    ),
  position: Yup.string().trim().required(signupPageMessages.position.required),
  mascotId: Yup.number().test(
    'not zero',
    signupPageMessages.mascot.required,
    (val) => val !== undefined && val > 0,
  ),
  primarysport: Yup.number().test(
    'not zero',
    signupPageMessages.primarySport.required,
    (val) => val !== undefined && val > 0,
  ),
  confirmPassword: Yup.string().test(
    'passwords-match',
    signupPageMessages.confirmPassword.mustMatch,
    function (value) {
      return this.parent.password === value;
    },
  ),
  phoneAddress: Yup.string()
    .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
    .test(
      'phone-test',
      __ValidationText.signUp.storeCustomerAddress.phone.valid,
      (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        )
          return true;
        return false;
      },
    ),
  organizationEmail: Yup.string().email().required('Email is required'),
  storeCustomerAddress: Yup.array()
    .of(
      Yup.object().shape({
        address1: Yup.string()
          .trim()
          .required(signupPageMessages.storeCustomerAddress.address1.required),

        city: Yup.string()
          .trim()
          .required(signupPageMessages.storeCustomerAddress.city.required),
        state: Yup.string()
          .trim()
          .required(signupPageMessages.storeCustomerAddress.state.required),
        postalCode: Yup.string()
          .trim()
          .required(
            signupPageMessages.storeCustomerAddress.postalCode.required,
          ),

        countryName: Yup.string()
          .trim()
          .required(
            signupPageMessages.storeCustomerAddress.countryName.required,
          ),
      }),
    )
    .min(1),
});

export const handleSignupFour = async (enteredInputs: any, storeId: any) => {
  const location = await getLocation();
  const values = { ...enteredInputs };

  values.storeCustomerAddress[0].phone = values.phoneAddress;
  values.storeCustomerAddress[1].email = values.organizationEmail;

  delete values.phoneAddress;
  delete values.organizationEmail;

  const payload: _CreateNewAccount_Payload = {
    storeCustomerModel: {
      ...enteredInputs,
      location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
      ipAddress: location.ip_address,
      macAddress: '',
      storeId,
      customerType: 'corporate',
      industryId: 0,
      storeCustomerAddress: [
        {
          ...enteredInputs.storeCustomerAddress[0],
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          macAddress: '',
          addressType: 'B',
          rowVersion: '',
          companyName: enteredInputs.companyName,
          firstname: enteredInputs.firstname,
          lastName: enteredInputs.lastName,
          email: enteredInputs.email,
          recStatus: 'A',
        },
        {
          ...enteredInputs.storeCustomerAddress[1],
          location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
          ipAddress: location.ip_address,
          macAddress: '',
          companyName: enteredInputs.companyName,
          firstname: enteredInputs.firstname,
          lastName: enteredInputs.lastName,
          email: enteredInputs.email,
          phone: enteredInputs.storeCustomerAddress[0].phone,
          addressType: 'B',
          recStatus: 'A',
          rowVersion: '',
        },
      ],
      organizationName: enteredInputs.companyName,
      recStatus: 'A',
    },
  };

  try {
    return CreateNewAccount(payload).then((res: any) => res);
  } catch (err) {
    console.log('exception: ', err);
  }
};

interface SignUpFields {
  personalInformation: _SU3_Field[];
  organization: _SU3_Field[];
  address: _SU3_Field[];
}

export const signupFourFormFields: SignUpFields = {
  personalInformation: [
    {
      placeholder: 'First Name',
      name: 'firstname',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      placeholder: 'Last Name',
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      placeholder: '',
      name: 'gender',
      type: 'dropdown',
      label: __pagesText.accountPage.selectGender,
      required: true,
      options: __pagesText.accountPage.genderOption,
    },

    {
      placeholder: 'Email Address',
      name: 'email',
      type: 'email',
      label: __pagesText.accountPage.emailAddress,
      required: true,
    },
    {
      placeholder: 'Phone',
      name: 'phoneAddress',
      type: 'number',
      label: 'Phone Number',
      required: true,
    },
    {
      placeholder: '',
      name: 'primarysport',
      type: 'dropdown',
      label: __pagesText.accountPage.primarySport,
      required: true,
      options: __pagesText.accountPage.primarySports,
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
    },
    {
      placeholder: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      required: true,
    },
    {
      placeholder: 'MM/DD/YYYY',
      name: 'birthDate',
      type: 'text',
      label: __pagesText.accountPage.birthDate,
      required: false,
    },
  ],
  organization: [
    {
      placeholder: 'Name',
      name: 'companyName',
      type: 'text',
      label: __pagesText.accountPage.organizationNameText,
      required: true,
    },
    {
      placeholder: '',
      name: 'organizationId',
      type: 'dropdown',
      label: __pagesText.accountPage.organizationType,
      required: true,
      options: [
        { value: 0, name: 'Select Organization Type' },
        ...__pagesText.accountPage.organizationTypes,
      ],
    },
    {
      placeholder: 'Position',
      name: 'position',
      type: 'text',
      label: __pagesText.accountPage.yourPosition,
      required: true,
    },
    {
      placeholder: 'Email Address',
      name: 'organizationEmail',
      type: 'email',
      label: __pagesText.accountPage.emailAddress,
      required: true,
    },
    {
      placeholder: 'Address 1',
      name: 'storeCustomerAddress[1].address1',
      type: 'text',
      label: __pagesText.accountPage.addressOne,
      required: true,
    },
    {
      placeholder: 'Zip Code',
      name: 'storeCustomerAddress[1].postalCode',
      type: 'text',
      label: __pagesText.accountPage.zipCode,
      required: true,
    },
    {
      placeholder: 'City',
      name: 'storeCustomerAddress[1].city',
      type: 'text',
      label: __pagesText.accountPage.city,
      required: true,
    },
    {
      placeholder: '',
      name: 'stateNCountry',
      type: 'dropdown',
      label: '',
      required: true,
    },

    {
      placeholder: '',
      name: 'timeOfYearPurchase',
      type: 'dropdown',
      label: __pagesText.accountPage.purchaseTimeText,
      required: true,
      options: [
        { value: '', name: 'Select month' },
        ...__pagesText.accountPage.monthOption
          .slice(1)
          .map((v) => ({ value: v, name: v })),
      ],
    },
    {
      placeholder: '',
      name: 'teamGender',
      type: 'dropdown',
      label: __pagesText.accountPage.teamGender,
      required: true,
      options: __pagesText.accountPage.teamGenderOption,
    },
    {
      placeholder: '',
      name: 'numberOfPlayers',
      type: 'number',
      label: '',
      required: true,
    },
    {
      placeholder: '',
      name: 'mascotId',
      type: 'dropdown',
      label: __pagesText.accountPage.mascot,
      required: true,
      options: __pagesText.accountPage.mascotOptions,
    },
    {
      placeholder: '',
      name: 'primaryColor',
      type: 'color',
      label: __pagesText.accountPage.selectColorText,
      required: true,
    },
  ],
  address: [
    {
      placeholder: 'Address 1',
      name: 'storeCustomerAddress[0].address1',
      type: 'text',
      label: __pagesText.accountPage.addressOne,
      required: true,
    },
    {
      placeholder: 'Zip Code',
      name: 'storeCustomerAddress[0].postalCode',
      type: 'text',
      label: __pagesText.accountPage.zipCode,
      required: true,
    },
    {
      placeholder: 'City',
      name: 'storeCustomerAddress[0].city',
      type: 'text',
      label: __pagesText.accountPage.city,
      required: true,
    },
    {
      placeholder: '',
      name: 'stateNCountry',
      type: 'dropdown',
      label: '',
      required: true,
    },
  ],
};
