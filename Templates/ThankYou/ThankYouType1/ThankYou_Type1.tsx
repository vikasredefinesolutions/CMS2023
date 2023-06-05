import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import ThankYouHeader from '../CommonComponents/ThankYouHeader';
import ThankYouAccordian from './Components/ThankYouAccordian';
interface _props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

const ThankYouType1: React.FC<_props> = ({ order }) => {
  const guest = useTypedSelector_v2((state) => console.log(state, 'state'));

  return (
    <>
      <ThankYouHeader order={order} />
      <section id=''>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <ThankYouAccordian order={order} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouType1;
