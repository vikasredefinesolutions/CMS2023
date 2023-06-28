import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@constants/global.constant';
import { addressMessages } from '@constants/successErrorMessages.constant';
import { __ValidationText } from '@constants/validation.text';
import * as Yup from 'yup';

export const AddressValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required(addressMessages.firstName.required)
    .min(
      addressMessages.firstName.firstNameminLength,
      addressMessages.firstName.minValidation,
    ),
  lastName: Yup.string()
    .required(addressMessages.lastName.required)
    .min(
      addressMessages.lastName.lastNameminLength,
      addressMessages.lastName.minValidation,
    ),
  address1: Yup.string().required(addressMessages.address1.required),
  address2: Yup.string(),
  city: Yup.string().required(addressMessages.city.required),
  state: Yup.string().required(addressMessages.state.required),
  postalCode: Yup.string().max(
    __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
    'Postal code must be less than 9',
  ),
  phone: Yup.string()
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
  countryName: Yup.string().required(addressMessages.countryName.required),
  companyName: Yup.string().required(addressMessages.companyName.required),
});
