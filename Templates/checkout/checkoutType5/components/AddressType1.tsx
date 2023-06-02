import { UserAddressType } from '@constants/enum';
import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';
import { useTypedSelector_v2 } from '@hooks_v2/index';

const CheckoutAddress = ({
  address,
  addressType,
  setShippingAddress,
  useShippingAddress,
  changeClickHandler,
  setAddressType,
  setBillingAdress,
}: {
  address: AddressType | null;
  addressType: 1 | 2;
  setBillingAdress?: (args: AddressType | null) => void;
  setAddressType?: (
    args:
      | null
      | UserAddressType.SHIPPINGADDRESS
      | UserAddressType.BILLINGADDRESS,
  ) => void;
  setShippingAddress?: (arg: boolean) => void;
  useShippingAddress?: boolean;
  changeClickHandler: () => void;
}) => {
  const userId = useTypedSelector_v2((state) => state.user.id);
  return (
    <div className='' id='ShippingAddress'>
      <div className='flex items-baseline mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          {addressType === 1 ? 'Shipping Address' : 'Billing Address'}
        </div>
        {!useShippingAddress && (
          <div>
            <button
              onClick={changeClickHandler}
              className='ml-4 text-anchor underline'
              data-modal-toggle='shippingaddressModal'
            >
              Change
            </button>
          </div>
        )}
      </div>
      {addressType === 2 && (
        <div className='mb-3 font-semibold text-lg'>
          <div className='flex items-center'>
            <div className='input_checkbox'>
              <input
                type='checkbox'
                id='UseShippingAddress1'
                name='UseShippingAddress'
                className='checkbox'
                data-modal-toggle='billingaddressModal'
                onChange={(e) => {
                  setShippingAddress && setShippingAddress(e.target.checked);
                  if (userId) {
                    !e.target.checked &&
                      setAddressType &&
                      setAddressType(UserAddressType.BILLINGADDRESS);
                  } else {
                    setBillingAdress && setBillingAdress(null);
                  }
                }}
                checked={useShippingAddress}
              />
            </div>
            <label htmlFor='UseShippingAddress1' className='ml-2'>
              Use Shipping Address
            </label>
          </div>
        </div>
      )}
      {!useShippingAddress && (
        <div className='text-base mb-3'>
          {address?.firstname} {address?.lastName}
          <br />
          {address?.companyName}
          <br />
          {address?.address1}
          <br />
          {address?.address2 && address?.address2.trim() != '' ? (
            <>
              {address?.address2}
              <br />
            </>
          ) : (
            <></>
          )}
          {[address?.city, address?.state, address?.postalCode].join(', ')}
          <br />
          {address?.countryName}
          <br />
          {address?.phone}
        </div>
      )}
    </div>
  );
};

export default CheckoutAddress;
