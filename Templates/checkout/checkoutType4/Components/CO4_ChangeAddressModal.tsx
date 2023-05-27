import { CustomerAddress } from '@definations/APIs/user.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';

interface _Props {
  closeModal: (show: 'EDIT' | 'ADD' | null) => void;
  addressType: 'BILL' | 'SHIP';
}

const C04_ChangeAddressModal: React.FC<_Props> = ({
  closeModal,
  addressType,
}) => {
  const { update_CheckoutProps } = useActions_v2();
  const userAddresses = useTypedSelector_v2(
    (state) => state.user.customer?.customerAddress,
  );

  const handleShipToThisAddress = (user: CustomerAddress) => {
    if (addressType === 'SHIP') {
      update_CheckoutProps({
        shippingAddress: user,
      });
    }

    if (addressType === 'BILL') {
      update_CheckoutProps({
        billingAddress: user,
      });
    }

    closeModal(null);
  };

  const handleEditAddress = (user: CustomerAddress) => {
    update_CheckoutProps({
      editAddress: user,
    });
    closeModal('EDIT');
  };

  const Address = (user: CustomerAddress | null) => {
    if (!user) return null;

    return (
      <div className='mb-[12px]'>
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

  useEffect(() => {
    update_CheckoutProps({
      editAddress: 'CLEANUP',
    });
  }, []);

  return (
    <div
      id='shippingaddressModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff]'>
              <div className='font-[600] text-large-text'>
                Change {addressType === 'SHIP' ? `Shipping` : `Billing`} Address
              </div>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                onClick={() => closeModal(null)}
              >
                <svg
                  className='w-[24px] h-[24px]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-[25px]'>
              <div className='flex flex-wrap -mx-3 gap-y-6'>
                {userAddresses?.map((user) => {
                  const modalType: 'S' | 'B' =
                    addressType === 'SHIP' ? 'S' : 'B';

                  if (user.addressType !== modalType) {
                    return null;
                  }
                  return (
                    <div className='w-full lg:w-1/2 pl-[12px] pr-[12px]'>
                      <div className='bg-light-gray border pl-[8px] pr-[8px] pt-[8px] pb-[8px] border-[#e5e7eb]'>
                        {Address(user)}
                        <div className='mb-[12px]'>
                          <button
                            onClick={() => handleEditAddress(user)}
                            className='!text-anchor hover:!text-anchor-hover underline'
                          >
                            Edit
                          </button>
                        </div>
                        <div className=''>
                          <button
                            onClick={() => handleShipToThisAddress(user)}
                            className='btn btn-sm btn-primary'
                            data-modal-toggle='shippingaddressModal'
                          >
                            {addressType === 'SHIP' ? 'SHIP' : 'Bill'} TO THIS
                            ADDRESS
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='p-[25px] text-center border-t flex justify-end gap-2'>
              <button
                onClick={() => closeModal('ADD')}
                type='button'
                className='btn btn-secondary'
              >
                ADD NEW ADDRESS
              </button>{' '}
              <button
                type='button'
                onClick={() => closeModal(null)}
                className='btn btn-secondary'
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default C04_ChangeAddressModal;
