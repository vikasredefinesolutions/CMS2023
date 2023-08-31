import { NextPage } from 'next';

import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import getRawBody from 'raw-body';

const OrderConfirm: NextPage<any> = (props) => {
  console.log(props, 'these are props i am getting by body');
  return (
    <>
      <div>i am here in OrderConfirm page</div>
    </>
  );
};

export default OrderConfirm;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<any>> => {
  const body = await getRawBody(context?.req);
  console.log(body, 'this is body');
  console.log(body.toString(), 'this is stringify body');
  return {
    props: { body: body.toString() },
  };
};
