import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import UserManagementAccountSetting from '@templates/account/UserManage';

const index = () => {
  return (
    <>
      <UserManagementAccountSetting
        id={_defaultTemplates.account.UserManagementAccountSetting}
      />
    </>
  );
};
export { getServerSideProps };

export default index;
