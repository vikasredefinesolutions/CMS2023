import { AddressFormRefType } from '@controllers/checkoutController/CheckoutAddressForm';
import { _Country, _State } from '@definations/app.type';
import { FetchCountriesList, FetchStatesList } from '@services/general.service';
import { getLocationWithZipCode } from '@services/user.service';
import { useEffect, useState } from 'react';
const AddressForm: React.FC<AddressFormRefType> = ({
  values,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  errors,
  setFieldValue,
}) => {
  const [country, setCountry] = useState<_Country[]>([]);
  const [state, setState] = useState<_State[]>([]);

  const udpateStates = async (
    countryId: number,
    updateFormik: boolean = true,
  ) => {
    await FetchStatesList(countryId).then((res) => {
      if (!res) return;

      setState(res);

      if (updateFormik) {
        if (res.length === 0) {
          setFieldValue('state', '');
          return;
        }
        setFieldValue('state', res[0]?.name || '');
      }
    });
  };

  const getStateCountryCityWithZipCode = async (zipCode: string) => {
    await getLocationWithZipCode(zipCode).then((res) => {
      if (!res || !res?.countryId) return;

      if (res.countryName !== values.countryName) {
        setFieldValue('countryName', res?.countryName);
        setFieldValue('countryCode', res.countryId);
      }

      udpateStates(res.countryId, false);
      setFieldValue('state', res?.stateName);
      setFieldValue('city', res?.cityName);
    });
  };

  const customBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleBlur(e);
    getStateCountryCityWithZipCode(e.target.value);
  };

  // console.log('values ===> ', values.countryCode, values.countryName);

  useEffect(() => {
    FetchCountriesList().then((res) => {
      if (!res) return;

      const stateId = res.find(
        (cntry) => cntry.name === values.countryName,
      )?.id;

      udpateStates(stateId ? stateId : 0, false);
      setCountry(res);

      setFieldValue('countryName', res[0].name);
      // setFieldValue('countryCode', res[0].id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.companyName == null) {
      setFieldValue('companyName', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit} className='checkoutpage'>
      <div className='flex flex-wrap mx-[-15px]'>
        <div className='w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
          <div>
            <div className='relative z-0 w-full border border-gray-border rounded'>
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
                className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
              >
                First Name*
              </label>
            </div>
            <div className='text-red-500 text-s'>
              {touched.firstname && errors.firstname}
            </div>
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Last Name*
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Company Name*
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Street Address*
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              City*
            </label>
          </div>
          <div className='text-red-500 text-s'>
            {touched.city && errors.city}
          </div>
        </div>

        <div className='w-full pl-[12px] pr-[12px] mb-[20px]'>
          <div className='relative z-0 w-full border border-gray-border rounded'>
            <input
              onBlur={(e) => {
                handleBlur(e);
                customBlur(e);
              }}
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
              Zip Code*
            </label>
          </div>
          <div className='text-red-500 text-s'>
            {touched?.postalCode && errors?.postalCode}
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              State / Province*
            </label>
          </div>
          <div className='text-red-500 text-s'>
            {touched.state && errors.state}
          </div>
        </div>
        <div className=' w-full lg:w-1/2 pl-[12px] pr-[12px] mb-[20px]'>
          <div className='relative z-0 w-full border border-gray-border rounded'>
            <select
              onBlur={handleBlur}
              onChange={(event) => {
                const newCountry = country.find(
                  (cntry) => cntry.name === event.target.value,
                );

                if (newCountry) {
                  setFieldValue('countryCode', newCountry.id);
                  udpateStates(newCountry.id);
                }
                handleChange(event);
              }}
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
              Select Country*
            </label>
          </div>
          <div className='text-red-500 text-s'>
            {touched.countryName && errors.countryName}
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
              className='left-[8px] absolute duration-300 top-[15px] -z-1 origin-0 text-[#000000] text-[18px]'
            >
              Phone Number*
            </label>
          </div>
          <div className='text-red-500 text-s'>
            {touched.phone && errors.phone}
          </div>
        </div>
      </div>
      <div className='w-full pr-[12px] mb-[20px] hidden'>
        <span className='font-semibold'>Used For Delivery Questions Only</span>
      </div>
    </form>
  );
};

export default AddressForm;
