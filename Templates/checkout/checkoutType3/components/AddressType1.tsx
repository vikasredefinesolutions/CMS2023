import { AddressType } from '@controllers/checkoutController/CheckoutAddressForm';

const CheckoutAddress = ({
  address,
  addressType,
  setShippingAddress,
  useShippingAddress,
  changeClickHandler,
}: {
  address: AddressType | null;
  addressType: 1 | 2;
  // eslint-disable-next-line no-unused-vars
  setShippingAddress?: (arg: boolean) => void;
  useShippingAddress?: boolean;
  changeClickHandler: () => void;
}) => {
  return (
    <div className='' id='ShippingAddress'>
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          {addressType === 1 ? 'Shipping Address' : 'Billing Address'}
        </div>
        {!useShippingAddress && (
          <div>
            <button
              onClick={changeClickHandler}
              className='!text-anchor hover:!text-anchor-hover underline'
              data-modal-toggle='shippingaddressModal'
            >
              Change
            </button>
          </div>
        )}
      </div>
      {addressType === 2 && (
        <div className='mb-3 font-semibold text-lg'>
          <div>
            <input
              type='checkbox'
              id='UseShippingAddress'
              name='UseShippingAddress'
              data-modal-toggle='billingaddressModal'
              onChange={(e) =>
                setShippingAddress && setShippingAddress(e.target.checked)
              }
              checked={useShippingAddress}
            />{' '}
            <label htmlFor='UseShippingAddress'>Use Shipping Address</label>
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
