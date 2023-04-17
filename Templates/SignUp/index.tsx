import React from 'react';
import SignUp_type1 from './SignUp_Type1';
import SignUp_type2 from './SignUp_Type2';

interface _SignUpTemplates {
  type1: React.FC;
  type2: React.FC;
}

const signUpTempaltes: _SignUpTemplates = {
  type1: SignUp_type1,
  type2: SignUp_type2,
};

const SignUp: React.FC<{ id: string }> = ({ id }) => {
  const Component = signUpTempaltes[`type${id}` as 'type1' | 'type2'];
  return <Component />;
};

export default SignUp;
