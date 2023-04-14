import { getServerSideProps } from '@controllers/getServerSideProps';
import AccountSetting from 'Templates/account';

const index = () => {
  return (
    <>
      <AccountSetting id='1' />
    </>
  );
};
export { getServerSideProps };

export default index;
