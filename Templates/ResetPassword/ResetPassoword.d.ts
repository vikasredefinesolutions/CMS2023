interface _ResetPasswordTemplates {
  type1: React.FC<{ token: string }>;
  type2: React.FC<{ token: string }>;
}

interface _ResetPassword_InitialValues {
  password: string;
  cPassword: string;
}
