import { type2 } from '@constants/dummy.constant';
import { getServerSideProps } from '@controllers/getServerSideProps';
import ManageLogo from '@templates/ManageLogo';

const index = () => {
  return (
    <>
      <ManageLogo id={type2} />
    </>
  );
};
export { getServerSideProps };
export default index;
