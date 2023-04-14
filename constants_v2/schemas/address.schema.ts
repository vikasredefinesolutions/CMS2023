import { addressMessages } from '@constants/successErrorMessages.constant';
import * as Yup from 'yup';

export const AddressValidationSchema = Yup.object().shape({
  firstname: Yup.string().required(addressMessages.firstName.required),
  lastName: Yup.string().required(addressMessages.lastName.required),
  address1: Yup.string().required(addressMessages.address1.required),
  address2: Yup.string(),
  city: Yup.string().required(addressMessages.city.required),
  state: Yup.string().required(addressMessages.state.required),
  postalCode: Yup.string().required(addressMessages.postalCode.required),
  phone: Yup.string().required(addressMessages.phone.required),
  countryName: Yup.string().required(addressMessages.countryName.required),
  companyName: Yup.string().required(addressMessages.companyName.required),
});
