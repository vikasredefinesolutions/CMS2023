import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import React from 'react';
import ThankYouHeaderType_3 from './Components/ThankYouHeaderType_3';
import ThankYouOrderDetail from './Components/ThankYouOrderDetail';
interface _props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}
const ThankYouType3: React.FC<_props> = ({ order }) => {
  return (
    <>
      <ThankYouHeaderType_3 order={order} />
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <ThankYouOrderDetail order={order} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouType3;
