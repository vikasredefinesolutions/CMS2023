import {
  AddressFormRefType,
  AddressType,
} from '@controllers/checkoutController/CheckoutAddressForm';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { useEffect, useState } from 'react';

const AddAddress = ({
  refrence,
  title,
  setShippingAddress,
  useShippingAddress,
  isBillingForm,
  billingAddress,
}: {
  refrence: AddressFormRefType;
  title: string;
  // eslint-disable-next-line no-unused-vars
  setShippingAddress?: (arg: boolean) => void;
  useShippingAddress?: boolean;
  isBillingForm: boolean;
  billingAddress?: AddressType | null;
}) => {
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
    isSubmitting,
  } = refrence;
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const customer = useTypedSelector_v2((state) => {
    return state.user.customer;
  });

  const [country, setCountry] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [state, setState] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    FetchCountriesList().then((res) => res && setCountry(res));
  }, []);

  useEffect(() => {
    if (!values.countryName) {
      values.countryName = country[0]?.name;
    }
    const obj = country.find((count) => count.name === values.countryName);
    if (obj) {
      FetchStatesList(obj.id).then((res) => {
        if (res) {
          setState(res);
          res ? (values.state = res[0]?.name) : '';
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.countryName, country]);

  return (
    <div className='' id='ShippingAddress'>
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          {title}
        </div>
      </div>
      {isBillingForm && (
        <div className='mb-3 font-semibold text-lg'>
          <div>
            <input
              type='checkbox'
              id='UseShippingAddress'
              name='UseShippingAddress'
              data-modal-toggle='billingaddressModal'
              onChange={(e) =>
                setShippingAddress &&
                !billingAddress &&
                setShippingAddress(e.target.checked)
              }
              checked={useShippingAddress}
            />{' '}
            <label htmlFor='UseShippingAddress'>Use Shipping Address</label>
          </div>
        </div>
      )}
      {!useShippingAddress && (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full                                                                                                         2 border border-gray-border rounded'>
                <input
                  value={values.firstname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='firstname'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='FirstName'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  First Name *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.firstname && errors.firstname}
              </div>
            </div>
            <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='lastName'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='LastName'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Last Name *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.lastName && errors.lastName}
              </div>
            </div>
            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.companyName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='companyName'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='CompanyName'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Company Name *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.companyName && errors.companyName}
              </div>
            </div>
            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.address1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='address1'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='address1'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Street Address *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.address1 && errors.address1}
              </div>
            </div>
            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.address2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='address2'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='address2'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Address 2
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.address2 && errors.address2}
              </div>
            </div>
            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='city'
                  placeholder=' '
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='city'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  City *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.city && errors.city}
              </div>
            </div>
            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <select
                  value={values.countryName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='countryName'
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                >
                  {country.map((res) => (
                    <option key={res.id}>{res.name}</option>
                  ))}
                </select>{' '}
                <label
                  htmlFor='countryName'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Select Country *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.countryName && errors.countryName}
              </div>
            </div>
            <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <select
                  value={values.state}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='state'
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                >
                  {state.map((res) => (
                    <option key={res.id}>{res.name}</option>
                  ))}
                </select>{' '}
                <label
                  htmlFor='StateProvince'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  State / Province *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.state && errors.state}
              </div>
            </div>
            <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.postalCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='postalCode'
                  placeholder=' '
                  type='number'
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='postalCode'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Zip Code *
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.postalCode && errors.postalCode}
              </div>
            </div>

            <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
              <div className='relative z-0 w-full border border-gray-border rounded'>
                <input
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name='phone'
                  placeholder=' '
                  type='number'
                  className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='phone'
                  className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
                >
                  Phone Number*
                </label>
              </div>
              <div className='text-red-500 text-s'>
                {touched.phone && errors.phone}
              </div>
            </div>
            {!isBillingForm && (
              <div className='w-full lg:w-1/2 pl-[12px] pr-[12px]'>
                <div className='relative z-0 w-full mb-[20px]'>
                  Used for delivery questions only
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAddress;
