import { CustomerAddress } from '@definations/APIs/user.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useState } from 'react';
import { ifNoStoredAddressFound } from '../CO4_Extras';
import CO4_AddFirstAddress from './CO4_AddAddress';
import CO4_AddEditAddressModal from './CO4_AddEditAddressModal';
import CO4_ChangeAddressModal from './CO4_ChangeAddressModal';

const BILL = 'BILL';

const CO4_BillingAddress: React.FC = () => {
  const user = useTypedSelector_v2((state) => state.checkout.address.billing);
  const userStoredAddress = useTypedSelector_v2(
    (state) => state.user.customer?.customerAddress,
  );

  const { update_CheckoutAddress } = useActions_v2();

  const [showAddressModal, setShowAddressModal] = useState<
    'ADD' | 'EDIT' | null | 'CHANGE'
  >(null);

  const useShippingAddress = useTypedSelector_v2(
    (state) => state.checkout.address.useShippingAddressForBilling,
  );

  const showAddEditModal =
    showAddressModal === 'ADD' || showAddressModal === 'EDIT';

  const noAddressFound = ifNoStoredAddressFound({
    addresses: userStoredAddress,
    lookingFor: 'B',
  });

  const BillingAddress = (user: CustomerAddress | null) => {
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

  const handleUseShippingAddress = () => {
    if (useShippingAddress) {
      setShowAddressModal('CHANGE');
      return;
    }
    update_CheckoutAddress({
      type: 'USE_SHIPPING_ADDRESS_FOR_BILLING',
      value: true,
    });
  };

  return (
    <>
      <div id='BillingAddress'>
        <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border mt-8'>
          <div className='text-title-text font-semibold tracking-normal'>
            Billing Address
          </div>
          <div></div>
        </div>
        <div className='mb-3 font-semibold text-lg'>
          <div>
            <input
              onClick={() => handleUseShippingAddress()}
              type='checkbox'
              checked={useShippingAddress}
              id='UseShippingAddress'
              name='UseShippingAddress'
            />{' '}
            <label htmlFor='UseShippingAddress'>Use Shipping Address</label>
          </div>
        </div>
        {BillingAddress(user)}
      </div>
      {noAddressFound && <CO4_AddFirstAddress addressType={BILL} />}

      {showAddressModal === 'CHANGE' && (
        <CO4_ChangeAddressModal
          closeModal={(show) => setShowAddressModal(show)}
          addressType={BILL}
        />
      )}
      {showAddEditModal && (
        <CO4_AddEditAddressModal
          closeModal={(show) => setShowAddressModal(show)}
          modalType={showAddressModal}
          addressType={BILL}
        />
      )}
    </>
  );
};

export default CO4_BillingAddress;
