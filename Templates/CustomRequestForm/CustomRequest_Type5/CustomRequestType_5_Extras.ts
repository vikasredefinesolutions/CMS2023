import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { __ValidationText } from '@constants/validation.text';
import { consultationProofMessages } from '@constants/validationMessages';
import * as Yup from 'yup';

export const description =
  'If you are looking for something unique that cannot be found in our catalog, we would be glad to help! Please fill out the below form with as much detail as possible. You will be contacted by a Sales Rep, who will work with you to fulfill the order. You may also contact Bryan McWilliams at 866-602-8398 ext. 807 with any custom requests.';

export interface CSR5_FormField {
  label: string;
  required: boolean;
  type:
    | 'text'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'number'
    | 'textarea'
    | 'radio'
    | 'file';
  name: string;
  placeholder?: string;
  options?: { label: string; value: string | boolean | number }[];
  rows?: number;
  dependency?: CSR5_FormField;
}

export const CR5_InitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  inHandDate: '',
  isBeforeInHand: 'false',
  beforeInHandDate: '',
  shipFirstName: '',
  shipLastName: '',
  shipAddress1: '',
  shipAddress2: '',
  shipZipCode: '',
  shipCity: '',
  shipStateId: 0,
  shipCountryId: 0,
  requestGiveAway: 'false',
  targetAudience: '',
  budget: 0,
  quantity: 0,
  color: '',
  ideas: '',
  item2: '',
  item3: '',
  item4: '',
  item5: '',
  specialRequest: '',
  reasonForGiveAwayPurpose: '',
  logoType: 'vertical',
  logo: '',
  eventName: '',
};

export const CR5_ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(
      consultationProofMessages.firstName.minLength,
      consultationProofMessages.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(
      consultationProofMessages.lastName.minLength,
      consultationProofMessages.lastName.minValidation,
    ),

  phone: Yup.string()
    .trim()
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
  inHandDate: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.inHandDate.required),
  email: Yup.string()
    .trim()
    .email()
    .required(__ValidationText.requestConsultation.email.required),
  shipFirstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required),
  shipLastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required),
  shipAddress1: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.address.required),

  shipCity: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.city.required),
  shipZipCode: Yup.string()
    .trim()
    .required(__ValidationText.signUp.storeCustomerAddress.postalCode.required)
    .max(
      __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
      'Postal code must be less than 9',
    ),
  requestGiveAway: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.requestGiveAway.required),
  targetAudience: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.targetAudience.required),
  budget: Yup.mixed()
    .test(
      'Value check',
      'Please enter greater than 0',
      (value) => value && value > 0,
    )
    .required(__ValidationText.requestConsultation.estimateBudget.required),
  quantity: Yup.mixed()
    .test(
      'Value check',
      'Please enter greater than 0',
      (value) => value && value > 0,
    )
    .required(__ValidationText.requestConsultation.desiredQty.required),
  ideas: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.ideas.required),
  logo: Yup.string().required(
    __ValidationText.requestConsultation.logo.required,
  ),
  eventName: Yup.string().when('requestGiveAway', {
    is: 'true',
    then: Yup.string().required(
      __ValidationText.requestConsultation.event.required,
    ),
  }),
  beforeInHandDate: Yup.string().when('isBeforeInHand', {
    is: 'true',
    then: Yup.string().required(
      __ValidationText.requestConsultation.beforeInHandDate.required,
    ),
  }),
});

export interface CR5_FormFields {
  contactInformation: CSR5_FormField[];
  shipToAddress: CSR5_FormField[];
  itemRequest: CSR5_FormField[];
  additionalRequests: CSR5_FormField[];
}

export const titleNames: any = {
  // replace any
  contactInformation: '',
  shipToAddress: 'Ship to Address',
  itemRequest: 'Item Request',
  additionalRequests: 'Additional Requests',
};

export const formFields: CR5_FormFields = {
  contactInformation: [
    {
      label: 'First Name:',
      required: true,
      placeholder: '',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Last Name:',
      required: true,
      placeholder: '',
      name: 'lastName',
      type: 'text',
    },
    {
      label: 'Email:',
      required: true,
      placeholder: '',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Phone Number:',
      required: true,
      placeholder: '',
      name: 'phone',
      type: 'number',
    },
    {
      label: 'In-hands Date:',
      required: true,
      placeholder: '',
      name: 'inHandDate',
      type: 'date',
    },
    {
      label: 'Can this arrive before the in-hands date? :',
      required: false,
      placeholder: '',
      name: 'isBeforeInHand',
      type: 'radio',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
      dependency: {
        label: '',
        required: true,
        placeholder: '',
        name: 'beforeInHandDate',
        type: 'date',
      },
    },
  ],
  shipToAddress: [
    {
      label: 'First Name:',
      required: true,
      placeholder: '',
      name: 'shipFirstName',
      type: 'text',
    },
    {
      label: 'Last Name:',
      required: true,
      placeholder: '',
      name: 'shipLastName',
      type: 'text',
    },
    {
      label: 'Address1:',
      required: true,
      placeholder: '',
      name: 'shipAddress1',
      type: 'text',
    },
    {
      label: 'Address2:',
      required: false,
      placeholder: '',
      name: 'shipAddress2',
      type: 'text',
    },
    {
      label: 'Zip Code:',
      required: true,
      placeholder: '',
      name: 'shipZipCode',
      type: 'text',
    },
    {
      label: 'City:',
      required: true,
      placeholder: '',
      name: 'shipCity',
      type: 'text',
    },
    {
      label: 'STATE / PROVINCE:',
      required: false,
      placeholder: '',
      name: 'stateNCountries',
      type: 'select',
    },
  ],
  itemRequest: [
    {
      label: 'Is this request for giveaways associated with an event? : ',
      required: true,
      placeholder: '',
      name: 'requestGiveAway',
      type: 'radio',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
      dependency: {
        label: '',
        required: true,
        placeholder: '',
        name: 'eventName',
        type: 'text',
      },
    },
    {
      label: 'Target audience/end user:',
      required: true,
      placeholder: '',
      name: 'targetAudience',
      type: 'text',
    },
    {
      label: 'Reason for order/purpose for giveaways:',
      required: true,
      placeholder: '',
      name: 'reasonForGiveAwayPurpose',
      type: 'text',
    },
    {
      label: 'Budget per item:',
      required: true,
      placeholder: '',
      name: 'budget',
      type: 'number',
    },
    {
      label: 'Quantity needed:',
      required: true,
      placeholder: '',
      name: 'quantity',
      type: 'number',
    },
    {
      label: 'Color preference:',
      required: false,
      placeholder: '',
      name: 'color',
      type: 'text',
    },
    {
      label: 'Which logo would you like to use?:',
      required: true,
      placeholder: '',
      name: 'logoType', //name needs to be confirmed
      type: 'radio',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      label: 'Ideas/particular items of interest:',
      required: true,
      placeholder: '',
      name: 'ideas',
      type: 'textarea',
      rows: 2,
    },
  ],
  additionalRequests: [
    {
      label: 'Item 2:',
      required: false,
      placeholder: '',
      name: 'item2',
      type: 'text',
    },
    {
      label: 'Item 3:',
      required: false,
      placeholder: '',
      name: 'item3',
      type: 'text',
    },
    {
      label: 'Item 4:',
      required: false,
      placeholder: '',
      name: 'item4',
      type: 'text',
    },
    {
      label: 'Item 5:',
      required: false,
      placeholder: '',
      name: 'item5',
      type: 'text',
    },
    {
      label: 'Special request/notes:',
      required: false,
      placeholder: '',
      name: 'specialRequest',
      type: 'text',
    },
    {
      label: 'Additional documents or logos need to complete request:',
      required: true,
      placeholder: '',
      name: 'logo',
      type: 'file',
    },
  ],
};
