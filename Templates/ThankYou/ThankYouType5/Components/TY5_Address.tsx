import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import React from 'react';

interface _Props {
  title: 'Bill' | 'Ship';
  billing: _MyAcc_OrderBillingDetails | null;
}

const TY5_Address: React.FC<_Props> = ({ title, billing }) => {
  const billingAddress = {
    firstLine: `${billing?.billingFirstName || ''} ${billing?.lastName || ''}`,
    secondLine: () => {
      if ((billing?.billingAddress2 || '').trim().length > 1) {
        return `${billing?.billingAddress2}, ${billing?.billingAddress1}`;
      }

      return `${billing?.billingAddress1}`;
    },
    thirdLine: `${billing?.billingCity}, ${billing?.billingState}`,
    forthLine: `${billing?.billingCountry}, ${billing?.billingZip}`,
  };

  const shippingAddress = {
    firstLine: `${billing?.shippingFirstName || ''} ${
      billing?.shippingLastName || ''
    }`,
    secondLine: () => {
      if ((billing?.shippingAddress2 || '').trim().length > 1) {
        return `${billing?.shippingAddress2}, ${billing?.shippingAddress1}`;
      }

      return `${billing?.shippingAddress1}`;
    },
    thirdLine: `${billing?.shippingCity}, ${billing?.shippingState}`,
    forthLine: `${billing?.shippingCountry}, ${billing?.shippingZip}`,
  };

  const address = title === 'Bill' ? billingAddress : shippingAddress;

  return (
    <div>
      <div className='font-[600] pt-[15px]'>{title} to:</div>
      <div className='pt-[8px]'>
        {address.firstLine}
        <br />
        {address.secondLine()}
        <br />
        {address.thirdLine}
        <br />
        {address.forthLine}
      </div>
    </div>
  );
};

export default TY5_Address;
