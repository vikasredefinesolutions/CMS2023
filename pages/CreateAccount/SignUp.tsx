import { _Store } from '@configs/page.config';
import { _defaultTemplates } from '@configs/template.config';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import SignUp_type3 from '@templates/SignUp/SignUp_Type3';
import SignUp_type7 from '@templates/SignUp/SignUp_Type7';
import { NextPage } from 'next';
import SU_Template from 'Templates/SignUp/index';

const SignUp: NextPage = () => {
  const { code: storeCode } = useTypedSelector_v2((state) => {
    return state.store;
  });
  return (
    <>
      {storeCode === _Store.type3 ? (
        <SU_Template id={'type2'} />
      ) : storeCode === _Store.type2 ? (
        <SignUp_type3 />
      ) : storeCode === _Store.type5 ? (
        <SignUp_type7 />
      ) : (
        <SU_Template id={_defaultTemplates.signUp} />
      )}
    </>
  );
};

export default SignUp;
