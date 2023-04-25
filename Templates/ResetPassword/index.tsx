import { _defaultTemplates } from '@configs/template.config';
import React from 'react';
import ResetPassword_type1 from './ResetPassword_type1';

const resetPasswordTemplates: _ResetPasswordTemplates = {
  type1: ResetPassword_type1,
  type2: ResetPassword_type1,
};

const ResetPassword: React.FC<{
  id: string;
  token: string;
}> = ({ id, token }) => {
  const Template = resetPasswordTemplates[_defaultTemplates.resetPassword];

  return <Template token={token} />;
};

export default ResetPassword;
