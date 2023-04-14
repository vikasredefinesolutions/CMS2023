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
  const Template = resetPasswordTemplates[`type${id}` as 'type1' | 'type2'];

  return <Template token={token} />;
};

export default ResetPassword;
