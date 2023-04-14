import { getServerSideProps } from '@controllers/getServerSideProps';
import ManageAddressSetting from '@templates/account/ManageAddressIndex';
const index = () => {
  return (
    <>
      <ManageAddressSetting id={'1'} />
    </>
  );
};
export { getServerSideProps };
export default index;
