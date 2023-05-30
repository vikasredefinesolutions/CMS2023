import { FieldArray, Form, Formik } from 'formik';
import React, { useState } from 'react';
import SubForm from './SubForm';

const CustomRequestForm_Type2: React.FC = () => {
  const [timesRendered, setTimesRendered] = useState([]);
  const [getData, setGetData] = useState([]);
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          organizationName: '',
          listRadio: false,
          phone: '',
          email: '',
          firstNameAddress: '',
          lastNameAddress: '',
          address1: '',
          address2: '',
          city: '',
          zipCode: '',
          companyName: '',
          countryName: '',
          stateName: '',
          itemName: '',
          fileUpload: '',
          itemColor: '#rrggbb',
          sizeQty: '',
          needByDate: '',
          additionalComments: '',
          additionalForms: [
            {
              itemPriceRange: '',
              itemQty: '',
              itemDescription: '',
            },
          ],
        }}
        onSubmit={() => {
          console.log('Hello');
        }}
        // validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <Form>
              <div className='mb-[24px] mt-[24px]'>
                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Name <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id=''
                            name={'firstName'}
                            placeholder='First Name'
                            className='form-input'
                            value={values.firstName}
                          />
                        </div>
                      </div>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          &nbsp;
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id=''
                            name={'lastName'}
                            placeholder='Last Name'
                            className='form-input'
                            value={values.lastName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Phone<span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id=''
                            name={'phone'}
                            placeholder=''
                            className='form-input'
                            value={values.phone}
                          />
                        </div>
                      </div>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Boston Beer Email
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='email'
                            id=''
                            name={'email'}
                            placeholder=''
                            className='form-input'
                            value={values.email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Ideal In-hands Date
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='date'
                            id=''
                            name={'needByDate'}
                            placeholder=''
                            className='form-input'
                            value={values.needByDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Can this arrive AFTER the in-hands date?{' '}
                        </label>
                        <div className='grow'>
                          <ul className='items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex'>
                            <li className='mr-4 last:mr-0'>
                              <div className='flex items-center pl-3'>
                                <input
                                  id='horizontal-list-radio-license'
                                  type='radio'
                                  name={'listRadio'}
                                  value={`${values.listRadio}`}
                                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                                />
                                <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900 '>
                                  Yes
                                </label>
                              </div>
                            </li>
                            <li className='mr-4 last:mr-0'>
                              <div className='flex items-center pl-3'>
                                <input
                                  id='horizontal-list-radio-id'
                                  type='radio'
                                  value={`${values.listRadio}`}
                                  name={'listRadio'}
                                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                                />
                                <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                                  No
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-full px-[10px]'>
                        <label className='text-lg-text font-[600] w-full md:w-1/3'>
                          Ship to Address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Name <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id=''
                            name='firstNameAddress'
                            placeholder='First Name'
                            className='form-input'
                            value={values.firstNameAddress}
                          />
                        </div>
                      </div>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          &nbsp;
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='Last Name'
                            name={'lastNameAddress'}
                            placeholder='Last Name'
                            className='form-input'
                            value={values.lastNameAddress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Company Name
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id=''
                            name={'companyname'}
                            placeholder=''
                            className='form-input'
                            value={values.companyName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-full px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Address<span className='text-red-600'>*</span>
                        </label>
                        <div className='grow mb-4 last:mb-0'>
                          <input
                            type='text'
                            id=''
                            name='address1'
                            placeholder='Address Line 1'
                            className='form-input'
                            value={values.address1}
                          />
                        </div>
                        <div className='grow mb-4 last:mb-0'>
                          <input
                            type='text'
                            id=''
                            name={'address2'}
                            placeholder='Address Line 2'
                            className='form-input'
                            value={values.address2}
                          />
                        </div>
                        <div className='grow mb-4 last:mb-0'>
                          <div className='flex flex-wrap mx-[-10px]'>
                            <div className='w-full md:w-1/4 px-[10px]'>
                              <div className='grow'>
                                <input
                                  type='text'
                                  id=''
                                  name={'city'}
                                  placeholder='City'
                                  className='form-input'
                                  value={values.city}
                                />
                              </div>
                            </div>
                            <div className='w-full md:w-1/4 px-[10px]'>
                              <div className='grow'>
                                <input
                                  type='text'
                                  id='state-name'
                                  name={'stateName'}
                                  placeholder='State / Province / Region'
                                  className='form-input'
                                  value={values.stateName}
                                />
                              </div>
                            </div>
                            <div className='w-full md:w-1/4 px-[10px]'>
                              <div className='grow'>
                                <input
                                  type='text'
                                  id=''
                                  name={'zipCode'}
                                  placeholder='Postal / Zip Code'
                                  className='form-input bg-slate-400'
                                  value={values.zipCode}
                                />
                              </div>
                            </div>
                            <div className='w-full md:w-1/4 px-[10px]'>
                              <div className='grow'>
                                <select className='form-input'>
                                  <option value=''>Select Country</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Phone<span className='text-red-600'>*</span>
                        </label>
                        <div className='grow'>
                          <input
                            type='text'
                            id='Phone Number'
                            name='phonenumber'
                            placeholder=''
                            className='form-input'
                            value=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-full px-[10px]'>
                        <label className='text-default-text font-[600] w-full'>
                          Item Request
                        </label>
                        <FieldArray name='additionalFields'>
                          {({ insert, remove, push }) => {
                            return (
                              <>
                                <SubForm />;
                                <button
                                  type='button'
                                  className='btn btn-primary uppercase'
                                  onClick={() => {
                                    return push({
                                      itemPriceRange: '',
                                      itemQty: '',
                                      itemDescription: '',
                                    });
                                  }}
                                >
                                  + Add item
                                </button>
                              </>
                            );
                          }}
                        </FieldArray>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-1/2 px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Additional documents or logos needed to complete
                          request.{' '}
                        </label>
                        <div className='grow'>
                          <div className='flex items-center justify-center w-full my-4'>
                            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <svg
                                  aria-hidden='true'
                                  className='w-10 h-10 mb-3 text-gray-400'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                  ></path>
                                </svg>
                                <p className='mb-2 text-sm text-gray-500 '>
                                  <span className='font-semibold'>
                                    Click to upload
                                  </span>{' '}
                                  or drag and drop
                                </p>
                              </div>
                              <input
                                id='dropzone-file'
                                type='file'
                                className='hidden'
                              />
                            </label>
                          </div>
                        </div>
                        <label className='text-default-text w-full md:w-1/3'>
                          *NOTE: Printing will require high-res pdf, eps, or ai
                          format. Embroidery is more flexible.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-[20px] flex flex-wrap items-center gap-[8px]'>
                  <div className='grow'>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='w-full px-[10px]'>
                        <label className='text-default-text font-[600] w-full md:w-1/3'>
                          Special request/​notes
                        </label>
                        <div className='grow'>
                          <textarea className='form-input'></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2 max-w-3xl pt-[40px]'>
                  <div className='w-full md:w-1/2 text-left'>
                    <button type='button' className='btn btn-primary uppercase'>
                      Submit
                    </button>
                  </div>
                  <div className='w-full md:w-1/2 text-right'>
                    <button
                      type='button'
                      className='btn btn-secondary uppercase'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomRequestForm_Type2;
