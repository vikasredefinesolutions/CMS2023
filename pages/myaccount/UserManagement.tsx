import { getServerSideProps } from '@controllers/getServerSideProps';
import UserManagementAccountSetting from '@templates/account/UserManage';

const index = () => {
  return (
    <>
      <UserManagementAccountSetting id='1' />
    </>
  );
};
export { getServerSideProps };

export default index;
