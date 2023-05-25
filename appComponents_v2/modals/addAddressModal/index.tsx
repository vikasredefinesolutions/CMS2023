import AddressForm from '@appComponents/reUsable/addressForm';
import CheckoutAddressForm, {
  AddressType,
} from '@controllers/checkoutController/CheckoutAddressForm';
import { CustomerAddress } from '@definations/APIs/user.res';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { deleteCustomerAddress } from '@services/address.service';
import { GetStoreCustomer } from '@services/user.service';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ConfirmModal from '../confirmModal';

const AddAddress = ({
  closePopupHandler,
  submitHandler,
  editData,
}: {
  closePopupHandler: () => void;
  // eslint-disable-next-line no-unused-vars
  submitHandler: (arg: AddressType) => void;
  editData: CustomerAddress | null;
}) => {
  let userValues: AddressType | null = null;
  let payloadObj: {
    // eslint-disable-next-line no-unused-vars
    submitHandler?: (arg: AddressType) => void;
    userValues?: AddressType;
  } = {};
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { updateCustomer, setShowLoader } = useActions_v2();
  const router = useRouter();
  if (editData) {
    userValues = {
      firstname: editData.firstname,
      lastName: editData.lastName,
      email: editData.email,
      address1: editData.address1,
      address2: editData.address2,
      suite: editData.suite,
      city: editData.city,
      state: editData.state,
      postalCode: editData.postalCode,
      phone: editData.phone,
      fax: editData.fax,
      countryName: editData.countryName || '',
      isDefault: editData.isDefault,
      companyName: editData.companyName,
    };
  }

  if (userValues) {
    payloadObj.userValues = userValues;
  }

  payloadObj.submitHandler = submitHandler;

  const form = CheckoutAddressForm(payloadObj);
  const { isSubmitting, submitForm } = form;

  const deleteAddress = async (id: number, rowVersion: string) => {
    const location = await getLocation();
    const obj = {
      args: {
        id: id,
        rowVersion: rowVersion,
        status: 0,
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
      },
    };
    setShowLoader(true);
    await deleteCustomerAddress(obj).then((res) => {
      closePopupHandler();
    });
    await GetStoreCustomer(customerId || 0)
      .then((res) => {
        if (res === null) return;
        updateCustomer({ customer: res });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  return (
    <>
      <div
        id='AddNewAddress'
        aria-hidden='true'
        className='overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center h-modal max-h-screen'
      >
        <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='relative w-full max-w-2xl'>
            <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
              <div className='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
                <div></div>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white text-center'>
                  {editData ? 'Edit Address' : 'New Shipping Address'}
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-toggle='AddNewAddress'
                  onClick={closePopupHandler}
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
                <AddressForm {...form} />
              </div>
              <div className='flex items-center justify-between p-6 gap-2 rounded-b border-t border-gray-200 dark:border-gray-600 flex-col'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  data-modal-toggle='AddNewAddress'
                  onClick={submitForm}
                  className='btn btn-secondary btn-md w-full'
                >
                  {editData ? 'UPDATE ADDRESS' : ' ADD NEW ADDRESS'}
                </button>
                {editData && (
                  <button
                    type='button'
                    data-modal-toggle='AddNewAddress'
                    onClick={() => setmodalopen(true)}
                    className=' btn btn-primary btn-md w-full'
                  >
                    Remove Address
                  </button>
                )}
                <div className='text-center w-full'>
                  <button
                    data-modal-toggle='shippingaddressModal'
                    type='button'
                    onClick={closePopupHandler}
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
      {modalopen && editData && (
        <ConfirmModal
          setmodalopen={setmodalopen}
          confirmHandler={() =>
            deleteAddress(editData?.id, editData?.rowVersion)
          }
        />
      )}
    </>
  );
};

export default AddAddress;
