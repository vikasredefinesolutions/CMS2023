import { CustomerAddress } from '@definations/APIs/user.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { ifNoStoredAddressFound } from '../CO4_Extras';
import CO4_AddFirstAddress from './CO4_AddAddress';
import CO4_AddEditAddressModal from './CO4_AddEditAddressModal';
import C04_ChangeAddressModal from './CO4_ChangeAddressModal';

interface _Props {}

const CO4_ShippingAddress: React.FC<_Props> = () => {
  const user = useTypedSelector_v2((state) => state.checkout.shippingAddress);
  const userStoredAddress = useTypedSelector_v2(
    (state) => state.user.customer?.customerAddress,
  );

  const [showAddressModal, setShowAddressModal] = useState<
    'ADD' | 'EDIT' | null | 'CHANGE'
  >(null);

  const showAddEditModal =
    showAddressModal === 'ADD' || showAddressModal === 'EDIT';

  const noAddressFound = ifNoStoredAddressFound({
    addresses: userStoredAddress,
    lookingFor: 'S',
  });

  const ShippingAddress = (user: CustomerAddress | null) => {
    if (!user) return <></>;

    return (
      <div className='text-base mb-3'>
        {`${user.firstname} ${user.lastName}`}
        <br />
        {`${user.companyName}`}
        <br />
        {user.address1.length > 0 && `${user.address1}`}
        <br />
        {user.address2.length > 0 && `${user.address2}`}
        <br />
        {`${user.city}, ${user.state} ${user.postalCode}`}
        <br />
        {`${user.countryName}`}
        <br />
        {`${user.phone}`}
      </div>
    );
  };

  return (
    <>
      <div className='' id='ShippingAddress'>
        <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
          <div className='text-title-text font-semibold tracking-normal'>
            Shipping Address
          </div>
          {!noAddressFound && (
            <div>
              <button
                className='!text-anchor hover:!text-anchor-hover underline'
                onClick={() => setShowAddressModal('CHANGE')}
              >
                Change
              </button>
            </div>
          )}
        </div>
        {ShippingAddress(user)}
      </div>
      {noAddressFound && <CO4_AddFirstAddress addressType='SHIP' />}
      {showAddressModal === 'CHANGE' && (
        <C04_ChangeAddressModal
          closeModal={(show) => setShowAddressModal(show)}
          addressType={'SHIP'}
        />
      )}
      {showAddEditModal && (
        <CO4_AddEditAddressModal
          closeModal={(show) => setShowAddressModal(show)}
          modalType={showAddressModal}
          addressType={'SHIP'}
        />
      )}
    </>
  );
};

export default CO4_ShippingAddress;
