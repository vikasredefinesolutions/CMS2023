import AddressForm from '@appComponents/reUsable/addressForm';
import CheckoutAddressForm, {
  AddressType,
} from '@controllers/checkoutController/CheckoutAddressForm';
import { CustomerAddress } from '@definations/APIs/user.res';

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
  return (
    <div
      id='AddNewAddress'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
              <h3 className='font-[600] text-large-text'>
                {editData ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
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
            <div className='flex items-center justify-between p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
              <button
                data-modal-toggle='AddNewAddress'
                className='btn btn-outline-primary'
                onClick={closePopupHandler}
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                data-modal-toggle='AddNewAddress'
                onClick={submitForm}
                className='btn btn-primary'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
