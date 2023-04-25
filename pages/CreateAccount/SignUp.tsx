import { _defaultTemplates } from '@configs/template.config';
import { NextPage } from 'next';
import SU_Template from 'Templates/SignUp/index';

const SignUp: NextPage = () => {
  return <SU_Template id={_defaultTemplates.signUp} />;
};

export default SignUp;
