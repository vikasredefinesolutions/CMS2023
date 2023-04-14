import Template from '@templates/OrderDetails';
import MyAccountTabs from '@templates/account/accountTemplate_Type1/components/MyAccountTab';
import { NextPage } from 'next';

const OrderDetails: NextPage = () => {
  return (
    <>
      <MyAccountTabs />
      <Template id={1} />;
    </>
  );
};

export default OrderDetails;
