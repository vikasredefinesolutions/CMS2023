import { NextPage } from 'next';

import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import getRawBody from 'raw-body';

const OrderStatusUpdateRequest: NextPage<any> = (props) => {
  console.log(props, ' these are props i am getting by body');
  return (
    <>
      <div>i am here in OrderStatusUpdateRequest Page</div>
    </>
  );
};

export default OrderStatusUpdateRequest;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<any>> => {
  const body = await getRawBody(context?.req);
  console.log(body, 'this is body');
  return {
    props: { body: body.toString() },
  };
};
