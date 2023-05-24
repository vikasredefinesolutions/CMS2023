import { UserAddressType } from '@constants/enum';
import { __pagesConstant } from '@constants/pages.constant';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { CustomerAddress } from '@definations/APIs/user.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { udpateIsDefaultAddress } from '@services/address.service';
import { GetStoreCustomer } from '@services/user.service';
import { FC } from 'react';

type props = {
  addressType:
    | null
    | UserAddressType.SHIPPINGADDRESS
    | UserAddressType.BILLINGADDRESS;
  addressArray: Array<CustomerAddress>;
  // eslint-disable-next-line no-unused-vars
  changeAddresHandler: (address: AddressType) => void;
  closeModalHandler: () => void;
  addAddressButtonHandler: () => void;
  // eslint-disable-next-line no-unused-vars
  setAddressEditData: (arg: CustomerAddress | null) => void;
};
const ChangeAddressModal: FC<props> = ({
  addressArray,
  addressType,
  closeModalHandler,
  changeAddresHandler,
  addAddressButtonHandler,
  setAddressEditData,
}) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { updateCustomer } = useActions_v2();
  const addressUpdateHandler = async (address: CustomerAddress) => {
    changeAddresHandler(address);
    const obj = {
      isDefault: true,
      addressId: address.id,
      customerId: customerId || 0,
      addressType: address.addressType,
    };

    await udpateIsDefaultAddress(obj);
    await GetStoreCustomer(customerId || 0).then((res) => {
      if (res === null) return;
      updateCustomer({ customer: res });
    });
  };
  return (
    <div
      id='shippingaddressModal'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center h-modal max-h-screen checkoutpage'
    >
      <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='relative w-full max-w-xl'>
          <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
            <div className='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Change{' '}
                {addressType === UserAddressType.SHIPPINGADDRESS
                  ? 'Shipping'
                  : 'Billing'}{' '}
                Address
              </h3>
              <button
                onClick={closeModalHandler}
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='shippingaddressModal'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-6 space-y-6'>
              <div className='' id=''>
                <div className='flex flex-wrap -mx-3 gap-y-6'>
                  {addressArray
                    .filter((address) => address.addressType === addressType)
                    .map((address, index) => (
                      <div key={index} className='w-full lg:w-1/2 px-3'>
                        <div className=''>
                          <div className='mb-3 '>
                            {address.firstname} {address.lastName}
                            <br />
                            {address.companyName}
                            <br />
                            {address.address1}
                            <br />
                            {address.address2 &&
                            address.address2.trim() != '' ? (
                              <>
                                {address.address2}
                                <br />
                              </>
                            ) : (
                              <></>
                            )}
                            {[
                              address.city,
                              address.state,
                              address.postalCode,
                            ].join(', ')}
                            <br />
                            {address.countryName}
                            <br />
                            {address.phone}
                          </div>
                          <div className='mb-3'>
                            <button
                              onClick={() => {
                                setAddressEditData(address);
                                addAddressButtonHandler();
                              }}
                              className='text-anchor '
                            >
                              Edit
                            </button>
                          </div>
                          <div className=''>
                            <button
                              onClick={() => addressUpdateHandler(address)}
                              className='btn btn-sm btn-primary p-2'
                              data-modal-toggle='shippingaddressModal'
                            >
                              {addressType === __pagesConstant.AddressType.B
                                ? __pagesConstant.AddressType.Bill
                                : __pagesConstant.AddressType.Ship}
                              TO THIS ADDRESS
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between p-6 space-x-2 flex-wrap rounded-b border-t border-gray-200 dark:border-gray-600 text-center'>
              <button
                data-modal-toggle='addshippingaddressModal'
                type='button'
                className='btn  btn-secondary w-full '
                onClick={() => {
                  setAddressEditData(null);
                  addAddressButtonHandler();
                }}
              >
                Add New Address
              </button>
              <div className='text-center w-full'>
                <button
                  data-modal-toggle='shippingaddressModal'
                  type='button'
                  onClick={closeModalHandler}
                  className='btn  text-anchor underline'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddressModal;
