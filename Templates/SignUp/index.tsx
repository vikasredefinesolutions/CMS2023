import React from 'react';
import SignUp_type1 from './SignUp_type1';
import { _SignUpTemplates } from './signUp';

const signUpTempaltes: _SignUpTemplates = {
  type1: SignUp_type1,
  type2: SignUp_type1,
};

const SignUp: React.FC<{ id: string }> = ({ id }) => {
  const Component = signUpTempaltes[`type${id}` as 'type1' | 'type2'];
  return <Component />;
};

export default SignUp;
