import React, { useState } from 'react';
// import { UploadImage } from '@services/general.service';
import { _Country } from '@definations/app.type';
const CustomRequestForm_Type2: React.FC = () => {
  const [timesRendered, setTimesRendered] = useState([]);
  const [countries, setCountries] = useState<_Country[] | []>([]);
  const [countryId, setCountryId] = useState<number>(0);
  // useEffect(() => {
  //   FetchCountriesList().then((res) => {
  //     if (res) {
  //       setCountries(res);
  //       setCountryId(res[0].id);
  //     }
  //   });
  // }, []);
  // const [getData, setGetData] = useState([]);
  // const _initialValues = {
  //   firstName: '',
  //   lastName: '',
  //   organizationName: '',
  //   listRadio: 'false',
  //   phone: '',
  //   email: '',
  //   firstNameAddress: '',
  //   lastNameAddress: '',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   zipCode: '',
  //   companyName: '',
  //   countryName: '',
  //   stateName: '',
  //   itemName: '',
  //   fileUpload: '',
  //   itemColor: '#rrggbb',
  //   sizeQty: '',
  //   needByDate: '',
  //   additionalComments: '',
  //   phoneNumber: '',
  //   additionalForms: [
  //     {
  //       itemPriceRange: '',
  //       itemQty: '',
  //       itemDescription: '',
  //     },
  //   ],
  // };
  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.firstName.required)
  //     .min(
  //       CustomRequestMessage.firstName.minlength,
  //       CustomRequestMessage.firstName.minValidation,
  //     ),
  //   lastName: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.lastName.required)
  //     .min(
  //       CustomRequestMessage.lastName.minlength,
  //       CustomRequestMessage.lastName.minValidation,
  //     ),
  //   organizationName: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.organizationName.required),
  //   phone: Yup.string()
  //     .trim()
  //     .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
  //     .test(
  //       'phone-test',
  //       __ValidationText.signUp.storeCustomerAddress.phone.valid,
  //       (value) => {
  //         if (
  //           phonePattern1.test(value || '') ||
  //           phonePattern2.test(value || '') ||
  //           phonePattern3.test(value || '') ||
  //           phonePattern4.test(value || '')
  //         )
  //           return true;
  //         return false;
  //       },
  //     ),
  //   phoneNumber: Yup.string()
  //     .trim()
  //     .required(__ValidationText.signUp.storeCustomerAddress.phone.required)
  //     .test(
  //       'phone-test',
  //       __ValidationText.signUp.storeCustomerAddress.phone.valid,
  //       (value) => {
  //         if (
  //           phonePattern1.test(value || '') ||
  //           phonePattern2.test(value || '') ||
  //           phonePattern3.test(value || '') ||
  //           phonePattern4.test(value || '')
  //         )
  //           return true;
  //         return false;
  //       },
  //     ),
  //   email: Yup.string()
  //     .trim()
  //     .email(__messages.email.validRequest)
  //     .max(__length.email.max)
  //     .min(__length.email.min)
  //     .required(__messages.email.required)
  //     .nullable(),
  //   itemName: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.itemName.required),
  //   brandPreferences: Yup.string(),
  //   // budgetPerItem: Yup.number().required(CustomRequestMessage.budget.required),
  //   additionalComments: Yup.string(),
  //   sizeQty: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.sizeQty.required),
  //   firstNameAddress: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.firstName.required)
  //     .min(
  //       CustomRequestMessage.firstName.minlength,
  //       CustomRequestMessage.firstName.minValidation,
  //     ),
  //   lastNameAddress: Yup.string()
  //     .trim()
  //     .required(CustomRequestMessage.lastName.required)
  //     .min(
  //       CustomRequestMessage.lastName.minlength,
  //       CustomRequestMessage.lastName.minValidation,
  //     ),
  //   address1: Yup.string().required(addressMessages.address1.required),
  //   address2: Yup.string(),
  //   city: Yup.string().required(addressMessages.city.required),
  //   stateName: Yup.string().required(addressMessages.state.required),
  //   zipCode: Yup.string()
  //     .required(addressMessages.postalCode.required)
  //     .max(
  //       __ValidationText.signUp.storeCustomerAddress.postalCode.maxLength,
  //       'Postal code must be less than 9',
  //     ),
  //   countryName: Yup.string().required(addressMessages.countryName.required),
  //   companyName: Yup.string().required(addressMessages.companyName.required),
  //   needByDate: Yup.string().required('Ideal In-hands Date is required.'),
  // });
  // return (
  //   <>
  //     <Formik
  //       initialValues={_initialValues}
  //       onSubmit={() => {
  //         console.log('::::');
  //       }}
  //       validationSchema={validationSchema}
  //     >
  //       {({
  //         values,
  //         handleChange,
  //         handleSubmit,
  //         setFieldValue,
  //         touched,
  //         errors,
  //         setTouched,
  //       }) => {
  //         console.log(errors, 'errors', values);
  //         return (
  //           <Form>
  //             <div className='mb-[24px] mt-[24px]'>
  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Name <span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name={'firstName'}
  //                           placeholder='First Name'
  //                           className='form-input'
  //                           value={values.firstName}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.firstName && errors.firstName && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.firstName}
  //                         </p>
  //                       )}
  //                     </div>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         &nbsp;
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name={'lastName'}
  //                           placeholder='Last Name'
  //                           className='form-input'
  //                           value={values.lastName}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.lastName && errors.lastName && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.lastName}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Phone<span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name={'phone'}
  //                           placeholder=''
  //                           className='form-input'
  //                           value={values.phone}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.phone && errors.phone && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.phone}
  //                         </p>
  //                       )}
  //                     </div>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Boston Beer Email
  //                         <span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='email'
  //                           id=''
  //                           name={'email'}
  //                           placeholder=''
  //                           className='form-input'
  //                           value={values.email}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.email && errors.email && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.email}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Ideal In-hands Date
  //                         <span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='date'
  //                           id=''
  //                           name={'needByDate'}
  //                           placeholder=''
  //                           className='form-input'
  //                           value={values.needByDate}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.needByDate && errors.needByDate && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.needByDate}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Can this arrive AFTER the in-hands date?{' '}
  //                       </label>
  //                       <div className='grow'>
  //                         <ul className='items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex'>
  //                           <li className='mr-4 last:mr-0'>
  //                             <div className='flex items-center pl-3'>
  //                               <input
  //                                 id='horizontal-list-radio-license'
  //                                 type='radio'
  //                                 name={'listRadio'}
  //                                 value='true'
  //                                 onChange={handleChange}
  //                                 className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
  //                               />
  //                               <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900 '>
  //                                 Yes
  //                               </label>
  //                             </div>
  //                           </li>
  //                           <li className='mr-4 last:mr-0'>
  //                             <div className='flex items-center pl-3'>
  //                               <input
  //                                 id='horizontal-list-radio-id'
  //                                 type='radio'
  //                                 value='false'
  //                                 name={'listRadio'}
  //                                 checked={true}
  //                                 onChange={handleChange}
  //                                 className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
  //                               />
  //                               <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
  //                                 No
  //                               </label>
  //                             </div>
  //                           </li>
  //                         </ul>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-full px-[10px]'>
  //                       <label className='text-lg-text font-[600] w-full md:w-1/3'>
  //                         Ship to Address
  //                       </label>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Name <span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name='firstNameAddress'
  //                           placeholder='First Name'
  //                           className='form-input'
  //                           value={values.firstNameAddress}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.firstNameAddress &&
  //                         errors.firstNameAddress && (
  //                           <p className='text-red-500 text-xs mt-1'>
  //                             {errors.firstNameAddress}
  //                           </p>
  //                         )}
  //                     </div>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         &nbsp;
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id='Last Name'
  //                           name={'lastNameAddress'}
  //                           placeholder='Last Name'
  //                           className='form-input'
  //                           value={values.lastNameAddress}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.lastNameAddress && errors.lastNameAddress && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.lastNameAddress}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Company Name
  //                         <span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name={'companyname'}
  //                           placeholder=''
  //                           className='form-input'
  //                           value={values.companyName}
  //                           onChange={handleChange}
  //                         />
  //                       </div>
  //                       {touched.companyName && errors.companyName && (
  //                         <p className='text-red-500 text-xs mt-1'>
  //                           {errors.companyName}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-full px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Address<span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow mb-4 last:mb-0'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name='address1'
  //                           placeholder='Address Line 1'
  //                           className='form-input'
  //                           value={values.address1}
  //                           onChange={handleChange}
  //                         />
  //                         {touched.address1 && errors.address1 && (
  //                           <p className='text-red-500 text-xs mt-1'>
  //                             {errors.address1}
  //                           </p>
  //                         )}
  //                       </div>
  //                       <div className='grow mb-4 last:mb-0'>
  //                         <input
  //                           type='text'
  //                           id=''
  //                           name={'address2'}
  //                           placeholder='Address Line 2'
  //                           className='form-input'
  //                           value={values.address2}
  //                           onChange={handleChange}
  //                         />
  //                         {touched.address2 && errors.address2 && (
  //                           <p className='text-red-500 text-xs mt-1'>
  //                             {errors.address2}
  //                           </p>
  //                         )}
  //                       </div>
  //                       <div className='grow mb-4 last:mb-0'>
  //                         <div className='flex flex-wrap mx-[-10px]'>
  //                           <div className='w-full md:w-1/4'>
  //                             <div className='grow'>
  //                               <input
  //                                 type='text'
  //                                 id=''
  //                                 name={'city'}
  //                                 placeholder='City'
  //                                 className='form-input'
  //                                 value={values.city}
  //                                 onChange={handleChange}
  //                               />
  //                               {touched.city && errors.city && (
  //                                 <p className='text-red-500 text-xs mt-1'>
  //                                   {errors.city}
  //                                 </p>
  //                               )}
  //                             </div>
  //                           </div>
  //                           <div className='w-full md:w-1/4 px-[10px]'>
  //                             <div className='grow'>
  //                               <input
  //                                 type='text'
  //                                 id='state-name'
  //                                 name={'stateName'}
  //                                 placeholder='State / Province / Region'
  //                                 className='form-input'
  //                                 value={values.stateName}
  //                                 onChange={handleChange}
  //                               />

  //                               {touched.stateName && errors.stateName && (
  //                                 <p className='text-red-500 text-xs mt-1'>
  //                                   {errors.stateName}
  //                                 </p>
  //                               )}
  //                             </div>
  //                           </div>
  //                           <div className='w-full md:w-1/4 px-[10px]'>
  //                             <div className='grow'>
  //                               <input
  //                                 type='text'
  //                                 id=''
  //                                 name={'zipCode'}
  //                                 placeholder='Postal / Zip Code'
  //                                 className='form-input bg-slate-400'
  //                                 value={values.zipCode}
  //                                 onChange={handleChange}
  //                               />
  //                               {touched.zipCode && errors.zipCode && (
  //                                 <p className='text-red-500 text-xs mt-1'>
  //                                   {errors.zipCode}
  //                                 </p>
  //                               )}
  //                             </div>
  //                           </div>
  //                           <div className='w-full md:w-1/4 px-[10px]'>
  //                             <div className='grow'>
  //                               <select
  //                                 name={'countryName'}
  //                                 className='form-input'
  //                                 onChange={(e) => {
  //                                   let id = countries.find(
  //                                     (item) => item.name === e.target.value,
  //                                   );
  //                                   if (id) {
  //                                     setCountryId(id.id);
  //                                     setFieldValue(
  //                                       'countryName',
  //                                       e.target.value,
  //                                     );
  //                                     setFieldValue('stateName', '');
  //                                     setTouched({ stateName: true });
  //                                   } else {
  //                                     setFieldValue('countryName', '');
  //                                     setTouched({ stateName: true });

  //                                     setFieldValue('stateName', '');
  //                                   }
  //                                 }}
  //                               >
  //                                 <option value=''>Select Country</option>
  //                                 {countries.map((item) => {
  //                                   if (values.countryName == item.name) {
  //                                     return (
  //                                       <option value={item.name} selected>
  //                                         {item.name}
  //                                       </option>
  //                                     );
  //                                   }
  //                                   return (
  //                                     <option value={item.name}>
  //                                       {item.name}
  //                                     </option>
  //                                   );
  //                                 })}
  //                               </select>
  //                               {touched.countryName && errors.countryName && (
  //                                 <p className='text-red-500 text-xs mt-1'>
  //                                   {errors.countryName}
  //                                 </p>
  //                               )}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Phone<span className='text-red-600'>*</span>
  //                       </label>
  //                       <div className='grow'>
  //                         <input
  //                           type='text'
  //                           id='Phone Number'
  //                           name='phoneNumber'
  //                           placeholder=''
  //                           className='form-input'
  //                           value={values.phoneNumber}
  //                           onChange={handleChange}
  //                         />
  //                         {touched.phoneNumber && errors.phoneNumber && (
  //                           <p className='text-red-500 text-xs mt-1'>
  //                             {errors.phoneNumber}
  //                           </p>
  //                         )}
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-full px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full'>
  //                         Item Request
  //                       </label>
  //                       <FieldArray name='additionalFields'>
  //                         {({ insert, remove, push }) => {
  //                           return (
  //                             <>
  //                               <SubForm />;
  //                               <button
  //                                 type='button'
  //                                 className='btn btn-primary uppercase'
  //                                 onClick={() => {
  //                                   return push({
  //                                     itemPriceRange: '',
  //                                     itemQty: '',
  //                                     itemDescription: '',
  //                                   });
  //                                 }}
  //                               >
  //                                 + Add item
  //                               </button>
  //                             </>
  //                           );
  //                         }}
  //                       </FieldArray>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-1/2 px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Additional documents or logos needed to complete
  //                         request.{' '}
  //                       </label>
  //                       <div className='grow'>
  //                         <div className='flex items-center justify-center w-full my-4'>
  //                           <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
  //                             <div className='flex flex-col items-center justify-center pt-5 pb-6'>
  //                               <svg
  //                                 aria-hidden='true'
  //                                 className='w-10 h-10 mb-3 text-gray-400'
  //                                 fill='none'
  //                                 stroke='currentColor'
  //                                 viewBox='0 0 24 24'
  //                                 xmlns='http://www.w3.org/2000/svg'
  //                               >
  //                                 <path
  //                                   stroke-linecap='round'
  //                                   stroke-linejoin='round'
  //                                   stroke-width='2'
  //                                   d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
  //                                 ></path>
  //                               </svg>
  //                               <p className='mb-2 text-sm text-gray-500 '>
  //                                 <span className='font-semibold'>
  //                                   Click to upload
  //                                 </span>{' '}
  //                                 or drag and drop
  //                               </p>
  //                             </div>
  //                             <input
  //                               id='dropzone-file'
  //                               type='file'
  //                               className='hidden'
  //                             />
  //                           </label>
  //                         </div>
  //                       </div>
  //                       <label className='text-default-text w-full md:w-1/3'>
  //                         *NOTE: Printing will require high-res pdf, eps, or ai
  //                         format. Embroidery is more flexible.
  //                       </label>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
  //                 <div className='grow'>
  //                   <div className='flex flex-wrap mx-[-10px]'>
  //                     <div className='w-full px-[10px]'>
  //                       <label className='text-default-text font-[600] w-full md:w-1/3'>
  //                         Special request/​notes
  //                       </label>
  //                       <div className='grow'>
  //                         <textarea className='form-input'></textarea>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className='flex items-center gap-2 max-w-3xl pt-[40px]'>
  //                 <div className='w-full md:w-1/2 text-left'>
  //                   <button type='submit' className='btn btn-primary uppercase'>
  //                     Submit
  //                   </button>
  //                 </div>
  //                 <div className='w-full md:w-1/2 text-right'>
  //                   <button
  //                     type='button'
  //                     className='btn btn-secondary uppercase'
  //                   >
  //                     Save
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </Form>
  //         );
  //       }}
  //     </Formik>
  //   </>
  // );
  return <></>;
};

export default CustomRequestForm_Type2;
