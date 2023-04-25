import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import AccountSetting from 'Templates/account';

const index = () => {
  return (
    <>
      <AccountSetting id={_defaultTemplates.account.account} />
    </>
  );
};
export { getServerSideProps };

export default index;
