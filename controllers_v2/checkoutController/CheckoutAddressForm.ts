import { AddressValidationSchema } from '@constants/schemas/address.schema';
import { FormikProps, useFormik } from 'formik';

const inititalValues = {
  firstname: '',
  lastName: '',
  email: '',
  address1: '',
  address2: '',
  suite: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  fax: '',
  countryName: '',
  isDefault: false,
  companyName: '',
  countryCode: '91',
};

export type AddressType = {
  firstname: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  isDefault: boolean;
  companyName?: string;
  countryCode?: string;
};
export type AddressFormRefType = FormikProps<AddressType>;
const CheckoutAddressForm = ({
  userValues,
  submitHandler,
}: {
  userValues?: AddressType;
  // eslint-disable-next-line no-unused-vars
  submitHandler?: (arg: AddressType) => void;
}) => {
  const formik = useFormik({
    initialValues: userValues ?? inititalValues,
    validationSchema: AddressValidationSchema,
    onSubmit: submitHandler ? submitHandler : () => {},
    enableReinitialize: true,
  });
  return formik;
};

export default CheckoutAddressForm;
