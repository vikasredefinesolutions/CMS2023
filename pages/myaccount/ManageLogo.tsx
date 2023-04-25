import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import ManageLogo from '@templates/ManageLogo';

const index = () => {
  return (
    <>
      <ManageLogo id={_defaultTemplates.manageLogo} />
    </>
  );
};
export { getServerSideProps };
export default index;
