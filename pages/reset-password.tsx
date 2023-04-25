import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import RP_Template from '@templates/ResetPassword';
import { GetServerSideProps, NextPage } from 'next';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  return <RP_Template id={_defaultTemplates.resetPassword} token={token} />;
};

export default ResetPassword;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.res;
  const token = context.query?.token;

  if (!token) {
    res.writeHead(302, {
      Location: paths.HOME,
    });
    res.end();
  }

  return {
    props: {
      token: token,
    },
  };
};
