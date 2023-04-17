import { defaultCountry } from '@configs/page.config';
import { AddressFormRefType } from '@controllers/checkoutController/CheckoutAddressForm';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { useEffect, useState } from 'react';
const AddressForm = (props: AddressFormRefType) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = props;
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

  useEffect(() => {}, [country]);

  useEffect(() => {
    if (!values.countryName) {
      setFieldValue(
        'countryName',
        country.find((res) => res.id === defaultCountry)?.name,
      );
    }
    const obj = country.find((count) => count.name === values.countryName);
    if (obj) {
      FetchStatesList(obj.id).then((res) => res && setState(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.countryName, country]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-wrap -mx-3'>
        <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
          <div className='relative z-0 w-full                                                                                                         2 border border-gray-border rounded'>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              name='firstname'
              placeholder=' '
              value={values.firstname}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='lastName'
              value={values.lastName}
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.companyName}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='address1'
              value={values.address1}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='address2'
              value={values.address2}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='city'
              value={values.city}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='countryName'
              value={values.countryName}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='state'
              value={values.state}
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
              onBlur={handleBlur}
              onChange={handleChange}
              name='postalCode'
              value={values.postalCode}
              placeholder=' '
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
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
              name='phone'
              placeholder=' '
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
      </div>
    </form>
  );
};

export default AddressForm;
