import Price from '@appComponents/Price';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
import { _CO7R_AddressFields, _CO7R_Screens } from '../CO7R_Extras';

interface _Props {
  setScreenToShow: (value: React.SetStateAction<_CO7R_Screens>) => void;
  address: _CO7R_AddressFields;
}

const CO7R_ReviewShippingInformation: React.FC<_Props> = ({
  setScreenToShow,
  address,
}) => {
  const { shippingMethod } = useTypedSelector_v2((state) => state.checkout);

  const text = {
    firstLine: `${address.firstname} ${address.lastName}`,
    secondLine: () => {
      if (address.address2.trim().length > 1) {
        return `${address.address2}, ${address.address1}`;
      }

      return `${address.address1}`;
    },
    thirdLine: `${address.city}, ${address.state}`,
    forthLine: `${address.countryName}, ${address.postalCode}`,
    fifthLine: `${address.phone}`,
  };

  const showShippingMethodReview = () => {
    if (shippingMethod.name || shippingMethod.price > 0) return true;
    return false;
  };

  return (
    <div className='bg-light-gray flex-1 w-full md:w-6/12 mt-[15px] ml-[15px] mr-[15px] mb-[30px]'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Shipping Information</div>
          <div className='text-default-text'>
            <button
              className='!text-anchor hover:!text-anchor-hover'
              onClick={() => setScreenToShow('addShipping')}
            >
              Change
            </button>
          </div>
        </div>
        <div className='text-default-text mt-[10px] mb-[10px]'>
          {text.firstLine}
          <br />
          {text.secondLine()}
          <br />
          {text.thirdLine}
          <br />
          {text.forthLine}
          <br />
          {text.fifthLine}
        </div>
        {showShippingMethodReview() && (
          <div className='text-default-text mt-[10px] mb-[10px]'>
            Shipping Methods:{shippingMethod.name}(
            <Price value={shippingMethod.price} />)
          </div>
        )}
      </div>
    </div>
  );
};

export default CO7R_ReviewShippingInformation;
