import {
  checkoutNewAccountPasswordMessages,
  checkoutPasswordMessages,
  checkoutUserLoginMessages,
} from '@constants/successErrorMessages.constant';
import * as Yup from 'yup';

export const checkoutEmailvalidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(checkoutUserLoginMessages.email.email)
    .required(checkoutUserLoginMessages.email.required),
});

export const checkoutPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, checkoutPasswordMessages.password.min)
    .required(checkoutPasswordMessages.password.required),
});

export const checkoutNewAccountPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, checkoutNewAccountPasswordMessages.password.min)
    .required(checkoutNewAccountPasswordMessages.password.required),
  confirmPassword: Yup.string()
    .required(checkoutNewAccountPasswordMessages.passwordConfirmation.required)
    .oneOf(
      [Yup.ref('password'), null],
      checkoutNewAccountPasswordMessages.passwordConfirmation.mustMatch,
    ),
});
