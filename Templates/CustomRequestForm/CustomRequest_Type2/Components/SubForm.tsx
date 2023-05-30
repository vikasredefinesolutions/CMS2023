import React from 'react';

interface _props {
  name: string;
  //   handleChange: (
  //     event:
  //       | React.ChangeEvent<HTMLInputElement>
  //       | React.ChangeEvent<HTMLTextAreaElement>,
  //   ) => void;
}

const SubForm: React.FC = () => {
  return (
    <>
      <div className='grow'>
        <div className='w-full my-4 bg-gray-100 p-4'>
          <div className='flex flex-wrap items-center gap-[8px] max-w-3xl'>
            <div className='grow'>
              <div className='flex flex-wrap mx-[-10px]'>
                <div className='w-full px-[10px]'>
                  <label className='text-md-text font-[600] w-full'>
                    <a href='' title='' className='text-black'>
                      {' '}
                      <span className='material-icons-outlined text-sm text-black rounded px-[5px] py-[2px] bg-white mr-1'>
                        close
                      </span>{' '}
                      Item 1
                    </a>
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
                    Is this request for an event/​meeting?
                    <span className='text-red-600'>*</span>
                  </label>
                  <div className='grow'>
                    <ul className='items-center w-full text-sm font-medium text-gray-900 rounded-lg sm:flex'>
                      <li className='mr-4 last:mr-0'>
                        <div className='flex items-center pl-3'>
                          <input
                            id='horizontal-list-radio-license'
                            type='radio'
                            value=''
                            name='list-radio'
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
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
                            value=''
                            name='list-radio'
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                          />
                          <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900 '>
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
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Date of the event/​meeting
                  </label>
                  <div className='grow'>
                    <input
                      type='date'
                      id='Ideal In-hands Date'
                      name='idealinhandsdate'
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
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    {' '}
                    Item Price Range <span className='text-red-600'>*</span>
                  </label>
                  <div className='grow'>
                    <input
                      type='text'
                      id=''
                      name=''
                      placeholder=''
                      className='form-input'
                      value=''
                    />
                  </div>
                </div>
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Quantity per item
                  </label>
                  <div className='grow'>
                    <input
                      type='text'
                      id=''
                      name=''
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
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Logo <span className='text-red-600'>*</span>
                  </label>
                  <div className='grow'>
                    <select className='form-input'>
                      <option value=''>Please Select Preferred Logo.</option>
                    </select>
                  </div>
                </div>
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Preferred Logo Location
                  </label>
                  <div className='grow'>
                    <select className='form-input'>
                      <option value=''>Select Logo Location</option>
                    </select>
                  </div>
                  <div className='grow'>
                    <label className='text-default-text w-full font-italic'>
                      This is dependent on final item. For instance if there is
                      a brand logo on the left chest and your choice is left
                      chest - your logo would move to right chest.{' '}
                    </label>
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
                    Additional Embroidery Copy
                  </label>
                  <div className='grow'>
                    <input
                      type='text'
                      id='First Name'
                      name='firstName'
                      placeholder='First Name'
                      className='form-input'
                      value=''
                    />
                  </div>
                  <div className='grow'>
                    <label className='text-default-text w-full font-italic'>
                      Example: Boston Crew Drive 2016, Joe's Bar &amp; Grill,
                      etc.
                    </label>
                  </div>
                </div>
                <div className='w-1/2 px-[10px]'>
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Color Request
                  </label>
                  <div className='grow'>
                    <input
                      type='text'
                      id='Last Name'
                      name='lastName'
                      placeholder='Last Name'
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
                    Item Description
                    <span className='text-red-600'>*</span>
                  </label>
                  <div className='grow'>
                    <textarea className='form-input'></textarea>
                  </div>
                  <div className='grow'>
                    <label className='text-default-text w-full font-italic'>
                      Please provide any specific details that would help us
                      quote. For example, if you have a specific item in mind or
                      have weblink(s) to reference images of what you are hoping
                      to source.
                    </label>
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
                    Gender{' '}
                  </label>
                  <div className='grow'>
                    <ul className='flex text-sm font-medium text-gray-900 rounded-lg'>
                      <li className='rounded-t-lg'>
                        <div className='flex items-center pl-3'>
                          <input
                            id='vue-checkbox'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                          />
                          <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                            Men's
                          </label>
                        </div>
                      </li>
                      <li className='rounded-t-lg'>
                        <div className='flex items-center pl-3'>
                          <input
                            id='react-checkbox'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 '
                          />
                          <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900 '>
                            Women's
                          </label>
                        </div>
                      </li>
                      <li className='rounded-t-lg'>
                        <div className='flex items-center pl-3'>
                          <input
                            id='angular-checkbox'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                          />
                          <label className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                            Unisex
                          </label>
                        </div>
                      </li>
                      <li className='rounded-t-lg'>
                        <div className='flex items-center pl-3'>
                          <input
                            id='laravel-checkbox'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                          />
                          <label className='flex w-full py-1 ml-2 text-sm font-medium text-gray-900'>
                            <input
                              className='form-input'
                              type='text'
                              placeholder='Other'
                              value=''
                            />
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
                  <label className='text-default-text font-[600] w-full md:w-1/3'>
                    Brands to consider
                  </label>
                  <div className='grow'>
                    <textarea className='form-input'></textarea>
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
                    Special instructions
                  </label>
                  <div className='grow'>
                    <textarea className='form-input'></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubForm;
