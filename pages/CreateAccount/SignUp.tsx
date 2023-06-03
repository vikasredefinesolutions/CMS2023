import { _Store } from '@configs/page.config';
import { _defaultTemplates } from '@configs/template.config';
import { useTypedSelector_v2 } from '@hooks_v2/index';
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
      ) : (
        <SU_Template id={_defaultTemplates.signUp} />
      )}
    </>
  );
};

export default SignUp;
