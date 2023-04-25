import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import ManageAddressSetting from '@templates/account/ManageAddressIndex';
const index = () => {
  return (
    <>
      <ManageAddressSetting
        id={_defaultTemplates.account.ManageAddressSetting}
      />
    </>
  );
};
export { getServerSideProps };
export default index;
