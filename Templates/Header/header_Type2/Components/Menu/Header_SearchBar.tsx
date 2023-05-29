import { __pagesText } from '@constants/pages.text';
import { Form, Formik } from 'formik';
import React from 'react';

interface _props {
  screen?: 'MOBILE' | 'DESKTOP';
  // eslint-disable-next-line no-unused-vars
  onSearchInput?: (value?: string) => Promise<void>;
}

const SearchBar: React.FC<_props> = ({
  screen = 'DESKTOP',
  onSearchInput = () => {},
}) => {
  const searchHandler = (value: { text: string }) => {
    // SearchFor(value);
    onSearchInput(value.text as string);
    // .then().catch().finally;
  };

  if (screen === 'MOBILE') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ handleSubmit, handleChange, handleReset }) => {
            return (
              <div className='md:hidden pt-[10px]'>
                <div className='container mx-auto'>
                  <Form>
                    <div>
                      <div className='border rounded-full border-gray-border pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-quaternary relative'>
                        <input
                          type='text'
                          name='text'
                          min={1}
                          id='txtSearch'
                          placeholder='Enter Search here'
                          onChange={handleChange}
                          className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-quaternary h-[26px] bg-none'
                          autoComplete='off'
                          maxLength={255}
                        />
                        <button
                          className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                          onClick={() => {
                            handleSubmit();
                            handleReset();
                          }}
                        >
                          <span className='material-icons text-primary font-[900]'>
                            {__pagesText.Headers.searchIcon}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            );
          }}
        </Formik>
      </>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
        {({ handleSubmit, handleChange, handleReset }) => {
          return (
            <div className='md:w-1/3 hidden md:inline-block pl-[20px]'>
              <Form className='max-w-[450px] mx-auto'>
                <div>
                  <div className='border rounded-full border-gray-border pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-quaternary relative'>
                    <input
                      type='text'
                      name='text'
                      min={1}
                      id='txtSearch'
                      placeholder='Enter Search here'
                      onChange={handleChange}
                      className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-quaternary h-[26px] bg-transparent'
                      autoComplete='off'
                      maxLength={255}
                    />
                    <button
                      className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                      onClick={() => {
                        handleSubmit();
                        handleReset();
                      }}
                    >
                      <span className='material-icons text-primary font-[900]'>
                        {__pagesText.Headers.searchIcon}
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  }

  return <></>;
};

export default SearchBar;
